import type { Registration, GeneratedEmail } from './types';

export function generateConfirmationEmail(reg: Registration): GeneratedEmail {
  const subject = 'CHAMAK CHALLO Registration Confirmed | Girl Up Andhra University';

  const body = `Dear ${reg.name},

Greetings from Girl Up Andhra University!

We are pleased to confirm that your payment has been verified and your registration for CHAMAK CHALLO is confirmed.

Registration Details
----------------------------------------
Registration ID : ${reg.registration_id}
Name            : ${reg.name}
Amount Paid     : ₹${reg.total_amount}

Event Details
----------------------------------------
Event           : CHAMAK CHALLO: A Post-Diwali Celebration of Culture, Unity & Viksit Bharat
Date            : 16 November 2026
Time            : 4:00 PM – 7:00 PM
Venue           : North Campus Basketball Court, Andhra University

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
