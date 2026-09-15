import type { Registration, GeneratedEmail } from './types';

/**
 * Generates the confirmation email for a verified registration.
 * NO email is sent — this returns plain text for the admin to copy and paste.
 */
export function generateConfirmationEmail(reg: Registration): GeneratedEmail {
  const seatsDisplay = Array.isArray(reg.selected_seats) && reg.selected_seats.length > 0
    ? reg.selected_seats.join(', ')
    : 'N/A';

  const subject = 'Registration Confirmation – Girl Up Andhra University Movie Night';

  const body = `Dear ${reg.name},

Greetings from Girl Up Andhra University!

We are pleased to confirm your registration for the Girl Up Andhra University Movie Night featuring Lokah: Chapter 1 – Chandra.

─────────────────────────────────────
Registration Details
─────────────────────────────────────
Registration ID    : ${reg.registration_id}
Name               : ${reg.name}
Seats              : ${seatsDisplay}
Number of Tickets  : ${reg.ticket_quantity}
Amount Paid        : ₹${reg.total_amount}

─────────────────────────────────────
Event Details
─────────────────────────────────────
Date   : 18 September 2026
Time   : 3:30 PM onwards
Venue  : Sri Ramaneni Kodandiramaiah Auditorium, opposite Law College, South Campus, Andhra University

─────────────────────────────────────

Your payment has been verified and your registration is confirmed.

Please retain this email and your Registration ID for reference during the event.

We look forward to seeing you at the screening!

Regards,
Girl Up Andhra University
Andhra University`;

  return {
    recipient: reg.email,
    subject,
    body,
  };
}
