import { ArrowRight, CalendarDays, Clock, MapPin } from 'lucide-react';
import StarField from '@/components/StarField';
import { eventData } from '@/data/eventData';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#171023] via-[#28163b] to-[#181125]">
      {/* Broad, soft ambient cinema illumination — no visible shapes, just atmospheric plum/lavender light */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[85vw] max-w-4xl h-[500px] rounded-full bg-lavender-700/15 blur-[140px]" />

      {/* Atmospheric starfield — subtle, sparse cinematic particles */}
      <StarField count={28} />

      {/* Atmosphere image — subtle texture and cinema mood */}
      <div
        className="absolute inset-0 opacity-35 bg-cover bg-center mix-blend-screen pointer-events-none"
        style={{ backgroundImage: `url(${eventData.atmosphereImage})` }}
      />
      {/* Soft vignette for strong typographic contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-950/50 via-midnight-950/35 to-[#181125] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 section-padding pt-20 pb-10 max-w-5xl mx-auto text-center">
        {/* Eyebrow — refined pill with visible lavender tone */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-lavender-500/40 bg-midnight-900/70 backdrop-blur-sm rounded-full mb-8 animate-fade-up">
          <span className="text-xs tracking-[0.25em] text-lavender-300 font-normal uppercase">
            {eventData.eyebrow}
          </span>
        </div>

        {/* Title — editorial Cormorant Garamond */}
        <h1
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-cream-50 mb-5 animate-fade-up whitespace-nowrap"
          style={{ animationDelay: '0.1s' }}
        >
          {eventData.title}
        </h1>

        {/* Tagline with subtle lavender-cream nuance */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-lavender-200/90 font-light italic font-display mb-1.5 animate-fade-up"
          style={{ animationDelay: '0.2s' }}
        >
          {eventData.tagline}
        </p>
        <p
          className="text-sm text-cream-200/60 mb-8 animate-fade-up"
          style={{ animationDelay: '0.3s' }}
        >
          {eventData.taglineSub}
        </p>

        {/* Event meta — clean, icon-led with lavender accents */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-8 animate-fade-up"
          style={{ animationDelay: '0.4s' }}
        >
          <div className="flex items-center gap-2 text-cream-100 text-sm">
            <CalendarDays className="w-4 h-4 text-lavender-300" />
            {eventData.date}
          </div>
          <div className="hidden sm:block w-px h-4 bg-lavender-500/40" />
          <div className="flex items-center gap-2 text-cream-100 text-sm">
            <Clock className="w-4 h-4 text-lavender-300" />
            {eventData.time}
          </div>
          <div className="hidden sm:block w-px h-4 bg-lavender-500/40" />
          <div className="flex items-center gap-2 text-cream-100 text-sm">
            <MapPin className="w-4 h-4 text-lavender-300" />
            {eventData.venue}
          </div>
        </div>

        {/* Primary CTA — rich visible lavender button */}
        <div
          className="flex flex-col items-center gap-3.5 animate-fade-up"
          style={{ animationDelay: '0.5s' }}
        >
          <a
            href="#register"
            className="group inline-flex items-center gap-2.5 px-10 py-4 bg-lavender-400 hover:bg-lavender-300 text-midnight-950 font-semibold text-sm tracking-wider transition-all duration-300 rounded-lg shadow-lg shadow-lavender-950/40 hover:shadow-lavender-900/60 hover:-translate-y-0.5"
          >
            REGISTER NOW
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
          <p className="text-xs text-lavender-300/60 tracking-wider uppercase">
            {eventData.seats} · Register early to secure yours
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-xs text-lavender-300/40 tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-lavender-400/50 to-transparent" />
      </div>
    </section>
  );
}
