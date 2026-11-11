import { useState } from 'react';
import Reveal from '@/components/Reveal';
import { faqData } from '@/data/eventData';
import { FestiveRibbon, MandalaMotif } from './FestiveMotifs';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-24 sm:py-32 section-padding overflow-hidden"
      style={{ backgroundColor: '#120727' }}
    >
      {/* Background Lighting & Depth */}
      <FestiveRibbon />
      <div
        className="pointer-events-none absolute top-16 left-0 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(60, 110, 230, 0.22) 0%, transparent 68%)',
          filter: 'blur(46px)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-10 right-0 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 77, 184, 0.14) 0%, transparent 70%)',
          filter: 'blur(46px)',
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.08]">
        <MandalaMotif className="w-full h-full" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <Reveal>
          <div className="mb-14 sm:mb-16">
            <span className="section-eyebrow block mb-3">Frequently Asked Questions</span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
              <div>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#FFF8EF] leading-tight">
                  Questions? <span className="heading-highlight italic">We&apos;ve Got Answers</span>
                </h2>
                <div className="gold-rule mt-4" />
              </div>
              <p className="font-body text-[17px] sm:text-[18px] text-[#FFF8EF]/80 font-light max-w-md leading-relaxed">
                Everything you need to know about the event schedule, dress code, and participation.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Accordion List (Royal Indigo Cards, Bright Gold Borders, White Text) ── */}
        <div className="space-y-4">
          {faqData.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 60}>
                <div
                  className={`rounded-2xl transition-all duration-300 border ${
                    isOpen
                      ? 'bg-gradient-to-br from-[#1a3278] to-[#1c1048] border-[#FFE08A]/55 shadow-xl shadow-[#3a1468]/40'
                      : 'bg-[#14183f]/85 border-[#7EB6FF]/25 hover:border-[#FFE08A]/45'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-5 p-6 sm:p-7 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-body font-semibold text-[17px] sm:text-[18px] transition-colors duration-200 leading-snug ${
                        isOpen ? 'text-[#FFFFFF]' : 'text-[#FFF8EF]/85 group-hover:text-[#FFFFFF]'
                      }`}
                    >
                      {item.question}
                    </span>
                    <div
                      className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'border-[#F3CA66] bg-[#F3CA66] text-[#0E041E]'
                          : 'border-[#F3CA66]/40 text-[#F3CA66] group-hover:border-[#F3CA66]'
                      }`}
                    >
                      <span className="font-medium text-lg leading-none select-none">
                        {isOpen ? '−' : '+'}
                      </span>
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-6 sm:px-7 pb-6 sm:pb-7 font-body text-[16px] sm:text-[17px] text-[#FFF8EF]/80 font-light leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Contact Nudge Box */}
        <Reveal delay={380}>
          <div className="festive-panel mt-12 p-7 sm:p-8 rounded-2xl text-center">
            <p className="font-body text-[16px] sm:text-[17px] text-[#FFF8EF]/85 font-light">
              Have another question not answered here? Reach out via{' '}
              <a
                href="https://www.instagram.com/girlup.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#F3CA66] hover:text-[#FFFFFF] transition-colors underline underline-offset-4"
              >
                Instagram (@girlup.au)
              </a>{' '}
              or email{' '}
              <a
                href="mailto:girlup.andhrauniversity@gmail.com"
                className="font-semibold text-[#F3CA66] hover:text-[#FFFFFF] transition-colors underline underline-offset-4"
              >
                girlup.andhrauniversity@gmail.com
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
