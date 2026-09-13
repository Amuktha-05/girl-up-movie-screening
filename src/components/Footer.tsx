import { footerData } from '@/data/eventData';
import { Instagram, Mail } from 'lucide-react';

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

        <div className="flex items-center justify-center gap-4">
          <a
            href={footerData.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-lavender-700/40 flex items-center justify-center hover:border-lavender-400 hover:bg-lavender-800/30 transition-all duration-300 rounded-lg group"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4 text-lavender-300/70 group-hover:text-lavender-200 transition-colors" />
          </a>
          <a
            href={`mailto:${footerData.email}`}
            className="w-10 h-10 border border-lavender-700/40 flex items-center justify-center hover:border-lavender-400 hover:bg-lavender-800/30 transition-all duration-300 rounded-lg group"
            aria-label="Email"
          >
            <Mail className="w-4 h-4 text-lavender-300/70 group-hover:text-lavender-200 transition-colors" />
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-lavender-800/20">
          <p className="text-xs text-cream-300/40">
            © 2026 {footerData.organization}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
