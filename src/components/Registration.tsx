import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import Reveal from '@/components/Reveal';
import { getPaymentQrImage } from '@/data/pricingData';
import { supabase } from '@/lib/supabase';
import {
  ArrowRight,
  CloudUpload,
  PartyPopper,
  AlertCircle,
  ChevronLeft,
} from 'lucide-react';
import { MandalaMotif } from './FestiveMotifs';

interface PersonalData {
  fullName: string;
  email: string;
  phone: string;
  upiDisplayName: string;
  collegeName: string;
  department: string;
  collegeRegistrationNumber: string;
}

interface FormErrors {
  [key: string]: string;
}

type Stage = 'form' | 'payment' | 'success';
type PaymentSubStep = 'qr' | 'proof';

const REGISTRATION_AMOUNT = 175;

function generateRegistrationId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';

  for (let i = 0; i < 6; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }

  return `CHC-${suffix}`;
}

const EMPTY_PERSONAL: PersonalData = {
  fullName: '',
  email: '',
  phone: '',
  upiDisplayName: '',
  collegeName: '',
  department: '',
  collegeRegistrationNumber: '',
};

export default function Registration() {
  const [stage, setStage] = useState<Stage>('form');
  const [paymentSubStep, setPaymentSubStep] =
    useState<PaymentSubStep>('qr');

  const [personal, setPersonal] =
    useState<PersonalData>(EMPTY_PERSONAL);

  const [errors, setErrors] = useState<FormErrors>({});
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [registrationId, setRegistrationId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputClass = (field: string) =>
    `festive-input ${
      errors[field] ? '!border-red-400 !ring-1 !ring-red-400/40' : ''
    }`;

  const handlePersonalChange = (
    field: keyof PersonalData,
    value: string,
  ) => {
    setPersonal((previous) => ({ ...previous, [field]: value }));

    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: '' }));
    }
  };

  const validatePersonal = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!personal.fullName.trim()) {
      nextErrors.fullName = 'Please enter your name';
    }

    if (!personal.email.trim()) {
      nextErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email.trim())) {
      nextErrors.email = 'Please enter a valid email';
    }

    if (!personal.phone.trim()) {
      nextErrors.phone = 'Please enter your phone number';
    } else if (!/^[0-9]{10}$/.test(personal.phone.replace(/\s/g, ''))) {
      nextErrors.phone = 'Enter a valid 10-digit number';
    }

    if (!personal.upiDisplayName.trim()) {
      nextErrors.upiDisplayName = 'Please enter your UPI payment display name';
    }

    if (!personal.collegeName.trim()) {
      nextErrors.collegeName = 'Please enter your college name';
    }

    if (!personal.department.trim()) {
      nextErrors.department = 'Please enter your department';
    }

    if (!personal.collegeRegistrationNumber.trim()) {
      nextErrors.collegeRegistrationNumber =
        'Please enter your college registration number';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePersonalSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validatePersonal()) return;

    setErrors({});
    setPaymentSubStep('qr');
    setStage('payment');
  };

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setSubmitError('Please upload an image of your payment receipt.');
      event.target.value = '';
      return;
    }

    setScreenshotFile(file);
    setFileName(file.name);
    setSubmitError(null);
  };

  const handleFinalSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!confirmed || !screenshotFile) {
      setSubmitError('Please upload your payment screenshot and confirm the payment.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    let uploadedFilePath: string | null = null;

    try {
      const registrationCode = generateRegistrationId();
      const fileExtension = screenshotFile.name.split('.').pop() || 'jpg';
      const filePath =
        `chamak-challo/${Date.now()}_${Math.random()
          .toString(36)
          .slice(2)}.${fileExtension}`;

      // 1. Upload the payment screenshot.
      const { error: uploadError } = await supabase.storage
        .from('payment-screenshots')
        .upload(filePath, screenshotFile, {
          upsert: false,
          contentType: screenshotFile.type,
        });

      if (uploadError) {
        throw new Error(`Screenshot upload failed: ${uploadError.message}`);
      }

      uploadedFilePath = filePath;

      // 2. Save this individual registration in the CHAMAK CHALLO table.
      const { error: insertError } = await supabase
        .from('chamak_challo_registrations')
        .insert({
          registration_id: registrationCode,
          name: personal.fullName.trim(),
          email: personal.email.trim(),
          phone: personal.phone.replace(/\s/g, ''),
          college_name: personal.collegeName.trim(),
          department: personal.department.trim(),
          college_registration_number:
            personal.collegeRegistrationNumber.trim(),
          upi_display_name: personal.upiDisplayName.trim(),
          payment_screenshot: filePath,
          total_amount: REGISTRATION_AMOUNT,
          payment_status: 'pending',
          confirmation_status: 'not_sent',
        });

      if (insertError) {
        throw new Error(`Registration could not be saved: ${insertError.message}`);
      }

      // No confirmation email is sent here.
      // The admin team sends it only after verifying the payment.
      setRegistrationId(registrationCode);
      setStage('success');
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again.';

      setSubmitError(message);

      // Keep the uploaded screenshot if the database insert failed.
      // This avoids accidentally deleting a file that may need investigation.
      console.error('CHAMAK CHALLO registration error:', {
        message,
        uploadedFilePath,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resetAll = () => {
    setStage('form');
    setPaymentSubStep('qr');
    setPersonal(EMPTY_PERSONAL);
    setErrors({});
    setScreenshotFile(null);
    setFileName(null);
    setConfirmed(false);
    setSubmitting(false);
    setSubmitError(null);
    setRegistrationId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const stepIndex = stage === 'form' ? 0 : stage === 'payment' ? 1 : 2;

  // SUCCESS SCREEN
  if (stage === 'success') {
    return (
      <Shell>
        <div className="relative max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl border border-[#F3CA66]/40 bg-[#1B0C3C] mb-8 shadow-2xl">
              <PartyPopper className="w-10 h-10 text-[#F3CA66]" />
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#FFF8EF] mb-4">
              Registration Submitted! <span className="text-[#F3CA66]">✨</span>
            </h2>

            <p className="font-body text-[18px] text-[#FFF8EF]/85 mb-3">
              Your registration has been received successfully.
            </p>

            <p className="font-body text-[16px] text-[#FFF8EF]/70 mb-6">
              Your payment is{' '}
              <strong className="text-[#FF6F1E] font-semibold">
                pending verification
              </strong>
              . Your registration will be confirmed after the organising team
              manually verifies your payment.
            </p>

            <div className="festive-panel rounded-2xl p-7 sm:p-9 mb-8 text-left shadow-2xl">
              <h3 className="font-body text-[14px] tracking-wider text-[#F3CA66] uppercase mb-5 font-semibold">
                Registration Summary
              </h3>

              {registrationId && (
                <div className="mb-5 px-5 py-3.5 rounded-xl bg-[#14082B] border border-[#F3CA66]/30 flex items-center justify-between gap-3">
                  <span className="font-body text-[14px] text-[#F3CA66] uppercase tracking-wider font-semibold">
                    Registration ID
                  </span>
                  <span className="font-display text-xl text-white font-semibold tracking-widest">
                    {registrationId}
                  </span>
                </div>
              )}

              <div className="space-y-3 font-body text-[15px]">
                <SummaryRow label="Name" value={personal.fullName} />
                <SummaryRow label="Email" value={personal.email} />
                <SummaryRow label="Phone" value={personal.phone} />
                <SummaryRow label="Event" value="CHAMAK CHALLO" />
                <SummaryRow label="Participation Fee" value="₹175" />
                <SummaryRow label="Payment Status" value="Pending verification" />
              </div>
            </div>

            <p className="font-body text-[15px] text-[#FFF8EF]/65 mb-7 font-light">
              A confirmation email will be sent to{' '}
              <strong className="text-[#F3CA66]">{personal.email}</strong>{' '}
              after successful payment verification.
            </p>

            <button
              onClick={resetAll}
              className="font-body text-[16px] text-[#F3CA66] hover:text-[#FFF8EF] transition-colors font-semibold underline underline-offset-4"
            >
              Register another participant
            </button>
          </Reveal>
        </div>
      </Shell>
    );
  }

  // PAYMENT QR SCREEN
  if (stage === 'payment' && paymentSubStep === 'qr') {
    return (
      <Shell>
        <div className="relative max-w-2xl mx-auto">
          <Reveal>
            <StepBar stepIndex={stepIndex} />

            <div className="text-center mb-8">
              <span className="section-eyebrow block mb-3">
                Payment Step
              </span>

              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#FFF8EF] mb-4">
                Complete Your Payment
              </h2>

              <div className="jewel-chip inline-block px-7 py-5 rounded-xl text-center">
                <p className="font-body text-[14px] text-[#F3CA66] uppercase tracking-wider mb-1 font-semibold">
                  Participation Fee
                </p>
                <p className="font-display text-4xl text-white font-semibold">
                  ₹{REGISTRATION_AMOUNT}
                </p>
                <p className="font-body text-[13px] text-[#FFF8EF]/65 mt-1">
                  Per participant
                </p>
              </div>
            </div>

            <div className="festive-panel rounded-2xl p-7 sm:p-10 shadow-2xl">
              <div className="mb-7 space-y-2.5">
                <p className="font-body text-[16px] text-[#FFF8EF]/80 font-light">
                  1. Scan the QR code using any UPI app such as GPay, PhonePe or Paytm.
                </p>
                <p className="font-body text-[16px] text-[#FFF8EF]/80 font-light">
                  2. Pay exactly ₹175 for your individual registration.
                </p>
                <p className="font-body text-[16px] text-[#FFF8EF]/80 font-light">
                  3. Save your payment receipt screenshot and upload it on the next step.
                </p>
              </div>

              <div className="flex flex-col items-center mb-8">
                <div className="p-4 bg-white rounded-2xl mb-4 shadow-xl border border-[#F3CA66]/40">
                  <img
                    src={getPaymentQrImage(REGISTRATION_AMOUNT)}
                    alt="CHAMAK CHALLO UPI Payment QR Code"
                    className="w-56 h-56 object-contain"
                  />
                </div>

                <p className="font-body text-[15px] text-[#FFF8EF]/80 text-center">
                  Payee: <strong className="text-[#F3CA66]">Girl Up Andhra University</strong>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPaymentSubStep('proof')}
                className="btn-primary w-full justify-center text-[16px] py-4"
              >
                Next: Upload Payment Receipt
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setStage('form')}
                className="mt-4 w-full text-[15px] text-[#F3CA66] hover:text-[#FFF8EF] transition-colors flex items-center justify-center gap-1 font-medium"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to participant details
              </button>
            </div>
          </Reveal>
        </div>
      </Shell>
    );
  }

  // PAYMENT SCREENSHOT UPLOAD
  if (stage === 'payment' && paymentSubStep === 'proof') {
    return (
      <Shell>
        <div className="relative max-w-2xl mx-auto">
          <Reveal>
            <StepBar stepIndex={stepIndex} />

            <div className="text-center mb-8">
              <span className="section-eyebrow block mb-3">
                Final Payment Step
              </span>

              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#FFF8EF] mb-4">
                Upload Payment Receipt
              </h2>

              <div className="jewel-chip inline-block px-6 py-4 rounded-xl">
                <p className="font-body text-[14px] text-[#F3CA66] uppercase tracking-wider mb-1 font-semibold">
                  Amount Paid
                </p>
                <p className="font-display text-3xl text-white font-semibold">
                  ₹{REGISTRATION_AMOUNT}
                </p>
              </div>
            </div>

            <form
              onSubmit={handleFinalSubmit}
              className="festive-panel rounded-2xl p-7 sm:p-10 shadow-2xl"
            >
              <div className="mb-7">
                <p className="font-body text-[16px] text-[#FFF8EF]/85 mb-3 font-light">
                  Upload your payment screenshot showing the transaction ID and payment status:
                </p>

                <label className="block">
                  <div
                    className={`flex flex-col items-center justify-center gap-3.5 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 ${
                      fileName
                        ? 'border-[#F3CA66] bg-[#14082B]'
                        : 'border-[#F3CA66]/35 bg-[#14082B] hover:border-[#F3CA66] hover:bg-[#1E0D44]'
                    }`}
                  >
                    <CloudUpload className="w-10 h-10 text-[#F3CA66]" />

                    {fileName ? (
                      <span className="font-body text-[16px] text-[#F3CA66] text-center font-semibold">
                        {fileName}
                      </span>
                    ) : (
                      <span className="font-body text-[16px] text-[#FFF8EF]/75 text-center font-light">
                        Click to select receipt screenshot
                      </span>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="hidden"
                  />
                </label>

                <p className="font-body text-[14px] text-[#FFF8EF]/50 mt-3 font-light">
                  Ensure the transaction reference number and UPI payment name are clearly visible.
                </p>
              </div>

              <label className="flex items-start gap-3.5 mb-7 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(event) => setConfirmed(event.target.checked)}
                  className="mt-1 w-5 h-5 rounded accent-[#F3CA66] shrink-0 cursor-pointer"
                />

                <span className="font-body text-[15px] sm:text-[16px] text-[#FFF8EF]/85 leading-relaxed font-light">
                  I have completed the ₹175 UPI payment and attached the authentic payment screenshot.
                </span>
              </label>

              {submitError && (
                <div className="mb-5 flex items-start gap-3 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-[15px] text-red-200">
                  <AlertCircle className="w-5 h-5 mt-0.5 shrink-0 text-red-400" />
                  <span>{submitError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={!confirmed || !screenshotFile || submitting}
                className="btn-primary w-full justify-center text-[16px] py-4 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting Registration…' : 'CONFIRM & SUBMIT REGISTRATION'}
                {!submitting && <ArrowRight className="w-4 h-4" />}
              </button>

              <p className="mt-3.5 text-center font-body text-[14px] text-[#FFF8EF]/50 font-light">
                Payments are manually verified by the Girl Up Andhra University organising team.
              </p>

              <button
                type="button"
                onClick={() => setPaymentSubStep('qr')}
                className="mt-4 w-full text-[15px] text-[#F3CA66] hover:text-[#FFF8EF] transition-colors flex items-center justify-center gap-1 font-medium"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to QR instructions
              </button>
            </form>
          </Reveal>
        </div>
      </Shell>
    );
  }

  // PARTICIPANT DETAILS FORM
  return (
    <Shell>
      <div className="relative max-w-2xl mx-auto">
        <Reveal>
          <StepBar stepIndex={stepIndex} />

          <div className="text-center mb-8">
            <span className="section-eyebrow block mb-3">
              Participant Details
            </span>

            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#FFF8EF] mb-3 text-balance">
              Register for Chamak Challo
            </h2>

            <p className="font-body text-[17px] text-[#FFF8EF]/75 font-light">
              Each participant must complete an individual registration.
            </p>
          </div>

          <div className="jewel-chip mb-7 px-6 py-4 rounded-xl text-center">
            <p className="font-body text-[15px] sm:text-[16px] font-medium text-[#F3CA66]">
              16 November 2026 · 4:00 PM – 7:00 PM
            </p>
            <p className="font-body text-[14px] text-[#FFF8EF]/80 mt-1">
              North Campus Basketball Court, Andhra University
            </p>
            <p className="font-body text-[14px] text-[#FFF8EF]/80 mt-2">
              Participation Fee: ₹175 per person
            </p>
          </div>

          <form
            onSubmit={handlePersonalSubmit}
            className="festive-panel rounded-2xl p-7 sm:p-10 space-y-6 shadow-2xl"
          >
            <div>
              <label className="block text-[15px] font-medium text-[#FFF8EF] mb-2 tracking-wide">
                Full Name <span className="text-[#F3CA66]">*</span>
              </label>
              <input
                type="text"
                value={personal.fullName}
                onChange={(event) => handlePersonalChange('fullName', event.target.value)}
                placeholder="Enter your full name"
                className={inputClass('fullName')}
              />
              {errors.fullName && (
                <p className="text-[14px] text-red-300 mt-1.5">{errors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[15px] font-medium text-[#FFF8EF] mb-2 tracking-wide">
                  Email Address <span className="text-[#F3CA66]">*</span>
                </label>
                <input
                  type="email"
                  value={personal.email}
                  onChange={(event) => handlePersonalChange('email', event.target.value)}
                  placeholder="you@example.com"
                  className={inputClass('email')}
                />
                {errors.email && (
                  <p className="text-[14px] text-red-300 mt-1.5">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-[15px] font-medium text-[#FFF8EF] mb-2 tracking-wide">
                  Phone Number <span className="text-[#F3CA66]">*</span>
                </label>
                <input
                  type="tel"
                  value={personal.phone}
                  onChange={(event) => handlePersonalChange('phone', event.target.value)}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={inputClass('phone')}
                />
                {errors.phone && (
                  <p className="text-[14px] text-red-300 mt-1.5">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[15px] font-medium text-[#FFF8EF] mb-2 tracking-wide">
                UPI / Payment Display Name <span className="text-[#F3CA66]">*</span>
              </label>
              <input
                type="text"
                value={personal.upiDisplayName}
                onChange={(event) => handlePersonalChange('upiDisplayName', event.target.value)}
                placeholder="Name shown on your UPI app"
                className={inputClass('upiDisplayName')}
              />
              <p className="text-[14px] text-[#FFF8EF]/55 mt-1.5 font-light">
                Enter the account name shown on your UPI payment to help our team match your record.
              </p>
              {errors.upiDisplayName && (
                <p className="text-[14px] text-red-300 mt-1.5">{errors.upiDisplayName}</p>
              )}
            </div>

            <div>
              <label className="block text-[15px] font-medium text-[#FFF8EF] mb-2 tracking-wide">
                College Name <span className="text-[#F3CA66]">*</span>
              </label>
              <input
                type="text"
                value={personal.collegeName}
                onChange={(event) => handlePersonalChange('collegeName', event.target.value)}
                placeholder="Enter your college name"
                className={inputClass('collegeName')}
              />
              {errors.collegeName && (
                <p className="text-[14px] text-red-300 mt-1.5">{errors.collegeName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[15px] font-medium text-[#FFF8EF] mb-2 tracking-wide">
                  Department <span className="text-[#F3CA66]">*</span>
                </label>
                <input
                  type="text"
                  value={personal.department}
                  onChange={(event) => handlePersonalChange('department', event.target.value)}
                  placeholder="e.g. Computer Science"
                  className={inputClass('department')}
                />
                {errors.department && (
                  <p className="text-[14px] text-red-300 mt-1.5">{errors.department}</p>
                )}
              </div>

              <div>
                <label className="block text-[15px] font-medium text-[#FFF8EF] mb-2 tracking-wide">
                  College Registration No. <span className="text-[#F3CA66]">*</span>
                </label>
                <input
                  type="text"
                  value={personal.collegeRegistrationNumber}
                  onChange={(event) =>
                    handlePersonalChange('collegeRegistrationNumber', event.target.value)
                  }
                  placeholder="Enter your registration number"
                  className={inputClass('collegeRegistrationNumber')}
                />
                {errors.collegeRegistrationNumber && (
                  <p className="text-[14px] text-red-300 mt-1.5">
                    {errors.collegeRegistrationNumber}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full justify-center text-[16px] py-4 rounded-xl mt-4"
            >
              Continue to Payment
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </Reveal>
      </div>
    </Shell>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5 border-b border-[#F3CA66]/15">
      <span className="text-[#FFF8EF]/65 shrink-0 font-light">{label}</span>
      <span className="text-white font-medium text-right break-all">{value}</span>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section
      id="register"
      className="relative py-24 sm:py-32 section-padding overflow-hidden"
      style={{ backgroundColor: '#120727' }}
    >
      <div
        className="pointer-events-none absolute top-24 -left-10 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(60, 120,255, 0.28) 0%, transparent 70%)',
          filter: 'blur(36px)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-10 -right-8 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 60,160, 0.2) 0%, transparent 70%)',
          filter: 'blur(36px)',
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.06]">
        <MandalaMotif className="w-full h-full" />
      </div>
      {children}
    </section>
  );
}

const STEPS = ['Details', 'Payment', 'Submit'];

function StepBar({ stepIndex }: { stepIndex: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((label, index) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-bold border-2 transition-all duration-300 ${
                index < stepIndex
                  ? 'bg-[#7949A5] border-[#7949A5] text-white'
                  : index === stepIndex
                    ? 'bg-[#F3CA66] border-[#F3CA66] text-[#0E041E] shadow-lg shadow-[#F3CA66]/35 scale-110'
                    : 'bg-[#1B0C3C] border-[#F3CA66]/30 text-[#FFF8EF]/45'
              }`}
            >
              {index < stepIndex ? '✓' : index + 1}
            </div>
            <span
              className={`text-[14px] mt-2 font-medium tracking-wide ${
                index === stepIndex
                  ? 'text-[#F3CA66] font-semibold'
                  : 'text-[#FFF8EF]/50'
              }`}
            >
              {label}
            </span>
          </div>

          {index < STEPS.length - 1 && (
            <div
              className={`w-14 sm:w-24 h-[2px] mx-2 mb-6 transition-colors duration-300 ${
                index < stepIndex ? 'bg-[#F3CA66]' : 'bg-[#F3CA66]/20'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
