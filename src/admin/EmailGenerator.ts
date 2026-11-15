import type { Registration, GeneratedEmail } from './types';

export function generateConfirmationEmail(reg: Registration): GeneratedEmail {
  const count =
    reg.participant_count ??
    (reg.total_amount === 159 ? 3 : reg.total_amount === 179 ? 2 : 1);
  const planType = count === 3 ? 'Trio' : count === 2 ? 'Duo' : 'Single';

  const subject = 'CHAMAK CHALLO Registration Confirmed | Girl Up Andhra University';

  const body = `Dear ${reg.name},

Greetings from Girl Up Andhra University!

We are pleased to confirm that your payment has been verified and your registration for CHAMAK CHALLO is confirmed.

Registration Details
----------------------------------------
Registration ID   : ${reg.registration_id}
Name              : ${reg.name}
Registration Type : ${planType} (${count} ${count > 1 ? 'participants' : 'participant'})
Amount Paid       : ₹${reg.total_amount}

Event Details
----------------------------------------
Event             : CHAMAK CHALLO 2026: A Post-Diwali Celebration of Culture, Unity & Viksit Bharat
Date              : Wednesday, 18 November 2026
Time              : 3:00 PM – 6:00 PM
Venue             : North Campus Basketball Court, Andhra University

Please retain this email and your Registration ID for reference at the event.

We look forward to celebrating with you!

Regards,
Girl Up Andhra University
Andhra University`;

  return {
    recipient: reg.email,
    subject,
    body,
  };
}
