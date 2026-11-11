import Reveal from '@/components/Reveal';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { eventData } from '@/data/eventData';
import { CornerFiligree, FestiveLightDot, MandalaMotif } from './FestiveMotifs';

const details = [
  {
    icon: CalendarDays,
    label: 'Date',
    value: eventData.date,
    detail: 'Monday · Post-Diwali Celebration',
  },
  {
    icon: Clock,
    label: 'Timing',
    value: eventData.time,
    detail: 'Doors open 15 minutes prior to start',
  },
  {
    icon: MapPin,
    label: 'Venue',
    value: eventData.venue,
    detail: eventData.location,
  },
];

export default function EventDetails() {
  return (
    <section
      id="details"
      className="relative py-24 sm:py-32 section-padding overflow-hidden"
      style={{ backgroundColor: '#120727' }}
    >
      {/* Ambient Lighting & Mandala */}
      <div
        className="pointer-events-none absolute top-10 right-0 w-[28rem] h-[28rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(70, 140, 255, 0.26) 0%, transparent 68%)',
          filter: 'blur(42px)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-96 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.18) 0%, transparent 70%)',
          filter: 'blur(42px)',
        }}
      />
      <FestiveLightDot tone="azure" className="absolute right-16 top-24 w-2.5 h-2.5" />
      <FestiveLightDot tone="gold" className="absolute left-14 bottom-24 w-2 h-2" />
      <div className="pointer-events-none absolute -left-20 top-1/3 w-[380px] h-[380px] opacity-[0.08]">
        <MandalaMotif className="w-full h-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <Reveal>
          <div className="mb-14 sm:mb-16">
            <span className="section-eyebrow block mb-3">When &amp; Where</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
              <div>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#FFF8EF] leading-tight">
                  Event <span className="heading-highlight italic">Information</span>
                </h2>
                <div className="gold-rule mt-4" />
              </div>
              <p className="font-body text-[17px] sm:text-[18px] text-[#FFF8EF]/80 font-light max-w-md leading-relaxed">
                Join us at the open-air court for an unforgettable night of Bollywood beats, festive food, and cultural unity.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── 3 Essential Information Cards (Dark Maroon Fills, Bright Gold Borders, White Text) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {details.map((item, i) => (
            <Reveal key={item.label} delay={i * 120}>
              <div className={`relative feature-card p-8 sm:p-9 h-full flex flex-col justify-between overflow-hidden group ${['tone-azure', 'tone-saffron', 'tone-violet'][i % 3]}`}>
                <CornerFiligree className="absolute top-3 right-3 w-10 h-10 opacity-40 group-hover:opacity-80 transition-opacity" style={{ transform: 'scaleX(-1)' }} />

                <div>
                  {/* Icon & Label */}
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="jewel-chip w-12 h-12 rounded-xl flex items-center justify-center text-[#FFE08A] group-hover:text-[#FF8A3D] transition-colors">
                      <item.icon className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <span className="font-body font-semibold text-[15px] uppercase tracking-[0.2em] text-[#F3CA66]">
                      {item.label}
                    </span>
                  </div>

                  {/* Primary Value */}
                  <h3 className="font-display text-[25px] sm:text-[27px] font-semibold text-[#FFFFFF] mb-2 leading-snug">
                    {item.value}
                  </h3>

                  {/* Secondary Context */}
                  <p className="font-body text-[16px] text-[#FFF8EF]/75 font-light leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#F3CA66]/15 flex items-center justify-between text-[14px] text-[#F3CA66]">
                  <span>Confirmed Schedule</span>
                  <span>AU Campus</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Highlight Banner: Marigold Yellow & Creamy Gold with Dark Brown Text ── */}
        <Reveal delay={380}>
          <div className="highlight-banner p-6 sm:p-7 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-body font-bold text-[17px] text-[#2E1502]">
                  Organised by Girl Up Andhra University
                </p>
                <p className="font-body text-[15px] text-[#2E1502]/85 font-medium">
                  Open-air event at AU North Campus Basketball Court. Wear your best festive or Bollywood attire!
                </p>
              </div>
            </div>
            <a
              href="#register"
              className="px-7 py-3 rounded-xl bg-[#120727] hover:bg-[#1B0C3C] text-[#F3CA66] font-semibold text-[15px] whitespace-nowrap self-stretch sm:self-auto text-center transition-all duration-200 shadow-md"
            >
              Get Entry Pass
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
