import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'The Movie', href: '#movie' },
  { label: 'Details', href: '#details' },
  { label: 'Tickets', href: '#tickets' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-midnight-950/92 backdrop-blur-md border-b border-lavender-800/40 py-3 shadow-lg shadow-midnight-950/30'
          : 'py-5'
      }`}
    >
      <div className="section-padding flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2.5">
          <img
            src="/images/girlup-logo.png"
            alt="Girl Up Logo"
            className="h-8 sm:h-9 w-auto object-contain rounded-full"
          />
          <span className="font-display text-lg sm:text-xl text-cream-50 tracking-wide font-medium">
            Girl Up <span className="text-lavender-400">AU</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-cream-200/70 hover:text-cream-50 transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-lavender-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          {/* Outlined secondary CTA — clearly lavender */}
          <a
            href="#register"
            className="px-4 py-1.5 border border-lavender-500/50 text-lavender-300 text-sm font-medium hover:bg-lavender-400 hover:text-midnight-950 hover:border-lavender-400 transition-all duration-300 rounded-lg shadow-sm"
          >
            Register Now
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2 text-cream-100"
          aria-label="Menu"
        >
          <span className={`w-6 h-px bg-cream-50 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-px bg-cream-50 transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-px bg-cream-50 transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden section-padding mt-3 pb-5 flex flex-col gap-4 bg-midnight-950/98 border-t border-lavender-800/40 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-cream-200/80 hover:text-lavender-300 transition-colors font-medium py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#register"
            onClick={() => setOpen(false)}
            className="px-4 py-2.5 bg-lavender-400 text-midnight-950 text-center text-sm font-semibold rounded-lg shadow-sm mt-2"
          >
            Register Now
          </a>
        </div>
      )}
    </nav>
  );
}
