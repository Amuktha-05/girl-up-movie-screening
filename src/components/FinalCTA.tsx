import Reveal from '@/components/Reveal';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    // Richest purple atmosphere — broad diffuse plum/lavender ambient light, no geometric shapes
    <section className="relative py-16 sm:py-22 section-padding overflow-hidden bg-gradient-to-b from-[#1e132e] via-[#321a48] to-[#150f1f]">
      {/* Broad ambient cinema lighting — completely diffuse */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[90vw] max-w-4xl h-[450px] rounded-full bg-lavender-600/15 blur-[140px]" />

      <div className="relative max-w-3xl mx-auto text-center">
        <Reveal>
          {/* Lavender accent separator line */}
          <div className="w-12 h-0.5 bg-lavender-400/80 mx-auto mb-6" />
          
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-cream-50 mb-4 text-balance">
            Ready for a little <span className="text-lavender-300 italic font-normal">movie magic?</span>
          </h2>
          
          <p className="text-lg text-cream-200/70 mb-8 font-light">
            Seats are limited. Reserve yours before they're gone.
          </p>

          <a
            href="#register"
            className="group inline-flex items-center gap-2.5 px-10 py-4 bg-lavender-400 hover:bg-lavender-300 text-midnight-950 font-semibold text-sm tracking-wider transition-all duration-300 rounded-lg shadow-2xl shadow-lavender-950/60 hover:shadow-lavender-900/70 hover:-translate-y-0.5"
          >
            REGISTER NOW
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
