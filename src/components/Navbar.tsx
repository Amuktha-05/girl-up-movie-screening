import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experiences', href: '#attractions' },
  { label: 'Details', href: '#details' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 border-b border-[#F3CA66]/20 shadow-xl shadow-[#0C041B]/60'
          : 'py-6'
      }`}
      style={{
        backgroundColor: scrolled
          ? 'rgba(14, 18, 58, 0.9)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        boxShadow: scrolled ? '0 10px 30px -18px rgba(0, 0, 0, 0.8)' : 'none',
      }}
    >
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          opacity: scrolled ? 1 : 0.45,
          background: 'linear-gradient(90deg, transparent, #3D7EFF, #FFE36A, #FF4DB8, #FF8A1E, transparent)',
        }}
      />
      <div className="section-padding flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-3.5 group">
          <img
            src="/images/girlup-logo.png"
            alt="Girl Up Andhra University"
            className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display text-[21px] sm:text-[23px] font-bold tracking-wide leading-none text-[#FFF8EF]">
            Girl Up <span className="heading-highlight">AU</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[16px] font-medium tracking-wide text-[#FFF8EF]/80 hover:text-[#FFF8EF] relative group transition-colors duration-200"
            >
              {link.label}
              <span
                className="absolute -bottom-1.5 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                style={{ background: 'linear-gradient(90deg, #F3CA66, #FF6F1E)' }}
              />
            </a>
          ))}
          <a
            href="#register"
            className="btn-primary text-[15px] px-6 py-2.5 rounded-xl font-semibold"
          >
            Register Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-[#FFF8EF]/85 hover:text-[#F3CA66] transition-colors"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className="section-padding pt-4 pb-7 flex flex-col gap-1 border-t border-[#F3CA66]/15"
          style={{ backgroundColor: 'rgba(18, 7, 39, 0.98)', backdropFilter: 'blur(20px)' }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-medium py-3.5 border-b text-[17px] text-[#FFF8EF]/85 hover:text-[#F3CA66] transition-colors"
              style={{ borderColor: 'rgba(243, 202, 102, 0.12)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#register"
            onClick={() => setOpen(false)}
            className="btn-primary text-center text-[16px] mt-5 py-3.5"
          >
            Register Now
          </a>
        </div>
      </div>
    </nav>
  );
}
