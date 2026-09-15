import { useState, type FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!email.trim() || !password) return;

    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError(authError.message === 'Invalid login credentials'
        ? 'Invalid email or password.'
        : authError.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-midnight-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-lavender-800/40 border border-lavender-600/30 mb-4">
            <Lock className="w-5 h-5 text-lavender-300" />
          </div>
          <h1 className="text-xl font-semibold text-cream-50 mb-1">Admin Login</h1>
          <p className="text-xs text-cream-300/50">Girl Up Andhra University · Movie Night</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-midnight-800/90 border border-lavender-700/30 rounded-xl shadow-xl p-6 space-y-4">

          {/* Email */}
          <div>
            <label className="block text-xs text-lavender-300/70 mb-1.5 tracking-wide uppercase font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lavender-500/60" />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                placeholder="admin@example.com"
                required
                autoComplete="email"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-midnight-900/80 border border-lavender-700/40 text-cream-50 placeholder-cream-300/25 text-sm outline-none transition-all duration-200 focus:border-lavender-400 focus:ring-1 focus:ring-lavender-400/20"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs text-lavender-300/70 mb-1.5 tracking-wide uppercase font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-lavender-500/60" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-midnight-900/80 border border-lavender-700/40 text-cream-50 placeholder-cream-300/25 text-sm outline-none transition-all duration-200 focus:border-lavender-400 focus:ring-1 focus:ring-lavender-400/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-lavender-500/60 hover:text-lavender-400 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-red-900/30 border border-red-500/40 text-sm text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            id="admin-login-submit"
            type="submit"
            disabled={loading || !email.trim() || !password}
            className="w-full py-2.5 rounded-lg bg-lavender-500 hover:bg-lavender-400 text-midnight-950 font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-cream-300/30 mt-6">
          Restricted access — Girl Up AU admins only
        </p>
      </div>
    </div>
  );
}
