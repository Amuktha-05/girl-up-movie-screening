import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

/**
 * AdminApp — Auth gate for the /admin route.
 *
 * - On mount: checks Supabase session.
 * - If authenticated: renders <AdminDashboard />.
 * - If not authenticated: renders <AdminLogin />.
 * - Subscribes to onAuthStateChange so login/logout updates the UI instantly.
 */
export default function AdminApp() {
  const [session, setSession] = useState<Session | null | undefined>(undefined); // undefined = loading

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Loading state — brief flash while session is being resolved
  if (session === undefined) {
    return (
      <div className="min-h-screen bg-midnight-950 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-lavender-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
