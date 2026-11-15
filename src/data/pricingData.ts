// ============================================================
// PRICING DATA — CHAMAK CHALLO ✨
// All prices are in Indian Rupees (₹)
// Prices are PER PERSON. Total = participantCount × pricePerPerson.
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
  pricePerPerson: 199 | 179 | 159;
  totalAmount: 199 | 358 | 477;
  summary: string;
}

/** Per-person prices. Total = participantCount × pricePerPerson. */
export const registrationPlans: RegistrationPlan[] = [
  {
    id: 'single',
    label: 'Single',
    participantCount: 1,
    pricePerPerson: 199,
    totalAmount: 199,
    summary: '1 person — ₹199 per person — ₹199 total',
  },
  {
    id: 'duo',
    label: 'Duo',
    participantCount: 2,
    pricePerPerson: 179,
    totalAmount: 358,
    summary: '2 people — ₹179 per person — ₹358 total',
  },
  {
    id: 'trio',
    label: 'Trio',
    participantCount: 3,
    pricePerPerson: 159,
    totalAmount: 477,
    summary: '3 people — ₹159 per person — ₹477 total',
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
  perks: ['Entry to CHAMAK CHALLO', `₹${plan.pricePerPerson} per person`],
  highlight: plan.id === 'single',
}));

export const paymentData = {
  payeeName: 'Girl Up Andhra University',
  // Fallback static QR image
  qrImage: '/images/payment-qr.png',
  // Dynamic QR images mapped by total amount
  qrImages: {
    199: '/images/payment-qr-199.png',
    358: '/images/payment-qr-358.png',
    477: '/images/payment-qr-477.png',
  } as Record<number, string>,
};

export function getPaymentQrImage(totalAmount: number): string {
  return paymentData.qrImages[totalAmount] ?? paymentData.qrImage;
}
