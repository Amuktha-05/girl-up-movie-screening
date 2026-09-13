import Reveal from '@/components/Reveal';
import { movieData } from '@/data/eventData';
import { Clock, Film, Globe, Star } from 'lucide-react';

export default function Movie() {
  return (
    <section id="movie" className="relative py-14 sm:py-20 section-padding overflow-hidden bg-gradient-to-b from-[#180F26] via-[#251539] to-[#1B1229]">
      {/* Diffuse ambient plum light behind the screening area — no shapes */}
      <div className="pointer-events-none absolute -left-20 top-1/4 w-[500px] h-[500px] rounded-full bg-lavender-700/10 blur-[130px]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Poster — clean framed presentation */}
          <Reveal>
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div className="relative rounded-xl overflow-hidden border border-lavender-500/30 shadow-2xl shadow-midnight-950/80">
                <img
                  src={movieData.posterImage}
                  alt={movieData.title}
                  className="w-full h-auto aspect-[2/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/60 via-transparent to-transparent pointer-events-none" />
                {/* Badge */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 bg-lavender-400 text-midnight-950 text-xs font-semibold tracking-wider rounded-md shadow-md">
                  {movieData.badge}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Film info */}
          <Reveal delay={200}>
            <div className="lg:pt-2">
              {/* Event context eyebrow */}
              <span className="block text-xs tracking-[0.25em] text-lavender-400 font-medium mb-3 uppercase">
                The Screening
              </span>

              <h2 className="font-display text-4xl sm:text-5xl font-light text-cream-50 mb-3 text-balance">
                {movieData.title}
              </h2>

              {/* Lavender accent line */}
              <div className="w-12 h-0.5 bg-lavender-400/80 mb-5" />

              <p className="text-cream-200/75 leading-relaxed mb-6 text-base font-light">
                {movieData.description}
              </p>

              {/* Meta — inline, bordered grid with visible lavender accents */}
              <div className="grid grid-cols-2 gap-0 mb-6 border border-lavender-700/35 bg-midnight-800/60 rounded-xl overflow-hidden shadow-lg">
                {[
                  { Icon: Film,  label: 'Genre',    value: movieData.genre    },
                  { Icon: Clock, label: 'Duration', value: movieData.duration },
                  { Icon: Globe, label: 'Language', value: movieData.language },
                  { Icon: Star,  label: 'Rating',   value: movieData.rating   },
                ].map(({ Icon, label, value }, i) => (
                  <div
                    key={label}
                    className={`flex items-center gap-3.5 p-3.5 sm:p-4
                      ${i % 2 === 0 ? 'border-r border-lavender-700/35' : ''}
                      ${i < 2 ? 'border-b border-lavender-700/35' : ''}
                    `}
                  >
                    <Icon className="w-4 h-4 text-lavender-400 shrink-0" />
                    <div>
                      <p className="text-xs text-lavender-300/60 uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="text-sm text-cream-100 font-normal">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Why You'll Love It */}
              <div className="mb-6 border border-lavender-700/35 bg-midnight-800/50 rounded-xl p-4 sm:p-5">
                <p className="text-xs tracking-[0.2em] text-lavender-300/70 uppercase font-medium mb-3">
                  Why You'll Love It
                </p>
                <ul className="space-y-2">
                  {movieData.whyWatch.map(({ icon, text }) => (
                    <li key={text} className="flex items-start gap-3 text-sm text-cream-100/85">
                      <span className="shrink-0 text-base leading-snug">{icon}</span>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#tickets"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-lavender-400/50 text-lavender-300 hover:text-midnight-950 hover:bg-lavender-400 text-sm font-medium transition-all duration-300 rounded-lg shadow-sm"
              >
                View Tickets &amp; Pricing
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
