// ============================================================
// PRICING DATA — Tiered bundle pricing, snacks included
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

// Tiered bundle pricing: qty → total amount
// Single ₹79 · Duo ₹139 · Trio ₹179 · Squad ₹249
export const BUNDLE_PRICES: Record<number, number> = {
  1: 79,
  2: 139,
  3: 179,
  4: 249,
};

/** Returns the bundle total for the given seat count (falls back to per-ticket rate for >4). */
export function getBundleTotal(qty: number): number {
  return BUNDLE_PRICES[qty] ?? qty * TICKET_PRICE;
}

export const ticketOptions: TicketOption[] = [
  {
    id: 'student',
    name: 'Movie Mania Ticket',
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
  // Static uploaded QR image — fallback
  qrImage: '/images/payment-qr.png',
  // Dynamic QR images mapped by bundle total amount
  qrImages: {
    79: '/images/payment-qr-79.png',
    139: '/images/payment-qr-139.png',
    179: '/images/payment-qr-179.png',
    249: '/images/payment-qr-249.png',
  } as Record<number, string>,
};

export function getPaymentQrImage(totalAmount: number): string {
  return paymentData.qrImages[totalAmount] ?? paymentData.qrImage;
}

