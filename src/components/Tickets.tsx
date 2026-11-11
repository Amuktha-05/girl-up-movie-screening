import Reveal from '@/components/Reveal';
import { Bell, ArrowRight, CheckCircle2, Ticket } from 'lucide-react';
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
              CHAMAK CHALLO is an open-air celebration welcoming Andhra University students, friends, and festive enthusiasts.
            </p>
          </div>
        </Reveal>

        {/* ── Entry Pass Feature Card (Royal Indigo Fill, Refined Bright Gold Border, White Text) ── */}
        <Reveal delay={120}>
          <div className="relative feature-card tone-saffron accent-gold p-8 sm:p-12 overflow-hidden shadow-2xl">
            <CornerFiligree className="absolute top-4 left-4 w-12 h-12 opacity-50" />
            <CornerFiligree className="absolute bottom-4 right-4 w-12 h-12 opacity-50" style={{ transform: 'scale(-1)' }} />

            <div className="text-center max-w-2xl mx-auto">
              {/* Badge */}
              <div className="jewel-chip inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6">
                <Ticket className="w-4 h-4 text-[#F3CA66]" />
                <span className="font-body font-semibold text-[14px] tracking-wider text-[#F3CA66] uppercase">
                  Official Entry Pass
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-display text-[28px] sm:text-[34px] font-semibold text-[#FFFFFF] mb-4">
                Registration Opening Soon
              </h3>
              <p className="font-body text-[17px] text-[#FFF8EF]/80 font-light mb-9 leading-relaxed max-w-lg mx-auto">
                Participation passes will be released online shortly. Complete your early interest registration below to secure priority access.
              </p>

              {/* Included Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
                {[
                  {
                    title: 'Full Festival Access',
                    desc: 'Festive Bazaar, carnival games, photo booths & Mehendi station.',
                    tone: 'border-[#7EB6FF]/40 bg-[#142454]/80',
                  },
                  {
                    title: 'Live DJ & Dance Night',
                    desc: 'Bollywood, Telugu & Punjabi beats on the open court.',
                    tone: 'border-[#FF4DB8]/40 bg-[#3a1448]/75',
                  },
                  {
                    title: 'Contests & Awards',
                    desc: 'Mr. & Ms. Chamak Challo, hook-step challenge & giveaways.',
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
                  { label: 'Date', val: '16 Nov 2026' },
                  { label: 'Timing', val: '4 – 7 PM' },
                  { label: 'Venue', val: 'AU North Campus' },
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
                  className="btn-primary w-full sm:w-auto"
                >
                  Enter Registration Form
                  <ArrowRight className="w-4 h-4" />
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
