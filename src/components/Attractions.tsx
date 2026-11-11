import Reveal from '@/components/Reveal';
import { attractionsData } from '@/data/eventData';
import { CornerFiligree, FestiveLightDot, FestiveRibbon, MandalaMotif } from './FestiveMotifs';
import { Sparkles, Star } from 'lucide-react';

export default function Attractions() {
  const featuredDJ = attractionsData.find((a) => a.id === 'djnight');
  const featuredBazaar = attractionsData.find((a) => a.id === 'shopping');
  const standardAttractions = attractionsData.filter((a) => a.id !== 'djnight' && a.id !== 'shopping');

  return (
    <section
      id="attractions"
      className="relative py-24 sm:py-32 section-padding overflow-hidden"
      style={{ backgroundColor: '#120727' }}
    >
      {/* Background Atmosphere */}
      <FestiveRibbon />
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] max-w-4xl h-[55vh] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 50, 160, 0.22) 0%, rgba(90, 40, 180, 0.16) 42%, transparent 74%)',
          filter: 'blur(52px)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 170, 40, 0.16) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      {/* Faint mandala texture */}
      <div className="pointer-events-none absolute -left-20 top-20 w-[450px] h-[450px] opacity-[0.09]">
        <MandalaMotif className="w-full h-full" />
      </div>

      <FestiveLightDot tone="magenta" className="absolute left-10 top-20 w-3 h-3" />
      <FestiveLightDot tone="gold" className="absolute right-12 bottom-24 w-3 h-3" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <Reveal>
          <div className="mb-14 sm:mb-16">
            <span className="section-eyebrow block mb-3">Festive Experiences</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
              <div>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#FFF8EF] leading-tight">
                  Eight Reasons to <span className="heading-highlight italic">Chamak</span>
                </h2>
                <div className="gold-rule mt-4" />
              </div>
              <p className="font-body text-[17px] sm:text-[18px] text-[#FFF8EF]/80 font-light max-w-md leading-relaxed">
                From high-energy dance challenges to regional festive shopping, every corner has something designed to make you shine.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Two Featured Grand Anchor Cards (Dark Maroon Fills, Bright Gold Borders, White Text) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Card 1: DJ Night Grand Feature */}
          {featuredDJ && (
            <Reveal delay={80}>
              <div className="relative feature-card tone-magenta p-8 sm:p-10 h-full overflow-hidden group flex flex-col justify-between">
                <CornerFiligree className="absolute top-4 right-4 w-12 h-12 opacity-50 group-hover:opacity-85 transition-opacity" style={{ transform: 'scaleX(-1)' }} />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FF6F1E]/15 border border-[#FF6F1E]/40 text-[#FF6F1E] font-body text-[13px] font-semibold uppercase tracking-wider">
                      <Star className="w-3.5 h-3.5 fill-current" /> Main Stage Finale
                    </span>
                    <span className="font-display text-2xl text-[#F3CA66] font-semibold">08</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl sm:text-4xl">{featuredDJ.icon}</span>
                    <h3 className="font-display text-[24px] sm:text-[27px] font-semibold text-[#FFFFFF] group-hover:text-[#F3CA66] transition-colors">
                      {featuredDJ.title}
                    </h3>
                  </div>

                  <p className="font-body text-[17px] text-[#FFF8EF]/80 font-light leading-relaxed mb-6">
                    {featuredDJ.description} Non-stop Telugu, Bollywood and Punjabi tracks with live student performances to wrap up the night in pure festive high!
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F3CA66]/20 flex items-center gap-2 text-[#F3CA66] font-body text-[15px] font-medium">
                  <Sparkles className="w-4 h-4 text-[#FF6F1E]" />
                  <span>Grand dance floor &amp; open-air festival sound</span>
                </div>
              </div>
            </Reveal>
          )}

          {/* Card 2: Festive Bazaar Feature */}
          {featuredBazaar && (
            <Reveal delay={140}>
              <div className="relative feature-card tone-saffron p-8 sm:p-10 h-full overflow-hidden group flex flex-col justify-between">
                <CornerFiligree className="absolute top-4 right-4 w-12 h-12 opacity-50 group-hover:opacity-85 transition-opacity" style={{ transform: 'scaleX(-1)' }} />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F3CA66]/15 border border-[#F3CA66]/40 text-[#F3CA66] font-body text-[13px] font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" /> Cultural Marketplace
                    </span>
                    <span className="font-display text-2xl text-[#F3CA66] font-semibold">01</span>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl sm:text-4xl">{featuredBazaar.icon}</span>
                    <h3 className="font-display text-[24px] sm:text-[27px] font-semibold text-[#FFFFFF] group-hover:text-[#F3CA66] transition-colors">
                      {featuredBazaar.title}
                    </h3>
                  </div>

                  <p className="font-body text-[17px] text-[#FFF8EF]/80 font-light leading-relaxed mb-6">
                    {featuredBazaar.description} Explore traditional handcrafted jewellery, festive accessories, traditional treats, and vibrant artisanal student pop-ups.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F3CA66]/20 flex items-center gap-2 text-[#F3CA66] font-body text-[15px] font-medium">
                  <Star className="w-4 h-4 text-[#FF6F1E]" />
                  <span>Stalls &amp; festive student creators</span>
                </div>
              </div>
            </Reveal>
          )}
        </div>

        {/* ── 6 Supporting Experiences Grid (Feature Cards) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {standardAttractions.map((item, i) => (
            <Reveal key={item.id} delay={200 + i * 70}>
              <div className={`feature-card p-7 sm:p-8 h-full flex flex-col justify-between group ${['tone-azure', 'tone-violet', 'tone-peacock', 'tone-rose', 'tone-saffron', 'tone-magenta'][i % 6]}`}>
                <div>
                  {/* Card Header: Index & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="jewel-chip w-10 h-10 rounded-xl flex items-center justify-center text-xl">
                      {item.icon}
                    </span>
                    <span className="font-display text-[18px] text-[#F3CA66] font-semibold">
                      {String(i + 2).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-[21px] sm:text-[22px] font-semibold text-[#FFFFFF] group-hover:text-[#F3CA66] transition-colors mb-2.5">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body text-[16px] text-[#FFF8EF]/75 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Card bottom accent line */}
                <div className="mt-6 pt-4 border-t border-[#F3CA66]/15 flex items-center justify-between text-[#FFF8EF]/50 text-[14px]">
                  <span>CHAMAK CHALLO</span>
                  <span className="text-[#FF6F1E] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
