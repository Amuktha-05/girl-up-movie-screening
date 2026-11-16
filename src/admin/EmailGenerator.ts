import type { Registration, GeneratedEmail } from './types';

export function generateConfirmationEmail(reg: Registration): GeneratedEmail {
  // participant_count is stored directly; fall back by matching correct per-plan totals
  const count =
    reg.participant_count ??
    (reg.total_amount === 477 ? 3 : reg.total_amount === 358 ? 2 : 1);

  const isIndividual =
    reg.total_amount === 120 ||
    (count === 1 && reg.total_amount !== 199 && reg.total_amount !== 175);

  const planType = isIndividual
    ? 'Individual Entry'
    : count === 3
    ? 'Trio'
    : count === 2
    ? 'Duo'
    : 'Single';

  const pricePerPerson =
    reg.total_amount === 120
      ? 120
      : count === 3
      ? 159
      : count === 2
      ? 179
      : count === 1
      ? reg.total_amount
      : Math.round(reg.total_amount / count);

  const subject = `Payment Verified & Registration Confirmed: VIBRANCE – Celebrating Culture, Inspiring Change (${reg.registration_id})`;

  // For new registrations, display "Individual Entry — JUST ₹120" with the Limited-Time Special Offer wording.
  // For older registrations, preserve historical details (Single, Duo, Trio, price per person, total amount).
  const registrationDetailsBlock = isIndividual
    ? `Registration ID   : ${reg.registration_id}
Name              : ${reg.name}
Registration Type : Individual Entry — JUST ₹120
Offer             : Limited-Time Special Offer
Participants      : 1
Amount Paid       : JUST ₹120
Payment Status    : VERIFIED & CONFIRMED`
    : `Registration ID   : ${reg.registration_id}
Name              : ${reg.name}
Registration Type : ${planType} (${count} ${count > 1 ? 'participants' : 'participant'})
Price Per Person  : ₹${pricePerPerson}
Amount Paid       : ₹${reg.total_amount}
Payment Status    : VERIFIED & CONFIRMED`;

  const body = `Dear ${reg.name},

Greetings from Girl Up Andhra University!

Your UPI payment has been successfully reviewed and verified by our organising team. We are pleased to confirm that your registration for VIBRANCE is now officially APPROVED and CONFIRMED.

(Please note: This email serves as your official Payment Confirmation and Verified Entry Pass, confirming that your payment has been approved and your spot is confirmed, distinct from the preliminary registration acknowledgement.)

Registration Details
----------------------------------------
${registrationDetailsBlock}

Event Details
----------------------------------------
Event             : VIBRANCE – Celebrating Culture, Inspiring Change
Theme             : A Celebration of Culture, Diversity, Youth Expression & Viksit Bharat @2047
Organised By      : Girl Up Andhra University
Date              : Wednesday, 18 November 2026
Time              : 3:00 PM – 6:00 PM
Venue             : North Campus Basketball Court, Andhra University, Visakhapatnam

Important Instructions
----------------------------------------
• Please retain this confirmation email and your Registration ID (${reg.registration_id}) for entry verification at the event.
• Your entry pass grants full festival access to all cultural performances, live music, dance showcases, open mic, awareness activities, and festival stalls.
• For live updates and announcements, follow our official Instagram handle: @girlup.au

We look forward to celebrating with you at VIBRANCE!

Warm regards,
Girl Up Andhra University
Andhra University`;

  return {
    recipient: reg.email,
    subject,
    body,
  };
}
