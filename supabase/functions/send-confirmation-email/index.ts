// Supabase Edge Function — send-confirmation-email
// Deployed via: Supabase Dashboard → Edge Functions → Deploy
// Secret required: RESEND_API_KEY (set in Edge Function secrets, never in frontend)

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const RESEND_API_URL = 'https://api.resend.com/emails';

interface RegistrationPayload {
  registrationId: string;
  name: string;
  email: string;
  phone: string;
  ticketQuantity: number;
  totalAmount: number;
  selectedSeats: string[];
  collegeName: string;
  department: string;
  collegeRegistrationNumber: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload: RegistrationPayload = await req.json();

    const { registrationId, name, email, phone, ticketQuantity, totalAmount, selectedSeats, collegeName, department, collegeRegistrationNumber } = payload;

    const seatsDisplay = Array.isArray(selectedSeats) && selectedSeats.length > 0
      ? selectedSeats.join(', ')
      : 'N/A';

    // Basic validation — reject clearly bad inputs
    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const resendKey = Deno.env.get('RESEND_API_KEY');
    if (!resendKey) {
      console.error('RESEND_API_KEY secret is not set');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Registration Confirmed</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4a1d8a,#7c3aed);padding:32px 40px;text-align:center;">
              <p style="margin:0 0 6px 0;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#c4b5fd;">Girl Up Andhra University</p>
              <h1 style="margin:0;font-size:26px;font-weight:300;color:#ffffff;letter-spacing:1px;">Movie Mania 🎬</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 8px 0;font-size:16px;color:#1a1a2e;font-weight:600;">Hi ${name},</p>
              <p style="margin:0 0 24px 0;font-size:15px;color:#444;line-height:1.6;">
                Thank you for registering for the Girl Up Andhra University Movie Mania!
                We have successfully received your registration. Kindly check your details below.
              </p>

              <!-- Registration ID highlight -->
              <div style="background:#f5f0ff;border:1px solid #c4b5fd;border-radius:8px;padding:16px 20px;margin-bottom:28px;text-align:center;">
                <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7c3aed;">Registration ID</p>
                <p style="margin:0;font-size:22px;font-weight:700;color:#4a1d8a;letter-spacing:3px;">${registrationId}</p>
              </div>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8ef;border-radius:8px;overflow:hidden;margin-bottom:28px;">
                <tr style="background:#f9f8ff;">
                  <td style="padding:10px 16px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#7c3aed;border-bottom:1px solid #e8e8ef;" colspan="2">Your Registration Details</td>
                </tr>
                ${[
                  ['Name', name],
                  ['Email', email],
                  ['Phone', phone],
                  ['College Name', collegeName ?? ''],
                  ['Department', department ?? ''],
                  ['College Reg. No.', collegeRegistrationNumber ?? ''],
                  ['Selected Seats', seatsDisplay],
                  ['Number of Tickets', String(ticketQuantity)],
                  ['Total Amount', `\u20b9${totalAmount}`],
                ].map(([label, value], i) => `
                <tr style="background:${i % 2 === 0 ? '#ffffff' : '#fafafe'};">
                  <td style="padding:11px 16px;font-size:13px;color:#666;border-bottom:1px solid #f0f0f5;width:45%;">${label}</td>
                  <td style="padding:11px 16px;font-size:13px;color:#1a1a2e;font-weight:600;border-bottom:1px solid #f0f0f5;">${value}</td>
                </tr>`).join('')}
              </table>

              <!-- Event details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e8e8ef;border-radius:8px;overflow:hidden;margin-bottom:28px;">
                <tr style="background:#f9f8ff;">
                  <td style="padding:10px 16px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#7c3aed;border-bottom:1px solid #e8e8ef;" colspan="2">Event Details</td>
                </tr>
                ${[
                  ['Movie', 'Lokah: Chapter 1 \u2013 Chandra'],
                  ['Date', '18 September 2026'],
                  ['Time', '3:30 PM onwards'],
                  ['Venue', 'Sri Ramaneni Kodandiramaiah Auditorium, opposite Law College, South Campus, Andhra University'],
                ].map(([label, value], i) => `
                <tr style="background:${i % 2 === 0 ? '#ffffff' : '#fafafe'};">
                  <td style="padding:11px 16px;font-size:13px;color:#666;border-bottom:1px solid #f0f0f5;width:25%;white-space:nowrap;">${label}</td>
                  <td style="padding:11px 16px;font-size:13px;color:#1a1a2e;font-weight:600;border-bottom:1px solid #f0f0f5;">${value}</td>
                </tr>`).join('')}
              </table>

              <p style="margin:0;font-size:15px;color:#444;line-height:1.6;">
                Thank you for registering. We look forward to seeing you at Movie Mania! 🎉
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9f8ff;padding:20px 40px;text-align:center;border-top:1px solid #e8e8ef;">
              <p style="margin:0;font-size:12px;color:#999;">Girl Up Andhra University &nbsp;|&nbsp; girlup.andhrauniversity@gmail.com</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const emailText = `
Hi ${name},

Thank you for registering for the Girl Up Andhra University Movie Mania!
We have successfully received your registration. Kindly check your details below.

Registration ID: ${registrationId}

--- YOUR REGISTRATION DETAILS ---
Name:                        ${name}
Email:                       ${email}
Phone:                       ${phone}
College Name:                ${collegeName ?? ''}
Department:                  ${department ?? ''}
College Reg. No.:            ${collegeRegistrationNumber ?? ''}
Selected Seats:              ${seatsDisplay}
Number of Tickets:           ${ticketQuantity}
Total Amount:                \u20b9${totalAmount}

--- EVENT DETAILS ---
Movie:  Lokah: Chapter 1 – Chandra
Date:   18 September 2026
Time:   3:30 PM onwards
Venue:  Sri Ramaneni Kodandiramaiah Auditorium,
        opposite Law College, South Campus, Andhra University

Thank you for registering. We look forward to seeing you at Movie Mania! 🎉

— Girl Up Andhra University
    `.trim();

    // Send via Resend
    const resendResponse = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Girl Up Andhra University <onboarding@resend.dev>',
        to: [email],
        subject: 'Registration Confirmed - Girl Up AU Movie Mania',
        html: emailHtml,
        text: emailText,
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      console.error('Resend API error:', resendResponse.status, errorBody);
      return new Response(
        JSON.stringify({ error: `Email sending failed: ${resendResponse.status}`, detail: errorBody }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const resendData = await resendResponse.json();
    console.log('Email sent successfully:', resendData.id, 'to', email);

    return new Response(
      JSON.stringify({ success: true, emailId: resendData.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );

  } catch (err) {
    console.error('Edge function error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal error', detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
