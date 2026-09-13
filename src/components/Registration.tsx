import { useState, useRef, useEffect, useCallback, type ChangeEvent, type FormEvent } from 'react';
import Reveal from '@/components/Reveal';
import SeatMap from '@/components/SeatMap';
import { paymentData, TICKET_PRICE, getPaymentQrImage } from '@/data/pricingData';
import { supabase } from '@/lib/supabase';
import {
  ArrowRight,
  CheckCircle2,
  CloudUpload,
  PartyPopper,
  AlertCircle,
  ChevronLeft,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

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

type Stage = 'form' | 'seats' | 'payment' | 'success';

const MAX_SEATS = 4;
const DRAFT_KEY = 'guau_registration_draft';

interface RegistrationDraft {
  personal: PersonalData;
  selectedSeats: string[];
  stage: 'form' | 'seats' | 'payment';
  paymentSubStep: 'qr' | 'proof';
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function loadDraft(): Partial<RegistrationDraft> | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** GUAU-XXXXXX — 6 unambiguous uppercase alphanum chars */
function generateRegistrationId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 6; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `GUAU-${suffix}`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Registration() {
  // Load draft once on initial render
  const initialDraft = useRef(loadDraft()).current;

  // Stage
  const [stage, setStage] = useState<Stage>(() => {
    const s = initialDraft?.stage;
    if (s === 'seats' || s === 'payment') {
      if (s === 'payment' && (!initialDraft?.selectedSeats || initialDraft.selectedSeats.length === 0)) {
        return 'form';
      }
      return s;
    }
    return 'form';
  });

  // Personal details (persisted across stages)
  const [personal, setPersonal] = useState<PersonalData>(() => ({
    fullName: initialDraft?.personal?.fullName ?? '',
    email: initialDraft?.personal?.email ?? '',
    phone: initialDraft?.personal?.phone ?? '',
    upiDisplayName: initialDraft?.personal?.upiDisplayName ?? '',
    collegeName: initialDraft?.personal?.collegeName ?? '',
    department: initialDraft?.personal?.department ?? '',
    collegeRegistrationNumber: initialDraft?.personal?.collegeRegistrationNumber ?? '',
  }));

  // Seat selection
  const [selectedSeats, setSelectedSeats] = useState<string[]>(
    () => (Array.isArray(initialDraft?.selectedSeats) ? initialDraft.selectedSeats : [])
  );
  const [maxExceededMsg, setMaxExceededMsg] = useState(false);
  const seatRefreshRef = useRef<(() => void) | null>(null);

  // Payment stage
  const [confirmed, setConfirmed] = useState(false);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // Payment sub-step: 'qr' shows QR + instructions; 'proof' shows upload + confirm + submit
  const [paymentSubStep, setPaymentSubStep] = useState<'qr' | 'proof'>(
    () => (initialDraft?.paymentSubStep === 'proof' ? 'proof' : 'qr')
  );

  // Synchronize draft state to sessionStorage
  useEffect(() => {
    if (stage === 'success') {
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch (err) {
        console.error('Failed to clear draft on success:', err);
      }
    } else {
      try {
        const draft: RegistrationDraft = {
          personal,
          selectedSeats,
          stage,
          paymentSubStep,
        };
        sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      } catch (err) {
        console.error('Failed to save draft to sessionStorage:', err);
      }
    }
  }, [personal, selectedSeats, stage, paymentSubStep]);

  // Submission
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derived
  const ticketQty = selectedSeats.length;
  const total = ticketQty * TICKET_PRICE;

  // ── Input helpers ──────────────────────────────────────────────────────────

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-lg bg-midnight-900/85 border text-cream-50 placeholder-cream-300/30 text-sm outline-none transition-all duration-200 ${
      errors[field]
        ? 'border-red-400'
        : 'border-lavender-700/40 focus:border-lavender-400 focus:ring-1 focus:ring-lavender-400/30 focus:bg-midnight-800'
    }`;

  const handlePersonalChange = (field: keyof PersonalData, value: string) => {
    setPersonal((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  };

  // ── Validation ─────────────────────────────────────────────────────────────

  const validatePersonal = (): boolean => {
    const e: FormErrors = {};
    if (!personal.fullName.trim()) e.fullName = 'Please enter your name';
    if (!personal.email.trim()) e.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email)) e.email = 'Please enter a valid email';
    if (!personal.phone.trim()) e.phone = 'Please enter your phone number';
    else if (!/^[0-9]{10}$/.test(personal.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit number';
    if (!personal.upiDisplayName.trim()) e.upiDisplayName = 'Please enter the name shown on your UPI payment';
    if (!personal.collegeName.trim()) e.collegeName = 'Please enter your college name';
    if (!personal.department.trim()) e.department = 'Please enter your department';
    if (!personal.collegeRegistrationNumber.trim()) e.collegeRegistrationNumber = 'Please enter your college registration number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Stage transitions ──────────────────────────────────────────────────────

  const handlePersonalSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (validatePersonal()) {
      setErrors({});
      setStage('seats');
    }
  };

  const handleSeatContinue = () => {
    if (selectedSeats.length === 0) {
      setErrors({ seats: 'Please select at least 1 seat.' });
      return;
    }
    setErrors({});
    setPaymentSubStep('qr'); // always start at QR when entering payment
    setStage('payment');
  };

  // ── Seat toggle ────────────────────────────────────────────────────────────

  const handleSeatToggle = useCallback((seat: string) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seat)) return prev.filter((s) => s !== seat);
      if (prev.length >= MAX_SEATS) return prev; // guard (SeatMap also enforces)
      return [...prev, seat].sort();
    });
    setMaxExceededMsg(false);
    if (errors.seats) setErrors((e) => ({ ...e, seats: '' }));
  }, [errors.seats]);

  const handleMaxExceeded = useCallback(() => {
    setMaxExceededMsg(true);
    setTimeout(() => setMaxExceededMsg(false), 3000);
  }, []);

  const handleSeatRefresh = useCallback((fn: () => void) => {
    seatRefreshRef.current = fn;
  }, []);

  // ── File upload ────────────────────────────────────────────────────────────

  const handleFile = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (file) { setScreenshotFile(file); setFileName(file.name); }
  };

  // ── Final submit ───────────────────────────────────────────────────────────

  const handleFinalSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!confirmed || !screenshotFile || selectedSeats.length === 0) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const regId = generateRegistrationId();

      // 1. Upload screenshot
      const fileExt = screenshotFile.name.split('.').pop();
      const filePath = `screenshots/${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('payment-screenshots')
        .upload(filePath, screenshotFile, { upsert: false });

      if (uploadError) throw new Error(`Screenshot upload failed: ${uploadError.message}`);

      // 2. Atomic seat reservation + registration via RPC
      const { data: rpcData, error: rpcError } = await supabase.rpc('reserve_seats_and_register', {
        p_registration_id: regId,
        p_name: personal.fullName.trim(),
        p_email: personal.email.trim(),
        p_phone: personal.phone.trim(),
        p_ticket_quantity: ticketQty,
        p_total_amount: total,
        p_upi_display_name: personal.upiDisplayName.trim(),
        p_payment_screenshot: filePath,
        p_selected_seats: selectedSeats,
        p_college_name: personal.collegeName.trim(),
        p_department: personal.department.trim(),
        p_college_registration_number: personal.collegeRegistrationNumber.trim(),
      });

      if (rpcError) throw new Error(`Registration failed: ${rpcError.message}`);

      // Check if RPC reported a seat conflict
      const result = rpcData as { success: boolean; conflict_seats?: string[] } | null;
      if (!result?.success) {
        const conflicted = result?.conflict_seats?.join(', ') ?? 'some seats';
        // Refresh seat map so user sees updated state
        seatRefreshRef.current?.();
        // Clear the conflicted seats from selection
        setSelectedSeats((prev) =>
          prev.filter((s) => !(result?.conflict_seats ?? []).includes(s)),
        );
        setStage('seats');
        throw new Error(
          `One or more selected seats (${conflicted}) were just booked by another user. Please select different seats.`,
        );
      }

      // 3. Confirmation email via Google Apps Script (non-blocking — registration success is never affected)
      // Uses mode:'no-cors' + Content-Type:text/plain to avoid a CORS preflight.
      // Apps Script reads the payload via e.postData.contents and parses it as JSON.
      // The response is opaque and cannot be inspected, so we fire-and-forget.
      // Any network-level throw is caught below; it sets a warning but never rolls back the registration.
      const APPS_SCRIPT_URL =
        'https://script.google.com/macros/s/AKfycbwijj1isbL7rVMCixWA2XuIOnIKRcHxIzbH3ZnBUCCo2TKp76IwKdKmdQEVH2F43EuH/exec';
      try {
        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            registrationId: regId,
            name: personal.fullName.trim(),
            email: personal.email.trim(),
            phone: personal.phone.trim(),
            ticketQuantity: ticketQty,
            totalAmount: total,
            selectedSeats,
            collegeName: personal.collegeName.trim(),
            department: personal.department.trim(),
            collegeRegistrationNumber: personal.collegeRegistrationNumber.trim(),
          }),
        });
        // Response is opaque (no-cors) — cannot check status. Delivery is confirmed via Apps Script logs.
      } catch (emailErr) {
        console.error('Apps Script email request failed:', emailErr);
        setEmailError('Email could not be sent (network error). Registration is saved.');
      }

      setRegistrationId(regId);
      setStage('success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  // ── Reset ──────────────────────────────────────────────────────────────────

  const resetAll = () => {
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      console.error('Failed to clear draft on reset:', err);
    }
    setStage('form');
    setPersonal({ fullName: '', email: '', phone: '', upiDisplayName: '', collegeName: '', department: '', collegeRegistrationNumber: '' });
    setSelectedSeats([]);
    setConfirmed(false);
    setFileName(null);
    setScreenshotFile(null);
    setRegistrationId(null);
    setSubmitError(null);
    setEmailError(null);
    setErrors({});
    setMaxExceededMsg(false);
  };

  // ── Step indicator ─────────────────────────────────────────────────────────

  const stepIndex = stage === 'form' ? 0 : stage === 'seats' ? 1 : stage === 'payment' ? 2 : 3;

  // ══════════════════════════════════════════════════════════════════════════
  // SUCCESS
  // ══════════════════════════════════════════════════════════════════════════
  if (stage === 'success') {
    return (
      <Shell>
        <div className="relative max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl border border-lavender-500/40 bg-lavender-800/30 mb-8 shadow-xl shadow-lavender-950/60">
              <PartyPopper className="w-8 h-8 text-lavender-300" />
            </div>
            <h2 className="font-display text-5xl sm:text-6xl font-light text-cream-50 mb-4">
              Registration Submitted! <span className="text-lavender-300">✨</span>
            </h2>
            <p className="text-lg text-cream-200/80 mb-2 font-light">
              Your registration has been received successfully.
            </p>
            <p className="text-sm text-cream-200/65 mb-4">
              Your payment is <strong className="text-lavender-300">pending verification</strong>. We will confirm your registration after manually verifying the payment.
            </p>

            {emailError ? (
              <p className="text-xs text-amber-400/80 mb-8 bg-amber-900/20 border border-amber-500/30 rounded-lg px-4 py-2">
                ⚠ A confirmation email could not be sent automatically. Please note your Registration ID. Error: {emailError}
              </p>
            ) : (
              <p className="text-xs text-cream-200/50 mb-8">
                A confirmation email has been sent to <strong className="text-cream-100">{personal.email}</strong>.
              </p>
            )}

            <div className="glass-card p-6 mb-8 text-left">
              <h3 className="text-xs tracking-wider text-lavender-300/80 uppercase mb-4 font-medium">Registration Summary</h3>

              {registrationId && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-lavender-800/40 border border-lavender-500/40 flex items-center justify-between">
                  <span className="text-xs text-lavender-300/70 uppercase tracking-wider font-medium">Registration ID</span>
                  <span className="font-display text-lg text-lavender-200 font-medium tracking-widest">{registrationId}</span>
                </div>
              )}

              <div className="space-y-2 text-sm">
                <Row label="Name" value={personal.fullName} />
                <Row label="Email" value={personal.email} />
                <Row label="Phone" value={personal.phone} />
                <Row label="Selected Seats" value={selectedSeats.join(', ')} />
                <Row label="Number of Tickets" value={String(ticketQty)} />
                <div className="flex items-center justify-between pt-3 border-t border-lavender-700/35">
                  <span className="font-display text-lg text-cream-50">Total Paid</span>
                  <span className="font-display text-2xl text-lavender-200 font-medium">₹{total}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-cream-300/50 mb-6">
              Payment status: <span className="text-amber-400 font-medium">Pending verification</span>
            </p>

            <button
              onClick={resetAll}
              className="text-sm text-lavender-300 hover:text-lavender-200 transition-colors font-medium underline underline-offset-4"
            >
              Register another person
            </button>
          </Reveal>
        </div>
      </Shell>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // PAYMENT — sub-step: 'qr'
  // ══════════════════════════════════════════════════════════════════════════
  if (stage === 'payment' && paymentSubStep === 'qr') {
    return (
      <Shell>
        <div className="relative max-w-2xl mx-auto">
          <Reveal>
            <StepBar stepIndex={stepIndex} />

            <div className="text-center mb-8">
              <p className="text-xs tracking-[0.25em] text-lavender-400 font-medium mb-4 uppercase">Payment</p>
              <h2 className="font-display text-4xl sm:text-5xl font-light text-cream-50 mb-4">
                Complete Your Registration
              </h2>

              {/* Seats + amount summary */}
              <div className="inline-block px-5 py-3 rounded-xl glass border border-lavender-700/40 text-left mb-2">
                <p className="text-xs text-lavender-300/70 uppercase tracking-wider mb-1">Selected Seats</p>
                <p className="text-sm text-cream-100 font-medium mb-2">{selectedSeats.join(', ')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-cream-200/70">Amount to Pay:</span>
                  <span className="font-display text-3xl text-lavender-200 font-medium">₹{total}</span>
                </div>
                <p className="text-xs text-cream-200/50 mt-1">
                  {ticketQty} ticket{ticketQty > 1 ? 's' : ''} × ₹{TICKET_PRICE} (incl. FREE popcorn &amp; cool drink)
                </p>
              </div>
            </div>

            <div className="glass-card p-6 sm:p-10">
              {/* Instructions */}
              <div className="mb-6 space-y-1.5">
                <p className="text-sm text-cream-200/75">1. Scan the QR below and pay the exact amount shown above.</p>
                <p className="text-sm text-cream-200/75">2. Open Google Pay, PhonePe, Paytm, or any UPI app and complete the payment.</p>
                <p className="text-sm text-cream-200/75">3. Take a screenshot of the successful payment, then return here to upload it.</p>
              </div>

              {/* QR */}
              <div className="flex flex-col items-center mb-8">
                <div className="p-4 bg-white rounded-2xl mb-4 shadow-xl border-2 border-lavender-300/30">
                  <img
                    src={getPaymentQrImage(total)}
                    alt="UPI Payment QR Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <p className="text-sm text-cream-200/75 text-center max-w-sm">
                  Scan the QR and pay exactly <strong className="text-cream-50">₹{total}</strong> using any UPI app (Google Pay, PhonePe, Paytm, etc.)
                </p>
              </div>

              {/* Advance to proof upload */}
              <button
                type="button"
                onClick={() => setPaymentSubStep('proof')}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-lavender-400 hover:bg-lavender-300 text-midnight-950 font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-lavender-950/50"
              >
                Next: Upload Payment Proof
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setStage('seats')}
                className="mt-4 w-full text-xs text-lavender-300/70 hover:text-lavender-200 transition-colors flex items-center justify-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back to seat selection
              </button>
            </div>
          </Reveal>
        </div>
      </Shell>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // PAYMENT — sub-step: 'proof'
  // ══════════════════════════════════════════════════════════════════════════
  if (stage === 'payment' && paymentSubStep === 'proof') {
    return (
      <Shell>
        <div className="relative max-w-2xl mx-auto">
          <Reveal>
            <StepBar stepIndex={stepIndex} />

            <div className="text-center mb-8">
              <p className="text-xs tracking-[0.25em] text-lavender-400 font-medium mb-4 uppercase">Payment Proof</p>
              <h2 className="font-display text-4xl sm:text-5xl font-light text-cream-50 mb-4">
                Upload Payment Proof
              </h2>

              {/* Seats + amount summary */}
              <div className="inline-block px-5 py-3 rounded-xl glass border border-lavender-700/40 text-left mb-2">
                <p className="text-xs text-lavender-300/70 uppercase tracking-wider mb-1">Selected Seats</p>
                <p className="text-sm text-cream-100 font-medium mb-2">{selectedSeats.join(', ')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm text-cream-200/70">Amount to Pay:</span>
                  <span className="font-display text-3xl text-lavender-200 font-medium">₹{total}</span>
                </div>
                <p className="text-xs text-cream-200/50 mt-1">
                  {ticketQty} ticket{ticketQty > 1 ? 's' : ''} × ₹{TICKET_PRICE} (incl. FREE popcorn &amp; cool drink)
                </p>
              </div>
            </div>

            <form onSubmit={handleFinalSubmit} className="glass-card p-6 sm:p-10">
              {/* Screenshot upload */}
              <div className="mb-6">
                <p className="text-sm text-cream-200/75 mb-2">
                  After completing the payment, upload your payment screenshot.
                </p>
                <label className="block">
                  <div className={`flex flex-col items-center justify-center gap-3 p-8 rounded-xl border border-dashed cursor-pointer transition-all duration-200 ${
                    fileName
                      ? 'border-lavender-400 bg-lavender-900/30'
                      : 'border-lavender-700/50 hover:border-lavender-400 hover:bg-midnight-800/70'
                  }`}>
                    <CloudUpload className="w-8 h-8 text-lavender-300" />
                    {fileName ? (
                      <span className="text-sm text-cream-100 text-center font-medium">{fileName}</span>
                    ) : (
                      <span className="text-sm text-cream-200/60 text-center">Click to upload your payment screenshot</span>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                </label>
                <p className="text-xs text-cream-300/45 mt-3 leading-relaxed">
                  Make sure the screenshot clearly shows the transaction amount and payment status.
                </p>
              </div>

              {/* Confirmation checkbox */}
              <label className="flex items-start gap-3 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded accent-lavender-500 shrink-0 cursor-pointer"
                />
                <span className="text-sm text-cream-200/75 leading-relaxed">
                  I have completed the UPI payment of <strong className="text-cream-50">₹{total}</strong> and uploaded the correct screenshot.
                </span>
              </label>

              {/* Error */}
              {submitError && (
                <div className="mb-4 flex items-start gap-2 p-4 rounded-lg bg-red-900/30 border border-red-500/40 text-sm text-red-300">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={!confirmed || !screenshotFile || submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-lavender-400 hover:bg-lavender-300 text-midnight-950 font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-lavender-950/50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-lavender-400"
              >
                {submitting ? 'Completing Registration…' : 'COMPLETE REGISTRATION'}
                {!submitting && <ArrowRight className="w-4 h-4" />}
              </button>

              <p className="mt-3 text-center text-xs text-cream-300/45">
                Payment will be manually verified by the Girl Up team.
              </p>

              <button
                type="button"
                onClick={() => setPaymentSubStep('qr')}
                className="mt-4 w-full text-xs text-lavender-300/70 hover:text-lavender-200 transition-colors flex items-center justify-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back to Payment
              </button>
            </form>
          </Reveal>
        </div>
      </Shell>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // SEAT SELECTION
  // ══════════════════════════════════════════════════════════════════════════
  if (stage === 'seats') {
    return (
      <Shell>
        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <StepBar stepIndex={stepIndex} />

            <div className="mb-6">
              <p className="text-xs tracking-[0.25em] text-lavender-400 font-medium mb-2 uppercase">Step 2</p>
              <h2 className="font-display text-4xl sm:text-5xl font-light text-cream-50 mb-1">Select Your Seats</h2>
              <p className="text-cream-200/65 text-sm">200 seats total · Max {MAX_SEATS} seats per booking · ₹{TICKET_PRICE} each</p>
            </div>

            {/* Selection status bar */}
            <div className="glass-card p-4 mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs text-lavender-300/70 uppercase tracking-wider mb-0.5">Selected Seats</p>
                <p className="text-sm text-cream-100 font-medium">
                  {selectedSeats.length === 0 ? 'None yet — click a seat below' : selectedSeats.join(', ')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-lavender-300/70 uppercase tracking-wider mb-0.5">
                  {selectedSeats.length} / {MAX_SEATS} Seats
                </p>
                <p className="font-display text-2xl text-lavender-200 font-medium">₹{total}</p>
              </div>
            </div>

            {/* Max-exceeded toast */}
            {maxExceededMsg && (
              <div className="mb-4 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-900/30 border border-amber-500/30 text-sm text-amber-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Maximum {MAX_SEATS} seats can be booked at a time.
              </div>
            )}

            {errors.seats && (
              <div className="mb-4 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-900/30 border border-red-500/40 text-sm text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errors.seats}
              </div>
            )}

            {/* Seat map */}
            <div className="glass-card p-4 sm:p-6 mb-6">
              <SeatMap
                selectedSeats={selectedSeats}
                onSeatToggle={handleSeatToggle}
                maxSeats={MAX_SEATS}
                onMaxExceeded={handleMaxExceeded}
                onRefreshRef={handleSeatRefresh}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setStage('form')}
                className="sm:w-auto px-6 py-3 rounded-lg border border-lavender-700/40 text-lavender-300 hover:text-lavender-200 hover:border-lavender-400 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Details
              </button>
              <button
                type="button"
                onClick={handleSeatContinue}
                disabled={selectedSeats.length === 0}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-lavender-400 hover:bg-lavender-300 text-midnight-950 font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-lavender-950/50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-lavender-400"
              >
                Continue to Payment — ₹{total}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </Shell>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // PERSONAL DETAILS (default / 'form' stage)
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <Shell>
      <div className="relative max-w-2xl mx-auto">
        <Reveal>
          <StepBar stepIndex={stepIndex} />

          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.25em] text-lavender-400 font-medium mb-4 uppercase">Registration</p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-cream-50 mb-4 text-balance">
              Reserve Your Seat
            </h2>
            <p className="text-cream-200/65 text-sm">Fill in your details to get started.</p>
          </div>

          {/* Price callout */}
          <div className="mb-6 px-5 py-4 rounded-xl bg-lavender-900/30 border border-lavender-600/30 text-center">
            <p className="text-sm font-medium text-cream-50">
              ₹79 per seat — <span className="text-lavender-300">FREE Popcorn 🍿 + FREE Cool Drink 🥤 included</span>
            </p>
          </div>

          <form onSubmit={handlePersonalSubmit} className="glass-card p-6 sm:p-10 space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-xs text-lavender-300/80 mb-2 tracking-wider uppercase font-medium">Full Name</label>
              <input
                type="text"
                value={personal.fullName}
                onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                placeholder="e.g. Priya Sharma"
                className={inputClass('fullName')}
              />
              {errors.fullName && <p className="text-xs text-red-400 mt-1.5">{errors.fullName}</p>}
            </div>

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-lavender-300/80 mb-2 tracking-wider uppercase font-medium">Email Address</label>
                <input
                  type="email"
                  value={personal.email}
                  onChange={(e) => handlePersonalChange('email', e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs text-lavender-300/80 mb-2 tracking-wider uppercase font-medium">Phone Number</label>
                <input
                  type="tel"
                  value={personal.phone}
                  onChange={(e) => handlePersonalChange('phone', e.target.value)}
                  placeholder="10-digit mobile"
                  className={inputClass('phone')}
                />
                {errors.phone && <p className="text-xs text-red-400 mt-1.5">{errors.phone}</p>}
              </div>
            </div>

            {/* UPI Display Name */}
            <div>
              <label className="block text-xs text-lavender-300/80 mb-2 tracking-wider uppercase font-medium">
                UPI / Payment Display Name
              </label>
              <input
                type="text"
                value={personal.upiDisplayName}
                onChange={(e) => handlePersonalChange('upiDisplayName', e.target.value)}
                placeholder="Name shown on your UPI payment"
                className={inputClass('upiDisplayName')}
              />
              <p className="text-xs text-cream-300/45 mt-1.5">
                Enter the name shown on your UPI payment. This helps us verify your transaction.
              </p>
              {errors.upiDisplayName && <p className="text-xs text-red-400 mt-1.5">{errors.upiDisplayName}</p>}
            </div>

            {/* College Name */}
            <div>
              <label className="block text-xs text-lavender-300/80 mb-2 tracking-wider uppercase font-medium">College Name</label>
              <input
                type="text"
                value={personal.collegeName}
                onChange={(e) => handlePersonalChange('collegeName', e.target.value)}
                placeholder="e.g. Andhra University College of Engineering"
                className={inputClass('collegeName')}
              />
              {errors.collegeName && <p className="text-xs text-red-400 mt-1.5">{errors.collegeName}</p>}
            </div>

            {/* Department + College Registration Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-lavender-300/80 mb-2 tracking-wider uppercase font-medium">Department</label>
                <input
                  type="text"
                  value={personal.department}
                  onChange={(e) => handlePersonalChange('department', e.target.value)}
                  placeholder="e.g. Computer Science"
                  className={inputClass('department')}
                />
                {errors.department && <p className="text-xs text-red-400 mt-1.5">{errors.department}</p>}
              </div>
              <div>
                <label className="block text-xs text-lavender-300/80 mb-2 tracking-wider uppercase font-medium">College Registration Number</label>
                <input
                  type="text"
                  value={personal.collegeRegistrationNumber}
                  onChange={(e) => handlePersonalChange('collegeRegistrationNumber', e.target.value)}
                  placeholder="e.g. 20BCS1234"
                  className={inputClass('collegeRegistrationNumber')}
                />
                {errors.collegeRegistrationNumber && <p className="text-xs text-red-400 mt-1.5">{errors.collegeRegistrationNumber}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-lavender-400 hover:bg-lavender-300 text-midnight-950 font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-lavender-950/50"
            >
              Continue to Seat Selection
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </Reveal>
      </div>
    </Shell>
  );
}

// ── Helper component ──────────────────────────────────────────────────────────

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-lavender-300/70 shrink-0">{label}</span>
      <span className="text-cream-100 font-medium text-right break-all">{value}</span>
    </div>
  );
}

// ── Top-level sub-components ─────────────────────────────────────────────────

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section
      id="register"
      className="relative py-14 sm:py-20 section-padding overflow-hidden bg-gradient-to-b from-[#1E132E] via-[#2A1840] to-[#191026]"
    >
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[80vw] max-w-2xl h-[500px] rounded-full bg-lavender-700/10 blur-[140px]" />
      {children}
    </section>
  );
}

const STEPS = ['Details', 'Seats', 'Payment'];

function StepBar({ stepIndex }: { stepIndex: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border transition-colors ${
                i < stepIndex
                  ? 'bg-lavender-400 border-lavender-400 text-midnight-950'
                  : i === stepIndex
                  ? 'bg-lavender-900/60 border-lavender-400 text-lavender-200'
                  : 'bg-midnight-800/60 border-lavender-800/40 text-cream-300/40'
              }`}
            >
              {i < stepIndex ? '✓' : i + 1}
            </div>
            <span
              className={`text-[10px] mt-1 tracking-wider uppercase font-medium ${
                i === stepIndex ? 'text-lavender-300' : 'text-cream-300/40'
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`w-14 sm:w-20 h-px mx-1 mb-4 transition-colors ${
                i < stepIndex ? 'bg-lavender-400/60' : 'bg-lavender-800/30'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
