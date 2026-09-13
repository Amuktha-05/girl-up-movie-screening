import { useState } from 'react';
import Reveal from '@/components/Reveal';
import { faqData } from '@/data/eventData';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-14 sm:py-20 section-padding overflow-hidden bg-gradient-to-b from-[#1d132d] via-[#1a1127] to-[#1e132e]">
      <div className="relative max-w-3xl mx-auto">
        <Reveal>
          {/* Section heading */}
          <h2 className="font-display text-4xl sm:text-5xl font-light text-cream-50 mb-8 text-balance">
            Questions? We've Got Answers
          </h2>
        </Reveal>

        {/* Accordion */}
        <div className="border-t border-lavender-700/35">
          {faqData.map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className={`border-b transition-colors duration-300 ${
                open === i ? 'border-lavender-500/60' : 'border-lavender-700/35'
              }`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-4 sm:py-5 text-left group"
                >
                  <span
                    className={`text-sm sm:text-base transition-colors duration-200 ${
                      open === i ? 'text-lavender-200 font-medium' : 'text-cream-200/75 group-hover:text-cream-50'
                    }`}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                      open === i ? 'rotate-180 text-lavender-400' : 'text-lavender-500/60 group-hover:text-lavender-400'
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${
                    open === i ? 'max-h-60' : 'max-h-0'
                  }`}
                >
                  <p className="pb-4 sm:pb-5 text-sm text-cream-200/65 leading-relaxed font-light">
                    {item.answer}
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
