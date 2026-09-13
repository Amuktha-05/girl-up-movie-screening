import Reveal from '@/components/Reveal';
import { aboutData } from '@/data/eventData';

export default function About() {
  return (
    <section id="about" className="relative py-14 sm:py-20 section-padding overflow-hidden bg-gradient-to-b from-[#181125] via-[#231435] to-[#1a1127]">
      <div className="relative max-w-4xl mx-auto">
        <Reveal>
          {/* Section heading */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light text-cream-50 mb-6 text-balance">
            {aboutData.heading}
          </h2>
          <p className="text-base sm:text-lg text-cream-200/75 leading-relaxed font-light max-w-2xl">
            {aboutData.body}
          </p>
        </Reveal>

        {/* Editorial feature list */}
        <div className="mt-10 border-t border-lavender-800/40">
          {aboutData.features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 120}>
              <div className="flex items-start gap-6 sm:gap-10 py-5 sm:py-6 border-b border-lavender-800/40 group transition-colors duration-300 hover:bg-lavender-900/10 px-2 rounded-lg">
                {/* Number indicator — clearly lavender */}
                <span className="font-display text-base text-lavender-400 font-semibold pt-0.5 w-6 shrink-0 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {/* Icon */}
                <div className="text-2xl shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                {/* Content */}
                <div>
                  <h3 className="font-display text-xl text-cream-50 mb-1.5 font-medium">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-cream-200/65 leading-relaxed font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
