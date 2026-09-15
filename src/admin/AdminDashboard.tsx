import { useState, useEffect, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useRegistrations } from './useRegistrations';
import RegistrationRow from './RegistrationRow';
import {
  RefreshCw,
  LogOut,
  Search,
  X,
  Filter,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';
import type { Registration } from './types';

// ── Filter state ──────────────────────────────────────────────────────────────

type PaymentFilter = 'all' | 'pending' | 'verified' | 'rejected';
type ConfirmationFilter = 'all' | 'not_sent' | 'sent';

// ── Stats card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, icon: Icon, colorClass }: {
  label: string; value: number; icon: React.FC<{ className?: string }>; colorClass: string;
}) {
  return (
    <div className="bg-midnight-800/80 border border-lavender-700/25 rounded-xl px-4 py-3 flex items-center gap-3">
      <div className={`p-2 rounded-lg ${colorClass}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xl font-bold text-cream-50">{value}</p>
        <p className="text-[10px] text-cream-300/50 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}

// ── Main dashboard ────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { registrations, loading, error, fetch, updatePaymentStatus, updateConfirmationStatus, getScreenshotUrl } = useRegistrations();

  const [search, setSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>('all');
  const [confirmationFilter, setConfirmationFilter] = useState<ConfirmationFilter>('all');
  const [isMobile, setIsMobile] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load registrations on mount
  useEffect(() => { fetch(); }, [fetch]);

  // Get current user email for display
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setAdminEmail(data.user?.email ?? null);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // ── Filtering / search (client-side) ───────────────────────────────────────

  const filtered = useMemo<Registration[]>(() => {
    const q = search.trim().toLowerCase();
    return registrations.filter((r) => {
      // Text search
      if (q) {
        const matchName = r.name.toLowerCase().includes(q);
        const matchEmail = r.email.toLowerCase().includes(q);
        const matchId = r.registration_id.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchId) return false;
      }
      // Payment filter
      if (paymentFilter !== 'all' && r.payment_status !== paymentFilter) return false;
      // Confirmation filter
      if (confirmationFilter !== 'all' && r.confirmation_status !== confirmationFilter) return false;
      return true;
    });
  }, [registrations, search, paymentFilter, confirmationFilter]);

  // ── Stats ─────────────────────────────────────────────────────────────────

  const stats = useMemo(() => ({
    total: registrations.length,
    pending: registrations.filter((r) => r.payment_status === 'pending').length,
    verified: registrations.filter((r) => r.payment_status === 'verified').length,
    rejected: registrations.filter((r) => r.payment_status === 'rejected').length,
  }), [registrations]);

  // ── Wrapper callbacks (stable refs via useCallback not needed here — already memoized in hook) ──

  const handleUpdatePayment = useCallback(
    (id: string, status: 'verified' | 'rejected') => updatePaymentStatus(id, status),
    [updatePaymentStatus],
  );
  const handleUpdateConfirmation = useCallback(
    (id: string) => updateConfirmationStatus(id, 'sent'),
    [updateConfirmationStatus],
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-midnight-950 font-body text-cream-50">

      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-midnight-900/95 border-b border-lavender-700/25 backdrop-blur-sm px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="shrink-0 w-7 h-7 rounded-lg bg-lavender-800/50 border border-lavender-600/30 flex items-center justify-center">
            <Users className="w-3.5 h-3.5 text-lavender-300" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-semibold text-cream-50 truncate">Admin Dashboard</h1>
            <p className="text-[10px] text-cream-300/40 truncate">Girl Up AU · Movie Night</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {adminEmail && (
            <span className="hidden sm:block text-xs text-cream-300/50 truncate max-w-[180px]">{adminEmail}</span>
          )}
          <button
            id="admin-refresh"
            onClick={fetch}
            disabled={loading}
            title="Refresh registrations"
            className="p-1.5 rounded-lg text-lavender-400 hover:text-lavender-300 hover:bg-lavender-900/30 transition-colors disabled:opacity-40"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            id="admin-logout"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-900/30 hover:bg-red-800/40 border border-red-700/30 text-red-400 hover:text-red-300 text-xs font-medium transition-all duration-150"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-6 space-y-5 max-w-[1600px] mx-auto">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Total" value={stats.total} icon={Users} colorClass="bg-lavender-800/50 text-lavender-300" />
          <StatCard label="Pending" value={stats.pending} icon={Clock} colorClass="bg-amber-900/40 text-amber-300" />
          <StatCard label="Verified" value={stats.verified} icon={CheckCircle2} colorClass="bg-green-900/40 text-green-300" />
          <StatCard label="Rejected" value={stats.rejected} icon={XCircle} colorClass="bg-red-900/40 text-red-300" />
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lavender-500/60 pointer-events-none" />
            <input
              id="admin-search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or registration ID…"
              className="w-full pl-9 pr-9 py-2.5 rounded-lg bg-midnight-800/80 border border-lavender-700/30 text-cream-50 placeholder-cream-300/25 text-sm outline-none transition-all duration-200 focus:border-lavender-400 focus:ring-1 focus:ring-lavender-400/20"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-300/40 hover:text-cream-200 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Payment filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-lavender-500/60 shrink-0" />
            <select
              id="admin-payment-filter"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value as PaymentFilter)}
              className="py-2.5 px-3 rounded-lg bg-midnight-800/80 border border-lavender-700/30 text-cream-50 text-sm outline-none transition-all duration-200 focus:border-lavender-400 cursor-pointer"
            >
              <option value="all">All Payments</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Confirmation filter */}
          <div>
            <select
              id="admin-confirmation-filter"
              value={confirmationFilter}
              onChange={(e) => setConfirmationFilter(e.target.value as ConfirmationFilter)}
              className="w-full py-2.5 px-3 rounded-lg bg-midnight-800/80 border border-lavender-700/30 text-cream-50 text-sm outline-none transition-all duration-200 focus:border-lavender-400 cursor-pointer"
            >
              <option value="all">All Confirmations</option>
              <option value="not_sent">Not Sent</option>
              <option value="sent">Sent</option>
            </select>
          </div>
        </div>

        {/* Result count */}
        <p className="text-xs text-cream-300/40">
          Showing <span className="text-cream-200">{filtered.length}</span> of {registrations.length} registrations
          {(search || paymentFilter !== 'all' || confirmationFilter !== 'all') && (
            <button
              onClick={() => { setSearch(''); setPaymentFilter('all'); setConfirmationFilter('all'); }}
              className="ml-2 text-lavender-400 hover:text-lavender-300 underline underline-offset-2 transition-colors"
            >
              Clear filters
            </button>
          )}
        </p>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-900/30 border border-red-500/40 text-sm text-red-300">
            <XCircle className="w-4 h-4 shrink-0" />
            <span>Error loading registrations: {error}</span>
            <button onClick={fetch} className="ml-auto text-xs underline hover:no-underline">Retry</button>
          </div>
        )}

        {/* Loading */}
        {loading && registrations.length === 0 && (
          <div className="text-center py-20 text-cream-300/40">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3 text-lavender-500/50" />
            <p className="text-sm">Loading registrations…</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20 text-cream-300/40">
            <Users className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">{registrations.length === 0 ? 'No registrations yet.' : 'No registrations match your filters.'}</p>
          </div>
        )}

        {/* ── Mobile: card list ─────────────────────────────────────────────── */}
        {isMobile && filtered.length > 0 && (
          <div className="space-y-3">
            {filtered.map((reg) => (
              <RegistrationRow
                key={reg.registration_id}
                reg={reg}
                isMobile
                onUpdatePaymentStatus={handleUpdatePayment}
                onUpdateConfirmationStatus={handleUpdateConfirmation}
                onGetScreenshotUrl={getScreenshotUrl}
              />
            ))}
          </div>
        )}

        {/* ── Desktop: table ─────────────────────────────────────────────────── */}
        {!isMobile && filtered.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-lavender-700/25 bg-midnight-800/50">
            <table className="w-full min-w-[1200px] text-left border-collapse">
              <thead>
                <tr className="border-b border-lavender-700/30 bg-midnight-900/60">
                  {[
                    'Reg ID', 'Name', 'Email', 'Phone', 'College', 'Reg No.',
                    'Seats', 'Qty', 'Amount', 'UPI Name', 'Payment', 'Confirmation', 'Created', 'Actions',
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2.5 text-[10px] font-semibold text-lavender-300/60 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((reg) => (
                  <RegistrationRow
                    key={reg.registration_id}
                    reg={reg}
                    isMobile={false}
                    onUpdatePaymentStatus={handleUpdatePayment}
                    onUpdateConfirmationStatus={handleUpdateConfirmation}
                    onGetScreenshotUrl={getScreenshotUrl}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
