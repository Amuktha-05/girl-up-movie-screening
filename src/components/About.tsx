import Reveal from '@/components/Reveal';
import { CornerFiligree, FestiveRibbon, MandalaMotif } from './FestiveMotifs';
import { Sparkles, Compass, Mic2, Landmark, HeartHandshake, UtensilsCrossed, Camera } from 'lucide-react';

const pillars = [
  {
    icon: '🎶',
    title: 'Music & Performance',
    description: 'Singing, instrumental and creative performances showcasing India\'s rich and diverse artistic heritage.',
    tone: 'tone-azure',
  },
  {
    icon: '💃',
    title: 'Dance & Expression',
    description: 'Solo and group performances celebrating India\'s diverse dance traditions and contemporary styles.',
    tone: 'tone-saffron',
  },
  {
    icon: '🌍',
    title: 'Social Awareness',
    description: 'Interactive activities around women\'s empowerment, youth leadership, social inclusion and community engagement.',
    tone: 'tone-magenta',
  },
  {
    icon: '🇮🇳',
    title: 'Viksit Bharat @2047',
    description: 'Honouring India\'s journey towards 2047 — one nation, diverse cultures, one shared vision for the future.',
    tone: 'tone-peacock',
  },
];

const activities = [
  {
    icon: Mic2,
    emoji: '🎤',
    title: 'Open Mic – Voices of Change',
    description: 'A platform for students to express their ideas on leadership, equality, youth participation and nation-building.',
  },
  {
    icon: Landmark,
    emoji: '🇮🇳',
    title: 'Viksit Bharat Wall',
    description: 'An interactive space for students to share their ideas and aspirations for India\'s development by 2047.',
  },
  {
    icon: HeartHandshake,
    emoji: '✊',
    title: 'Thematic Awareness Stalls',
    description: 'Student-led activities highlighting women\'s empowerment, youth leadership, farmers\' contributions and social inclusion.',
  },
  {
    icon: UtensilsCrossed,
    emoji: '🎪',
    title: 'Food & Interactive Stalls',
    description: 'Student-led stalls encouraging creativity and community participation.',
  },
  {
    icon: Camera,
    emoji: '📸',
    title: 'Fun Photo Booth',
    description: 'A dedicated space for students to capture memories with friends.',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 section-padding overflow-hidden"
      style={{ backgroundColor: '#120727' }}
    >
      {/* Background Lighting & Depth */}
      <FestiveRibbon />
      <div
        className="pointer-events-none absolute top-1/4 -left-16 w-[28rem] h-[28rem] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(50, 120, 255, 0.24) 0%, transparent 68%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-8 right-0 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 150, 40, 0.2) 0%, transparent 70%)',
          filter: 'blur(42px)',
        }}
      />
      {/* Faint mandala texture */}
      <div className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-[0.08]">
        <MandalaMotif className="w-full h-full" />
      </div>

      <div className="relative max-w-6xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">

          {/* ── Left Column: Cultural Marquee Vignette ── */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative feature-card tone-violet accent-gold p-8 sm:p-10 overflow-hidden">
                {/* Decorative corner filigree */}
                <CornerFiligree className="absolute top-4 left-4 w-10 h-10 opacity-75" />
                <CornerFiligree className="absolute bottom-4 right-4 w-10 h-10 opacity-75" style={{ transform: 'scale(-1)' }} />

                {/* Tricolor Accent line on top inspired by Indian Flag */}
                <div className="absolute top-0 left-0 right-0 h-[2.5px] flex">
                  <div className="flex-1 bg-[#FF6F1E]" />
                  <div className="flex-1 bg-[#FFFFFF]" />
                  <div className="flex-1 bg-[#1A7A4C]" />
                </div>

                {/* Cultural Badge */}
                <div className="jewel-chip inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-[#F3CA66]" />
                  <span className="font-body font-semibold text-[13px] tracking-wider text-[#F3CA66] uppercase">
                    Viksit Bharat 2047
                  </span>
                </div>

                {/* Featured Quote */}
                <blockquote className="font-display italic text-[24px] sm:text-[28px] text-[#FFE873] leading-snug mb-6 font-normal">
                  "Where Culture Meets Creativity. Where Young Voices Inspire Change."
                </blockquote>

                <p className="font-body text-[16px] sm:text-[17px] text-[#FFF8EF]/80 font-light leading-relaxed mb-8">
                  Join us at Andhra University for an unforgettable celebration of India's cultural richness, youth expression and collective vision for Viksit Bharat @2047.
                </p>

                {/* Theme Highlights Box */}
                <div className="pt-6 border-t border-[#F3CA66]/20 flex items-center justify-between text-[#FFF8EF]/75">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#FF6F1E]" />
                    <span className="font-body text-[15px] font-medium text-[#FFF8EF]">Cultural Celebration</span>
                  </div>
                  <span className="font-body text-[14px] text-[#F3CA66] font-semibold tracking-wider uppercase">
                    AU North Campus
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Right Column: Narrative & 4 Cultural Pillars ── */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={100}>
              <div className="space-y-4">
                <span className="section-eyebrow block">About the Festival</span>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#FFF8EF] leading-tight">
                  Culture, <span className="heading-highlight font-italic italic">Unity</span> &amp; Festive Spirit
                </h2>
                <div className="gold-rule my-4" />
                <p className="font-body text-[17px] sm:text-[18px] text-[#FFF8EF]/85 font-light leading-relaxed">
                  VIBRANCE is a student cultural and social awareness programme organised by Girl Up Andhra University. Inspired by the vision of Viksit Bharat @2047, it brings together India's diverse traditions, artistic expression, music, dance and creative energy — a space where every culture, every voice and every idea finds its stage.
                </p>
              </div>
            </Reveal>

            {/* 4 Cultural Pillars in a 2x2 Feature Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={150 + i * 70}>
                  <div className={`feature-card p-5 sm:p-6 h-full flex flex-col justify-between group ${pillar.tone}`}>
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <span className="text-2xl" role="img" aria-label={pillar.title}>
                          {pillar.icon}
                        </span>
                        <h3 className="font-display text-[18px] sm:text-[19px] font-semibold text-[#FFFFFF] group-hover:text-[#F3CA66] transition-colors duration-200">
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="font-body text-[14px] sm:text-[15px] text-[#FFF8EF]/75 font-light leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* ── Compact Subsection: Under the Viksit Bharat Theme ── */}
            <Reveal delay={350}>
              <div className="highlight-banner p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[#2E1502]/15 border border-[#2E1502]/25 flex items-center justify-center text-xl">
                  🇮🇳
                </div>
                <div>
                  <h4 className="font-display text-[19px] font-bold text-[#2E1502] mb-1">
                    Under the Viksit Bharat Theme
                  </h4>
                  <p className="font-body text-[14px] sm:text-[15px] text-[#2E1502]/90 font-medium leading-normal">
                    "One Nation. Diverse Cultures. One Shared Vision for 2047 — uniting traditions, music, dance and university youth together."
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

        {/* ── Additional Activities within About the Festival ── */}
        <Reveal delay={400}>
          <div className="pt-8 border-t border-[#F3CA66]/15">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
              <div>
                <span className="section-eyebrow block mb-1">Interactive Features</span>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#FFF8EF]">
                  Festival Experiences &amp; <span className="heading-highlight italic">Activities</span>
                </h3>
              </div>
              <p className="font-body text-[14px] sm:text-[15px] text-[#FFF8EF]/70 font-light max-w-md">
                Explore interactive youth stalls, express your voice on stage, and capture lasting festival memories.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activities.map((act) => (
                <div
                  key={act.title}
                  className="p-5 rounded-xl border border-[#7EB6FF]/20 bg-[#14183f]/60 backdrop-blur-sm hover:border-[#FFE08A]/45 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-xl" role="img" aria-label={act.title}>{act.emoji}</span>
                      <h4 className="font-display text-[16px] sm:text-[17px] font-semibold text-white">
                        {act.title}
                      </h4>
                    </div>
                    <p className="font-body text-[13px] sm:text-[14px] text-[#FFF8EF]/75 font-light leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
