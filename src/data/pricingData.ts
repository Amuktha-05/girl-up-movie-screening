// ============================================================
// PRICING DATA — Single ticket at ₹79, snacks included
// All prices are in Indian Rupees (₹)
// ============================================================

export interface TicketOption {
  id: string;
  name: string;
  price: number;
  description: string;
  perks: string[];
  highlight?: boolean;
}

export const TICKET_PRICE = 79;
export const ORIGINAL_PRICE = 120; // Was ₹120, now Early Bird ₹79

export const ticketOptions: TicketOption[] = [
  {
    id: 'student',
    name: 'Movie Night Ticket',
    price: TICKET_PRICE,
    description: 'Open to all. Snacks included — no extra charge.',
    perks: [
      'Entry to Lokah screening',
      'FREE Popcorn 🍿',
      'FREE Cool Drink 🥤',
      'Reserved seating on a first-come basis',
    ],
    highlight: true,
  },
];

export const paymentData = {
  payeeName: 'Girl Up Andhra University',
  // Static uploaded QR image — same for all ticket quantities
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

