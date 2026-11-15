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

export type RegistrationPlanId = 'single' | 'duo' | 'trio';

export interface RegistrationPlan {
  id: RegistrationPlanId;
  label: 'Single' | 'Duo' | 'Trio';
  participantCount: 1 | 2 | 3;
  totalAmount: 199 | 179 | 159;
  summary: string;
}

/** Group totals, not per-person prices. */
export const registrationPlans: RegistrationPlan[] = [
  {
    id: 'single',
    label: 'Single',
    participantCount: 1,
    totalAmount: 199,
    summary: '1 person — ₹199 total',
  },
  {
    id: 'duo',
    label: 'Duo',
    participantCount: 2,
    totalAmount: 179,
    summary: '2 people — ₹179 total',
  },
  {
    id: 'trio',
    label: 'Trio',
    participantCount: 3,
    totalAmount: 159,
    summary: '3 people — ₹159 total',
  },
];

export function getRegistrationPlan(id: RegistrationPlanId): RegistrationPlan {
  const plan = registrationPlans.find((item) => item.id === id);
  if (!plan) throw new Error(`Unknown registration plan: ${id}`);
  return plan;
}

export const TICKET_PRICE = registrationPlans[0].totalAmount;
export const ORIGINAL_PRICE = registrationPlans[0].totalAmount;

export const ticketOptions: TicketOption[] = registrationPlans.map((plan) => ({
  id: plan.id,
  name: `${plan.label} registration`,
  price: plan.totalAmount,
  description: plan.summary,
  perks: ['Entry to CHAMAK CHALLO', 'Total group price'],
  highlight: plan.id === 'single',
}));

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

