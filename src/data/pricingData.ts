// ============================================================
// PRICING DATA â€” CHAMAK CHALLO âœ¨
// Ticket pricing and categories to be confirmed before launch.
// All prices are in Indian Rupees (â‚¹)
// ============================================================

export interface TicketOption {
  id: string;
  name: string;
  price: number;
  description: string;
  perks: string[];
  highlight?: boolean;
}

// NOTE: TICKET_PRICE and categories are placeholder values.
// Update these when official pricing is confirmed.
export const TICKET_PRICE = 175;
export const ORIGINAL_PRICE = 175;

export const ticketOptions: TicketOption[] = [
  {
    id: 'student',
    name: 'CHAMAK CHALLO Entry Ticket',
    price: TICKET_PRICE,
    description: 'Full access to all CHAMAK CHALLO experiences.',
    perks: [
      'Entry to CHAMAK CHALLO event',
      'DJ & Bollywood Dance Night access',
      'Festive activities & games',
      'Reserved seating',
    ],
    highlight: true,
  },
];

export const paymentData = {
  payeeName: 'Girl Up Andhra University',
  // Static uploaded QR image â€” same for all ticket quantities
  qrImage: '/images/payment-qr.png',
  // Dynamic QR images mapped by total amount
  qrImages: {
    79: '/images/payment-qr-79.png',
    158: '/images/payment-qr-158.png',
    237: '/images/payment-qr-237.png',
    316: '/images/payment-qr-316.png',
  } as Record<number, string>,
};

export function getPaymentQrImage(totalAmount: number): string {
  return paymentData.qrImages[totalAmount] ?? paymentData.qrImage;
}

