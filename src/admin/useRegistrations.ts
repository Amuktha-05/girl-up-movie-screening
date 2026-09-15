import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Registration, PaymentStatus, ConfirmationStatus } from './types';

interface UseRegistrationsReturn {
  registrations: Registration[];
  loading: boolean;
  error: string | null;
  fetch: () => Promise<void>;
  updatePaymentStatus: (registrationId: string, status: PaymentStatus) => Promise<void>;
  updateConfirmationStatus: (registrationId: string, status: ConfirmationStatus) => Promise<void>;
  getScreenshotUrl: (path: string) => Promise<string | null>;
}

export function useRegistrations(): UseRegistrationsReturn {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw new Error(fetchError.message);
      setRegistrations((data as Registration[]) ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load registrations');
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePaymentStatus = useCallback(
    async (registrationId: string, status: PaymentStatus) => {
      const { error: updateError } = await supabase
        .from('registrations')
        .update({ payment_status: status })
        .eq('registration_id', registrationId);

      if (updateError) throw new Error(updateError.message);

      // Update local state immediately for responsiveness
      setRegistrations((prev) =>
        prev.map((r) =>
          r.registration_id === registrationId ? { ...r, payment_status: status } : r,
        ),
      );
    },
    [],
  );

  const updateConfirmationStatus = useCallback(
    async (registrationId: string, status: ConfirmationStatus) => {
      const { error: updateError } = await supabase
        .from('registrations')
        .update({ confirmation_status: status })
        .eq('registration_id', registrationId);

      if (updateError) throw new Error(updateError.message);

      setRegistrations((prev) =>
        prev.map((r) =>
          r.registration_id === registrationId ? { ...r, confirmation_status: status } : r,
        ),
      );
    },
    [],
  );

  /**
   * Generate a short-lived signed URL (60 s) for a payment screenshot.
   * The bucket is private — never uses a public URL.
   */
  const getScreenshotUrl = useCallback(async (path: string): Promise<string | null> => {
    const { data, error: urlError } = await supabase.storage
      .from('payment-screenshots')
      .createSignedUrl(path, 60); // 60-second signed URL

    if (urlError || !data?.signedUrl) return null;
    return data.signedUrl;
  }, []);

  return { registrations, loading, error, fetch, updatePaymentStatus, updateConfirmationStatus, getScreenshotUrl };
}
