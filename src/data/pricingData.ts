// ============================================================
// PRICING DATA — VIBRANCE ✨
// All prices are in Indian Rupees (₹)
// Individual Entry only: ₹120 per participant
// ============================================================

export interface TicketOption {
  id: string;
  name: string;
  price: number;
  description: string;
  perks: string[];
  highlight?: boolean;
}

export const TICKET_PRICE = 120;
export const ORIGINAL_PRICE = 120;

export const PAYMENT_QR_IMAGE = '/images/payment-qr-120.png';

export const ticketOptions: TicketOption[] = [
  {
    id: 'individual',
    name: 'Individual Entry Pass',
    price: 120,
    description: 'Limited-Time Special Offer — JUST ₹120',
    perks: ['Full entry to VIBRANCE', 'Access to all cultural performances, stalls & activities'],
    highlight: true,
  },
];

export const paymentData = {
  payeeName: 'Girl Up Andhra University',
  qrImage: PAYMENT_QR_IMAGE,
};

export function getPaymentQrImage(): string {
  return PAYMENT_QR_IMAGE;
}
