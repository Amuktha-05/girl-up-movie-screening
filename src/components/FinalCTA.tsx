import Reveal from '@/components/Reveal';
import { ArrowRight, Sparkles } from 'lucide-react';
import { eventData } from '@/data/eventData';
import { MandalaMotif, OrnateDivider, FestiveLightDot, SparkleField } from './FestiveMotifs';

export default function FinalCTA() {
  return (
    <section
      className="relative py-28 sm:py-36 section-padding overflow-hidden text-center"
      style={{ backgroundColor: '#120727' }}
    >
      {/* Background Volumetric Lighting: Deep Burgundy / Dark Violet / Fiery Orange-Red */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[70%]"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 170, 50, 0.24) 0%, rgba(255, 50, 150, 0.16) 40%, rgba(50, 90, 220, 0.12) 62%, transparent 80%)',
          filter: 'blur(48px)',
        }}
      />

      {/* Rotating Background Mandala Texture */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] md:w-[620px] opacity-[0.2] animate-spin-slow">
        <MandalaMotif className="w-full h-full" />
      </div>

      <SparkleField />
      <FestiveLightDot tone="gold" className="absolute left-1/4 top-20 w-3 h-3" />
      <FestiveLightDot tone="magenta" className="absolute right-1/4 bottom-20 w-3 h-3" />
      <FestiveLightDot tone="azure" className="absolute right-[18%] top-24 w-2 h-2" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <Reveal>
          {/* Eyebrow */}
          <div className="jewel-chip inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-[#F3CA66]" />
            <span className="font-body font-semibold text-[14px] sm:text-[15px] tracking-[0.24em] text-[#F3CA66] uppercase">
              The Evening Awaits
            </span>
          </div>

          {/* Main Headline with vertical yellow-orange gradient highlight */}
          <h2
            className="font-display font-semibold text-[#FFF8EF] leading-tight mb-6 text-balance"
            style={{ fontSize: 'clamp(2.3rem, 6vw, 4.4rem)' }}
          >
            One Nation. Diverse Cultures.{' '}
            <span className="heading-highlight block sm:inline">One Vision for 2047.</span>
          </h2>

          <div className="w-full max-w-md mx-auto my-6">
            <OrnateDivider />
          </div>

          {/* Supporting Copy */}
          <p className="font-body text-[17px] sm:text-[19px] text-[#FFF8EF]/80 font-light leading-relaxed max-w-xl mx-auto mb-10">
            {eventData.heroSupport}
          </p>

          {/* Quick Schedule Pill in Royal Indigo with Bright Gold Border */}
          <div className="jewel-chip inline-flex flex-wrap justify-center gap-x-8 gap-y-2 px-7 py-3 rounded-2xl backdrop-blur-md mb-10">
            {[
              { label: 'Date', val: eventData.date },
              { label: 'Timing', val: eventData.time },
              { label: 'Venue', val: eventData.venue },
            ].map((f) => (
              <div key={f.label} className="text-center">
                <p className="font-body font-semibold text-[13px] text-[#F3CA66] uppercase tracking-wider mb-0.5">
                  {f.label}
                </p>
                <p className="font-body text-[15px] sm:text-[16px] text-[#FFFFFF]">
                  {f.val}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-[15px] sm:text-[16px] uppercase tracking-wider bg-red-950/70 border border-red-500/50 text-red-100 hover:bg-red-900/70 transition-all shadow-lg shadow-red-950/40 inline-flex items-center justify-center gap-2.5"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              Registrations Closed
              <ArrowRight className="w-4 h-4 opacity-70" />
            </a>
          </div>

          <p className="font-body text-[14px] sm:text-[15px] text-[#FFF8EF]/80 font-light mt-4 max-w-md mx-auto">
            Online registrations are now closed. Spot registrations at the venue are subject to availability.
          </p>

          <p className="font-body text-[14px] text-[#FFF8EF]/50 mt-8 tracking-widest uppercase">
            Girl Up Andhra University &mdash; VIBRANCE 2026
          </p>
        </Reveal>
      </div>
    </section>
  );
}
