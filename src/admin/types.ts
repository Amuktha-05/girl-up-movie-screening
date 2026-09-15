// ── Admin Types ────────────────────────────────────────────────────────────────
// Matches the public.registrations table schema exactly.
// Add confirmation_status if it does not yet exist (migration required — see SQL scripts).

export type PaymentStatus = 'pending' | 'verified' | 'rejected';
export type ConfirmationStatus = 'not_sent' | 'sent';

export interface Registration {
  id: number;                             // internal serial PK
  registration_id: string;               // GUAU-XXXXXX
  name: string;
  email: string;
  phone: string;
  college_name: string | null;
  department: string | null;
  college_registration_number: string | null;
  selected_seats: string[];              // array of seat labels
  ticket_quantity: number;
  total_amount: number;
  upi_display_name: string | null;
  payment_screenshot: string | null;     // storage path within payment-screenshots bucket
  payment_status: PaymentStatus;
  confirmation_status: ConfirmationStatus;
  created_at: string;                    // ISO timestamp
}

export interface GeneratedEmail {
  recipient: string;
  subject: string;
  body: string;
}
