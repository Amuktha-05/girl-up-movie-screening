import { footerData } from '@/data/eventData';

export default function Footer() {
  return (
    // Clean section returning to deep purple-black base
    <footer className="relative py-10 sm:py-12 section-padding border-t border-lavender-800/40 overflow-hidden bg-[#120D18]">
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-2.5">
          <span className="font-display text-xl text-cream-50 tracking-wide font-normal">
            {footerData.organization}
          </span>
        </div>

        <p className="font-display text-base italic text-lavender-300/60 mb-6">
          {footerData.tagline}
        </p>

        <div className="mt-6 pt-6 border-t border-lavender-800/20">
          <p className="text-xs text-cream-300/40">
            © 2026 {footerData.organization}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
