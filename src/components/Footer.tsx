import { Instagram, Mail } from 'lucide-react';
import { footerData } from '@/data/eventData';

const navLinks = [
  { label: 'About the Festival', href: '#about' },
  { label: 'Festive Experiences', href: '#attractions' },
  { label: 'Schedule & Venue', href: '#details' },
  { label: 'Entry Pass Registration', href: '#register' },
  { label: 'FAQ', href: '#faq' },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-16 pb-12"
      style={{
        backgroundColor: '#120727',
      }}
    >
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-[3px]"
        style={{
          background: 'linear-gradient(90deg, #2456E0, #7A3CFF, #FF3D9A, #FF8A1E, #FFE36A, #FF8A1E, #FF3D9A, #7A3CFF, #2456E0)',
        }}
      />
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-20 opacity-80"
        style={{
          background: 'linear-gradient(to bottom, rgba(60, 100, 220, 0.18), transparent)',
        }}
      />

      <div className="section-padding max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12 border-b border-[#FFD034]/15">

          {/* ── Brand Column (5 cols) ── */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/images/girlup-logo.png"
                alt="Girl Up Andhra University"
                className="h-12 w-auto object-contain"
              />
              <span className="font-display text-[23px] font-bold tracking-wide text-[#FFFFFF]">
                Girl Up <span className="text-[#FFD034]">AU</span>
              </span>
            </div>

            <div>
              <p className="font-display text-[22px] font-semibold heading-highlight">
                {footerData.eventName}
              </p>
              <p className="font-display italic text-[16px] text-[#FFFFFF]/85 mb-3">
                {footerData.eventSubtitle}
              </p>
              <p className="font-body text-[15px] sm:text-[16px] text-[#FFFFFF]/70 font-light leading-relaxed max-w-sm">
                Empowering voices. Celebrating culture, diversity and India&apos;s youth under the Viksit Bharat 2047 theme.
              </p>
            </div>
          </div>

          {/* ── Navigation Links (4 cols) ── */}
          <div className="md:col-span-4 space-y-4">
            <p className="font-body font-semibold text-[15px] uppercase tracking-[0.18em] text-[#FFD034]">
              Explore
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-[16px] text-[#FFFFFF]/80 hover:text-[#FFD034] transition-colors duration-200 font-normal inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Connect Column (3 cols) with Yellow Icons & White Text ── */}
          <div className="md:col-span-3 space-y-4">
            <p className="font-body font-semibold text-[15px] uppercase tracking-[0.18em] text-[#FFD034]">
              Connect
            </p>
            <div className="space-y-4">
              <a
                href={footerData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                {/* Yellow Icon on dark indigo background */}
                <div className="w-10 h-10 rounded-xl bg-[#1a2d72] border border-[#FFE08A]/40 flex items-center justify-center text-[#FFE08A] group-hover:bg-[#FFE08A] group-hover:text-[#1A0C04] transition-all shadow-md shadow-[#FF4DB8]/20">
                  <Instagram className="w-4 h-4" />
                </div>
                <span className="font-body text-[15px] sm:text-[16px] text-[#FFFFFF]/85 group-hover:text-[#FFFFFF] transition-colors">
                  {footerData.instagramHandle}
                </span>
              </a>

              <a
                href={`mailto:${footerData.email}`}
                className="flex items-center gap-3 group"
              >
                {/* Yellow Icon on dark indigo background */}
                <div className="w-10 h-10 rounded-xl bg-[#1a2d72] border border-[#7EB6FF]/40 flex items-center justify-center text-[#9ECAFF] group-hover:bg-[#7EB6FF] group-hover:text-[#0C041B] transition-all shadow-md">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-body text-[15px] text-[#FFFFFF]/85 group-hover:text-[#FFFFFF] transition-colors break-all">
                  {footerData.email}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar: White text with subtle contrast ── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="font-body text-[14px] text-[#FFFFFF]/60 font-light">
            &copy; 2026 {footerData.organization}. All rights reserved.
          </p>
          <p className="font-body text-[14px] text-[#FFFFFF]/50 font-light">
            CHAMAK CHALLO &mdash; A Post-Diwali Celebration
          </p>
        </div>
      </div>
    </footer>
  );
}
