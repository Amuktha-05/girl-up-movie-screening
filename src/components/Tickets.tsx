import Reveal from '@/components/Reveal';
import { eventData } from '@/data/eventData';
import { Bell, ArrowRight, CheckCircle2, Ticket, Sparkles } from 'lucide-react';
import { CornerFiligree, MandalaMotif } from './FestiveMotifs';

export default function Tickets() {
  return (
    <section
      id="tickets"
      className="relative py-24 sm:py-32 section-padding overflow-hidden"
      style={{ backgroundColor: '#120727' }}
    >
      {/* Ambient Lighting & Depth */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-3xl h-[60vh] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 196, 70, 0.2) 0%, rgba(255, 70, 150, 0.12) 42%, transparent 76%)',
          filter: 'blur(50px)',
        }}
      />
      <div className="pointer-events-none absolute -right-20 top-20 w-[420px] h-[420px] opacity-[0.08]">
        <MandalaMotif className="w-full h-full" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Section Header */}
        <Reveal>
          <div className="text-center mb-14 sm:mb-16">
            <span className="section-eyebrow block mb-3">Participation &amp; Entry</span>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#FFF8EF] leading-tight">
              Secure Your <span className="heading-highlight italic">Entry Pass</span>
            </h2>
            <div className="gold-rule mx-auto my-4" />
            <p className="font-body text-[17px] sm:text-[18px] text-[#FFF8EF]/80 font-light max-w-xl mx-auto leading-relaxed">
              VIBRANCE is an open-air youth celebration welcoming Andhra University students, friends, and cultural enthusiasts.
            </p>
          </div>
        </Reveal>

        {/* ── Entry Pass Feature Card (Royal Indigo Fill, Refined Bright Gold Border, White Text) ── */}
        <Reveal delay={120}>
          <div className="relative feature-card tone-saffron accent-gold p-8 sm:p-12 overflow-hidden shadow-2xl">
            <CornerFiligree className="absolute top-4 left-4 w-12 h-12 opacity-50" />
            <CornerFiligree className="absolute bottom-4 right-4 w-12 h-12 opacity-50" style={{ transform: 'scale(-1)' }} />

            <div className="text-center max-w-2xl mx-auto">
              {/* Badges: Closed + Entry Pass */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/70 border border-red-500/50 shadow-md shadow-red-950/40">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-body font-bold text-[12px] sm:text-[13px] tracking-wider text-red-200 uppercase">
                    REGISTRATIONS CLOSED
                  </span>
                </div>
                <div className="jewel-chip inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full">
                  <Ticket className="w-3.5 h-3.5 text-[#F3CA66]" />
                  <span className="font-body font-semibold text-[13px] tracking-wider text-[#F3CA66] uppercase">
                    Official Entry Pass
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <h3 className="font-display text-[26px] sm:text-[34px] font-semibold text-[#FFFFFF] mb-4 leading-tight text-balance">
                A Celebration This Special. An Entry This Affordable.
              </h3>

              {/* Price Callout */}
              <div className="jewel-chip inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-6 sm:px-8 py-3.5 rounded-2xl mb-4 border border-[#F3CA66]/40 bg-[#1e0e38]/90 shadow-xl shadow-[#F3CA66]/15">
                <span className="font-body text-[13px] sm:text-[14px] text-[#F3CA66] font-semibold uppercase tracking-widest">
                  Individual Entry Pass
                </span>
                <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-[#F3CA66]/50" />
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-[#FFFFFF]">
                  JUST <span className="text-[#F3CA66]">₹120</span>
                </span>
              </div>

              {/* Registrations Closed Notice */}
              <div className="p-5 rounded-2xl bg-red-950/60 border border-red-500/40 text-center max-w-xl mx-auto my-5 shadow-lg">
                <p className="font-display text-[18px] sm:text-[20px] font-semibold text-red-100 mb-2">
                  Online registrations for VIBRANCE 2026 are now closed.
                </p>
                <p className="font-body text-[14px] sm:text-[15px] text-[#FFF8EF]/85 font-light leading-relaxed">
                  Thank you for the overwhelming response! If you haven't registered yet, you may enquire about spot registration at the venue. Spot registrations are subject to availability and confirmation by the organising team.
                </p>
              </div>

              {/* Included Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
                {[
                  {
                    title: 'Full Festival Access',
                    desc: 'Dance performances, cultural acts, open mic & creative stalls.',
                    tone: 'border-[#7EB6FF]/40 bg-[#142454]/80',
                  },
                  {
                    title: 'Live Music & Dance',
                    desc: 'Classical, folk, contemporary & youth performances on stage.',
                    tone: 'border-[#FF4DB8]/40 bg-[#3a1448]/75',
                  },
                  {
                    title: 'Interactive Experiences',
                    desc: 'Viksit Bharat Wall, thematic awareness stalls & Fun Photo Booth.',
                    tone: 'border-[#FFB020]/45 bg-[#3a2410]/80',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className={`p-5 rounded-xl border backdrop-blur-sm ${item.tone}`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#F3CA66] mb-2.5" />
                    <h4 className="font-display text-[18px] font-semibold text-[#FFFFFF] mb-1">
                      {item.title}
                    </h4>
                    <p className="font-body text-[15px] text-[#FFF8EF]/75 font-light leading-snug">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Event Timing Bar */}
              <div className="jewel-chip grid grid-cols-3 gap-0 rounded-xl mb-10 divide-x divide-[#F3CA66]/25">
                {[
                  { label: 'Date', val: eventData.date },
                  { label: 'Timing', val: eventData.time },
                  { label: 'Venue', val: eventData.venue },
                ].map((f) => (
                  <div key={f.label} className="py-4 px-2 text-center">
                    <p className="font-body font-semibold text-[14px] text-[#F3CA66] uppercase tracking-wider mb-0.5">
                      {f.label}
                    </p>
                    <p className="font-display text-[17px] sm:text-[19px] font-semibold text-[#FFFFFF]">
                      {f.val}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#register"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-[14px] sm:text-[15px] uppercase tracking-wider bg-red-950/70 border border-red-500/50 text-red-100 hover:bg-red-900/70 transition-all shadow-lg shadow-red-950/40 inline-flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Registrations Closed — Spot Enquiries
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </a>
                <a
                  href="https://www.instagram.com/girlup.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full sm:w-auto"
                >
                  <Bell className="w-4 h-4 text-[#F3CA66]" />
                  Follow @girlup.au
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
