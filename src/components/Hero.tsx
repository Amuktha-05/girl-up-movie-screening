import { ArrowRight, Sparkles } from 'lucide-react';
import { eventData } from '@/data/eventData';
import { MandalaMotif, OrnateDivider, CornerFiligree, FestiveLightDot, SparkleField } from './FestiveMotifs';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#120727' }}
    >
      {/* ── Layered Atmospheric Background ── */}

      {/* Layer 1: Royal blue vignette over the night-blue base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 120% 90% at 50% 12%, #1d3d8c 0%, #1a1860 36%, #160a38 62%, #120727 82%, #0C041B 100%)',
        }}
      />

      {/* Electric blue wash, left */}
      <div
        className="pointer-events-none absolute -left-16 top-16 w-[46vw] max-w-xl h-[50vh] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(60, 130, 255, 0.32) 0%, rgba(40, 80, 200, 0.08) 50%, transparent 74%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Magenta wash, right */}
      <div
        className="pointer-events-none absolute -right-10 top-24 w-[42vw] max-w-lg h-[46vh] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 60, 170, 0.26) 0%, rgba(140, 40, 180, 0.08) 52%, transparent 74%)',
          filter: 'blur(46px)',
        }}
      />

      {/* Saffron centre light */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[70vw] max-w-3xl h-[45vh] animate-pulse-warm"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(255, 170, 40, 0.28) 0%, rgba(240, 76, 30, 0.1) 48%, transparent 78%)',
          filter: 'blur(48px)',
        }}
      />

      {/* Faint gold mandala texture — centered behind heading */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] md:w-[680px] opacity-[0.22] animate-spin-slow">
        <MandalaMotif className="w-full h-full" />
      </div>

      <SparkleField />

      {/* Ambient festive light accents */}
      <FestiveLightDot tone="gold" className="absolute left-8 sm:left-24 top-28 sm:top-36 w-2.5 h-2.5" />
      <FestiveLightDot tone="magenta" className="absolute right-8 sm:right-24 top-28 sm:top-36 w-2.5 h-2.5" />
      <FestiveLightDot tone="azure" className="absolute left-12 sm:left-32 bottom-28 w-2 h-2" style={{ opacity: 0.8 }} />
      <FestiveLightDot tone="saffron" className="absolute right-12 sm:right-32 bottom-28 w-2 h-2" style={{ opacity: 0.8 }} />

      {/* Ornamental Corner Filigree */}
      <CornerFiligree className="absolute top-12 left-6 sm:top-16 sm:left-12 w-11 sm:w-16 h-11 sm:h-16" />
      <CornerFiligree className="absolute top-12 right-6 sm:top-16 sm:right-12 w-11 sm:w-16 h-11 sm:h-16" style={{ transform: 'scaleX(-1)' }} />
      <CornerFiligree className="absolute bottom-12 left-6 sm:bottom-16 sm:left-12 w-11 sm:w-16 h-11 sm:h-16" style={{ transform: 'scaleY(-1)' }} />
      <CornerFiligree className="absolute bottom-12 right-6 sm:bottom-16 sm:right-12 w-11 sm:w-16 h-11 sm:h-16" style={{ transform: 'scale(-1)' }} />

      {/* ── Main Content ── */}
      <div className="relative z-10 section-padding pt-32 pb-20 w-full max-w-5xl mx-auto text-center flex flex-col items-center">

        {/* Organiser Eyebrow Banner */}
        <div className="jewel-chip inline-flex items-center gap-2.5 px-5 py-2 rounded-full backdrop-blur-sm mb-8 animate-fade-up">
          <Sparkles className="w-4 h-4 text-[#F3CA66]" />
          <span className="font-body font-semibold text-[14px] sm:text-[15px] tracking-[0.24em] text-[#F3CA66] uppercase">
            {eventData.eyebrow}
          </span>
        </div>

        {/* ── EVENT NAME: CHAMAK CHALLO ── */}
        <div className="space-y-0 mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h1
            className="font-display font-light text-[#FFF8EF] tracking-tight block"
            style={{
              fontSize: 'clamp(3.6rem, 11vw, 8.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              textShadow: '0 0 42px rgba(110, 170, 255, 0.45), 0 0 18px rgba(255, 220, 150, 0.2)',
            }}
          >
            CHAMAK
          </h1>
          {/* Vertical bright-yellow-to-deep-orange gradient highlight */}
          <h1
            className="font-display font-semibold tracking-tight heading-highlight block"
            style={{
              fontSize: 'clamp(3.6rem, 11vw, 8.5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.01em',
              filter: 'drop-shadow(0 6px 28px rgba(240, 76, 30, 0.4))',
            }}
          >
            CHALLO
          </h1>
        </div>

        {/* Ornate Divider with Subtitle */}
        <div className="w-full max-w-2xl my-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <OrnateDivider subtitle="A Post-Diwali Celebration of Culture, Unity & Viksit Bharat" />
        </div>

        {/* Tagline */}
        <p
          className="font-body font-medium text-[16px] sm:text-[18px] text-[#FFF8EF]/85 tracking-[0.14em] uppercase my-6 max-w-xl leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          {eventData.tagline}
        </p>

        {/* Event Facts Strip (Date, Time, Venue) */}
        <div
          className="jewel-chip inline-flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 px-6 sm:px-8 py-3.5 rounded-2xl backdrop-blur-md mb-10 animate-fade-up"
          style={{ animationDelay: '0.38s' }}
        >
          {[
            { label: 'Date', value: eventData.date },
            { label: 'Time', value: eventData.time },
            { label: 'Venue', value: eventData.venue },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-2.5">
              {i > 0 && (
                <span className="text-[#F3CA66]/40 text-xs hidden sm:inline">•</span>
              )}
              <span className="font-body font-semibold text-[14px] text-[#F3CA66] uppercase tracking-wider">
                {item.label}:
              </span>
              <span className="font-body text-[15px] sm:text-[16px] text-[#FFF8EF] font-normal">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Action CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up w-full sm:w-auto"
          style={{ animationDelay: '0.46s' }}
        >
          <a href="#register" className="btn-primary w-full sm:w-auto group">
            Register Now
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a href="#about" className="btn-secondary w-full sm:w-auto">
            Explore the Festival
          </a>
        </div>

        {/* Refined Scroll Nudge */}
        <div
          className="mt-16 flex flex-col items-center gap-2.5 animate-fade-up opacity-65 hover:opacity-100 transition-opacity"
          style={{ animationDelay: '0.55s' }}
        >
          <span className="font-body text-[13px] tracking-[0.25em] text-[#F3CA66] uppercase font-medium">
            Scroll to Explore
          </span>
          <div
            className="w-[1.5px] h-8"
            style={{
              background: 'linear-gradient(to bottom, #F3CA66 0%, transparent 100%)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
