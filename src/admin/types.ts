export type PaymentStatus = 'pending' | 'verified' | 'rejected';
export type ConfirmationStatus = 'not_sent' | 'sent';

export interface Registration {
  id: string;
  registration_id: string;
  name: string;
  email: string;
  phone: string;
  college_name: string | null;
  department: string | null;
  college_registration_number: string | null;
  upi_display_name: string | null;
  payment_screenshot: string;
  total_amount: number;
  payment_status: PaymentStatus;
  confirmation_status: ConfirmationStatus;
  created_at: string;
}

export interface GeneratedEmail {
  recipient: string;
  subject: string;
  body: string;
}
