import { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Image as ImageIcon,
  Mail,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Send,
  AlertCircle,
} from 'lucide-react';
import type { Registration } from './types';
import { generateConfirmationEmail } from './EmailGenerator';

interface Props {
  reg: Registration;
  onUpdatePaymentStatus: (registrationId: string, status: 'verified' | 'rejected') => Promise<void>;
  onUpdateConfirmationStatus: (registrationId: string, status: 'sent') => Promise<void>;
  onGetScreenshotUrl: (path: string) => Promise<string | null>;
  isMobile?: boolean;
}

// ── Tiny helpers ─────────────────────────────────────────────────────────────

function PaymentBadge({ status }: { status: Registration['payment_status'] }) {
  const map = {
    pending:  { label: 'PENDING',  cls: 'bg-amber-900/40 text-amber-300 border-amber-600/40' },
    verified: { label: 'VERIFIED', cls: 'bg-green-900/40 text-green-300 border-green-600/40' },
    rejected: { label: 'REJECTED', cls: 'bg-red-900/40  text-red-300  border-red-600/40'  },
  };
  const { label, cls } = map[status] ?? map.pending;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border ${cls}`}>
      {label}
    </span>
  );
}

function ConfirmationBadge({ status }: { status: Registration['confirmation_status'] }) {
  if (status === 'sent') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border bg-lavender-900/40 text-lavender-300 border-lavender-600/40">
        <Check className="w-2.5 h-2.5" /> SENT
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border bg-midnight-700/60 text-cream-300/50 border-cream-700/20">
      NOT SENT
    </span>
  );
}

function CopyBtn({ text, label, id }: { text: string; label: string; id: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <button
      id={id}
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lavender-800/40 hover:bg-lavender-700/50 border border-lavender-600/30 text-lavender-300 hover:text-lavender-200 text-xs font-medium transition-all duration-150"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function RegistrationRow({
  reg,
  onUpdatePaymentStatus,
  onUpdateConfirmationStatus,
  onGetScreenshotUrl,
  isMobile = false,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [screenshotLoading, setScreenshotLoading] = useState(false);
  const [screenshotError, setScreenshotError] = useState<string | null>(null);
  const [showEmailPanel, setShowEmailPanel] = useState(false);

  const generatedEmail = showEmailPanel ? generateConfirmationEmail(reg) : null;

  // ── Actions ──────────────────────────────────────────────────────────────

  const handleVerify = async () => {
    if (!window.confirm(`Verify payment for ${reg.name} (${reg.registration_id})?\n\nThis will mark payment as VERIFIED.`)) return;
    setActionLoading(true);
    setActionError(null);
    try {
      await onUpdatePaymentStatus(reg.registration_id, 'verified');
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!window.confirm(`Reject payment for ${reg.name} (${reg.registration_id})?\n\nThis will mark payment as REJECTED.`)) return;
    setActionLoading(true);
    setActionError(null);
    try {
      await onUpdatePaymentStatus(reg.registration_id, 'rejected');
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleMarkSent = async () => {
    if (!window.confirm(`Mark confirmation email as SENT for ${reg.name}?\n\nOnly do this after you have manually sent the email.`)) return;
    setActionLoading(true);
    setActionError(null);
    try {
      await onUpdateConfirmationStatus(reg.registration_id, 'sent');
      setShowEmailPanel(false);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewScreenshot = async () => {
    if (screenshotUrl) {
      window.open(screenshotUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (!reg.payment_screenshot) return;
    setScreenshotLoading(true);
    setScreenshotError(null);
    try {
      const url = await onGetScreenshotUrl(reg.payment_screenshot);
      if (url) {
        setScreenshotUrl(url);
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        setScreenshotError('Could not load screenshot.');
      }
    } catch {
      setScreenshotError('Could not load screenshot.');
    } finally {
      setScreenshotLoading(false);
    }
  };

  // ── Mobile card view ──────────────────────────────────────────────────────

  if (isMobile) {
    return (
      <div className="bg-midnight-800/80 border border-lavender-700/25 rounded-xl p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-cream-50">{reg.name}</p>
            <p className="text-xs text-lavender-300/70 font-mono">{reg.registration_id}</p>
          </div>
          <button
            id={`expand-${reg.registration_id}`}
            onClick={() => setExpanded((v) => !v)}
            className="text-lavender-400 hover:text-lavender-300 transition-colors mt-0.5"
            aria-label="Toggle details"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap gap-2">
          <PaymentBadge status={reg.payment_status} />
          <ConfirmationBadge status={reg.confirmation_status} />
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <span className="text-cream-300/50">Seats</span>
          <span className="text-cream-100 font-medium">{Array.isArray(reg.selected_seats) ? reg.selected_seats.join(', ') : '—'}</span>
          <span className="text-cream-300/50">Tickets</span>
          <span className="text-cream-100">{reg.ticket_quantity}</span>
          <span className="text-cream-300/50">Amount</span>
          <span className="text-cream-100">₹{reg.total_amount}</span>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="space-y-2 pt-2 border-t border-lavender-700/20">
            <DetailGrid reg={reg} />
            <ActionPanel
              reg={reg}
              actionLoading={actionLoading}
              actionError={actionError}
              screenshotLoading={screenshotLoading}
              screenshotError={screenshotError}
              showEmailPanel={showEmailPanel}
              generatedEmail={generatedEmail}
              onVerify={handleVerify}
              onReject={handleReject}
              onViewScreenshot={handleViewScreenshot}
              onToggleEmail={() => setShowEmailPanel((v) => !v)}
              onMarkSent={handleMarkSent}
            />
          </div>
        )}
      </div>
    );
  }

  // ── Desktop table row ─────────────────────────────────────────────────────

  return (
    <>
      <tr className="border-b border-lavender-700/15 hover:bg-lavender-900/10 transition-colors">
        {/* Registration ID */}
        <td className="px-3 py-3 whitespace-nowrap">
          <span className="font-mono text-xs text-lavender-300">{reg.registration_id}</span>
        </td>
        {/* Name */}
        <td className="px-3 py-3">
          <p className="text-sm text-cream-50 font-medium">{reg.name}</p>
        </td>
        {/* Email */}
        <td className="px-3 py-3">
          <p className="text-xs text-cream-200/80 break-all">{reg.email}</p>
        </td>
        {/* Phone */}
        <td className="px-3 py-3 whitespace-nowrap">
          <p className="text-xs text-cream-200/70">{reg.phone}</p>
        </td>
        {/* College */}
        <td className="px-3 py-3 max-w-[140px]">
          <p className="text-xs text-cream-200/70 truncate" title={reg.college_name ?? ''}>{reg.college_name ?? '—'}</p>
          <p className="text-[10px] text-cream-300/40 truncate">{reg.department ?? ''}</p>
        </td>
        {/* Reg no */}
        <td className="px-3 py-3 whitespace-nowrap">
          <p className="text-xs text-cream-200/70 font-mono">{reg.college_registration_number ?? '—'}</p>
        </td>
        {/* Seats */}
        <td className="px-3 py-3 whitespace-nowrap">
          <p className="text-xs text-cream-100">{Array.isArray(reg.selected_seats) ? reg.selected_seats.join(', ') : '—'}</p>
        </td>
        {/* Qty */}
        <td className="px-3 py-3 text-center">
          <p className="text-xs text-cream-200/80">{reg.ticket_quantity}</p>
        </td>
        {/* Amount */}
        <td className="px-3 py-3 whitespace-nowrap text-right">
          <p className="text-xs font-medium text-lavender-300">₹{reg.total_amount}</p>
        </td>
        {/* UPI Name */}
        <td className="px-3 py-3 max-w-[120px]">
          <p className="text-xs text-cream-200/60 truncate">{reg.upi_display_name ?? '—'}</p>
        </td>
        {/* Payment Status */}
        <td className="px-3 py-3 whitespace-nowrap">
          <PaymentBadge status={reg.payment_status} />
        </td>
        {/* Confirmation Status */}
        <td className="px-3 py-3 whitespace-nowrap">
          <ConfirmationBadge status={reg.confirmation_status} />
        </td>
        {/* Created at */}
        <td className="px-3 py-3 whitespace-nowrap">
          <p className="text-[10px] text-cream-300/50">{new Date(reg.created_at).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</p>
        </td>
        {/* Actions toggle */}
        <td className="px-3 py-3 whitespace-nowrap">
          <button
            id={`expand-${reg.registration_id}`}
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1 text-xs text-lavender-400 hover:text-lavender-300 transition-colors font-medium"
          >
            {expanded ? 'Hide' : 'Actions'}
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </td>
      </tr>

      {/* Expanded action row */}
      {expanded && (
        <tr className="border-b border-lavender-700/15 bg-midnight-900/40">
          <td colSpan={14} className="px-4 py-4">
            <DetailGrid reg={reg} />
            <div className="mt-3">
              <ActionPanel
                reg={reg}
                actionLoading={actionLoading}
                actionError={actionError}
                screenshotLoading={screenshotLoading}
                screenshotError={screenshotError}
                showEmailPanel={showEmailPanel}
                generatedEmail={generatedEmail}
                onVerify={handleVerify}
                onReject={handleReject}
                onViewScreenshot={handleViewScreenshot}
                onToggleEmail={() => setShowEmailPanel((v) => !v)}
                onMarkSent={handleMarkSent}
              />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function DetailGrid({ reg }: { reg: Registration }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-1.5 text-xs mb-3">
      <Field label="Email" value={reg.email} />
      <Field label="Phone" value={reg.phone} />
      <Field label="College" value={reg.college_name ?? '—'} />
      <Field label="Department" value={reg.department ?? '—'} />
      <Field label="Reg. Number" value={reg.college_registration_number ?? '—'} mono />
      <Field label="UPI Name" value={reg.upi_display_name ?? '—'} />
      <Field label="Seats" value={Array.isArray(reg.selected_seats) ? reg.selected_seats.join(', ') : '—'} />
      <Field label="Amount" value={`₹${reg.total_amount}`} />
    </div>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-cream-300/40 uppercase tracking-wider text-[9px] mb-0.5">{label}</p>
      <p className={`text-cream-100 text-xs ${mono ? 'font-mono' : ''}`}>{value}</p>
    </div>
  );
}

interface ActionPanelProps {
  reg: Registration;
  actionLoading: boolean;
  actionError: string | null;
  screenshotLoading: boolean;
  screenshotError: string | null;
  showEmailPanel: boolean;
  generatedEmail: ReturnType<typeof generateConfirmationEmail> | null;
  onVerify: () => void;
  onReject: () => void;
  onViewScreenshot: () => void;
  onToggleEmail: () => void;
  onMarkSent: () => void;
}

function ActionPanel({
  reg,
  actionLoading,
  actionError,
  screenshotLoading,
  screenshotError,
  showEmailPanel,
  generatedEmail,
  onVerify,
  onReject,
  onViewScreenshot,
  onToggleEmail,
  onMarkSent,
}: ActionPanelProps) {
  return (
    <div className="space-y-3">

      {/* Error */}
      {actionError && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-900/30 border border-red-500/30 text-xs text-red-300">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {actionError}
        </div>
      )}

      {/* Action buttons row */}
      <div className="flex flex-wrap gap-2">

        {/* Screenshot */}
        {reg.payment_screenshot && (
          <button
            id={`screenshot-${reg.registration_id}`}
            onClick={onViewScreenshot}
            disabled={screenshotLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-midnight-700/60 hover:bg-midnight-600/60 border border-lavender-700/30 text-lavender-300 hover:text-lavender-200 text-xs font-medium transition-all duration-150 disabled:opacity-50"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            {screenshotLoading ? 'Loading…' : 'View Payment Screenshot'}
          </button>
        )}
        {screenshotError && <span className="text-xs text-red-400">{screenshotError}</span>}

        {/* Verify / Reject */}
        {reg.payment_status !== 'verified' && (
          <button
            id={`verify-${reg.registration_id}`}
            onClick={onVerify}
            disabled={actionLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-900/40 hover:bg-green-800/50 border border-green-600/40 text-green-300 hover:text-green-200 text-xs font-medium transition-all duration-150 disabled:opacity-50"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verify Payment
          </button>
        )}

        {reg.payment_status !== 'rejected' && (
          <button
            id={`reject-${reg.registration_id}`}
            onClick={onReject}
            disabled={actionLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-900/40 hover:bg-red-800/50 border border-red-600/40 text-red-300 hover:text-red-200 text-xs font-medium transition-all duration-150 disabled:opacity-50"
          >
            <XCircle className="w-3.5 h-3.5" />
            Reject Payment
          </button>
        )}

        {/* Generate email (only after verified) */}
        {reg.payment_status === 'verified' && (
          <button
            id={`email-${reg.registration_id}`}
            onClick={onToggleEmail}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-lavender-800/40 hover:bg-lavender-700/50 border border-lavender-600/30 text-lavender-300 hover:text-lavender-200 text-xs font-medium transition-all duration-150"
          >
            <Mail className="w-3.5 h-3.5" />
            {showEmailPanel ? 'Hide Email' : 'Generate Confirmation Email'}
          </button>
        )}

        {/* Mark sent (only after verified + email panel visible or already shown) */}
        {reg.payment_status === 'verified' && reg.confirmation_status === 'not_sent' && (
          <button
            id={`mark-sent-${reg.registration_id}`}
            onClick={onMarkSent}
            disabled={actionLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-midnight-700/60 hover:bg-midnight-600/60 border border-cream-700/20 text-cream-300/70 hover:text-cream-200 text-xs font-medium transition-all duration-150 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            Mark Confirmation Sent
          </button>
        )}

        {/* Verified + sent indicator */}
        {reg.payment_status === 'verified' && reg.confirmation_status === 'sent' && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-lavender-300/70">
            <Check className="w-3.5 h-3.5 text-lavender-400" /> Confirmation email marked as sent
          </span>
        )}

        {/* Loading indicator */}
        {actionLoading && (
          <span className="inline-flex items-center gap-1 text-xs text-cream-300/50">
            <Clock className="w-3.5 h-3.5 animate-spin" /> Updating…
          </span>
        )}
      </div>

      {/* Email panel */}
      {showEmailPanel && generatedEmail && (
        <div className="mt-3 bg-midnight-900/60 border border-lavender-700/20 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-lavender-300 uppercase tracking-wider">Generated Confirmation Email</p>
            <p className="text-[10px] text-cream-300/40">⚠ Do NOT send from this dashboard — copy and send manually from Gmail</p>
          </div>

          {/* Recipient */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-cream-300/50 uppercase tracking-wider">To (Recipient)</p>
              <CopyBtn
                id={`copy-email-addr-${reg.registration_id}`}
                text={generatedEmail.recipient}
                label="Copy Email Address"
              />
            </div>
            <p className="text-sm text-cream-100 bg-midnight-800/80 rounded-lg px-3 py-2 border border-lavender-700/20 font-mono text-xs select-all">
              {generatedEmail.recipient}
            </p>
          </div>

          {/* Subject */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-cream-300/50 uppercase tracking-wider">Subject</p>
              <CopyBtn
                id={`copy-subject-${reg.registration_id}`}
                text={generatedEmail.subject}
                label="Copy Subject"
              />
            </div>
            <p className="text-xs text-cream-100 bg-midnight-800/80 rounded-lg px-3 py-2 border border-lavender-700/20 select-all">
              {generatedEmail.subject}
            </p>
          </div>

          {/* Body */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-cream-300/50 uppercase tracking-wider">Email Body</p>
              <CopyBtn
                id={`copy-body-${reg.registration_id}`}
                text={generatedEmail.body}
                label="Copy Email Body"
              />
            </div>
            <pre className="text-xs text-cream-200/80 bg-midnight-800/80 rounded-lg px-3 py-3 border border-lavender-700/20 whitespace-pre-wrap leading-relaxed font-sans select-all overflow-x-auto">
              {generatedEmail.body}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
