import Reveal from '@/components/Reveal';
import { useBooking } from '@/context/BookingContext';
import { Minus, Plus } from 'lucide-react';
import { TICKET_PRICE, ORIGINAL_PRICE } from '@/data/pricingData';

const benefits = [
  { icon: '🎬', text: 'Movie screening of Lokah' },
  { icon: '🍿', text: 'FREE Popcorn' },
  { icon: '🥤', text: 'FREE Cool Drink' },
  { icon: '🎟️', text: `Early Bird Ticket at ₹${TICKET_PRICE}/-` },
  { icon: '✨', text: 'A fun movie evening with friends' },
];

export default function Tickets() {
  const { selection, setTicketQty, total } = useBooking();

  return (
    <section id="tickets" className="relative py-14 sm:py-20 section-padding overflow-hidden bg-gradient-to-b from-[#1C122C] via-[#29173E] to-[#1E132E]">
      {/* Diffuse ambient central plum lighting — soft and seamless */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[75vw] max-w-3xl h-[450px] rounded-full bg-lavender-700/10 blur-[140px]" />

      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-8">
            <span className="block text-xs tracking-[0.25em] text-lavender-400 font-medium mb-3 uppercase">
              Tickets
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-cream-50 mb-2.5 text-balance">
              Reserve Your Seat
            </h2>
            <p className="text-cream-200/65 text-sm max-w-lg">
              One ticket. One price. Snacks included — no hidden extras.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* ── Ticket card ─────────────────────────────────────── */}
          <Reveal>
            <div className="w-full text-left p-6 sm:p-8 rounded-xl border border-lavender-400 bg-lavender-900/35 ring-1 ring-lavender-400/40 shadow-2xl shadow-lavender-950/60 relative overflow-hidden">

              {/* Early Bird badge */}
              <div className="absolute top-0 left-0 px-4 py-1.5 bg-lavender-400 text-midnight-950 text-xs font-bold tracking-wider rounded-br-lg shadow-sm">
                🐣 EARLY BIRD OFFER
              </div>

              <div className="mt-7">
                <h3 className="font-display text-2xl text-cream-50 mb-1 font-medium">
                  Movie Night Ticket
                </h3>
                <p className="text-sm text-cream-200/65 mb-5">Open to all. Snacks included — no extra charge.</p>

                {/* Pricing: crossed-out original + new price */}
                <div className="flex items-end gap-3 mb-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-cream-300/50 tracking-wider uppercase mb-0.5">Was</span>
                    <span className="text-xl text-cream-300/50 line-through font-display">
                      ₹{ORIGINAL_PRICE}/-
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-lavender-400 tracking-wider uppercase mb-0.5 font-semibold">Now</span>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-lavender-400 font-display text-2xl font-light">₹</span>
                      <span className="text-5xl font-display text-cream-50 font-light leading-none">{TICKET_PRICE}</span>
                      <span className="text-lavender-300/70 text-base ml-1">/-</span>
                    </div>
                  </div>
                </div>

                {/* FREE snacks callout */}
                <div className="mb-5 px-4 py-3 rounded-lg bg-lavender-800/50 border border-lavender-600/40">
                  <p className="text-xs text-lavender-300/80 uppercase tracking-wider font-semibold mb-2">Includes</p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center gap-2 text-sm text-cream-100">
                      <span className="text-lavender-400 font-bold shrink-0">✓</span> Movie entry
                    </li>
                    <li className="flex items-center gap-2 text-sm text-cream-100">
                      <span className="text-lavender-400 font-bold shrink-0">✓</span> FREE Popcorn 🍿
                    </li>
                    <li className="flex items-center gap-2 text-sm text-cream-100">
                      <span className="text-lavender-400 font-bold shrink-0">✓</span> FREE Cool Drink 🥤
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Benefits list ────────────────────────────────────── */}
          <Reveal delay={150}>
            <div className="glass-card p-6 sm:p-7">
              <p className="text-xs tracking-[0.25em] text-lavender-400 font-medium mb-4 uppercase">What You Get</p>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b.text} className="flex items-start gap-3">
                    <span className="text-xl shrink-0">{b.icon}</span>
                    <span className="text-sm text-cream-100/90 leading-relaxed">{b.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* ── Quantity + Total summary ─────────────────────────── */}
        <Reveal>
          <div className="glass-card p-5 sm:p-7 max-w-2xl mt-8">
            <div className="flex items-center justify-between mb-5 pb-5 border-b border-lavender-700/35">
              <div>
                <p className="text-xs tracking-wider text-lavender-300/80 uppercase mb-1 font-medium">Ticket Quantity</p>
                <p className="text-sm text-cream-200/65">How many seats would you like?</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTicketQty(selection.ticketQty - 1)}
                  disabled={selection.ticketQty <= 1}
                  className="w-8 h-8 border border-lavender-700/50 flex items-center justify-center hover:bg-lavender-800/40 hover:border-lavender-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded-md"
                >
                  <Minus className="w-3.5 h-3.5 text-cream-100" />
                </button>
                <span className="text-cream-50 font-display text-2xl w-10 text-center font-medium">
                  {selection.ticketQty}
                </span>
                <button
                  onClick={() => setTicketQty(selection.ticketQty + 1)}
                  className="w-8 h-8 border border-lavender-700/50 flex items-center justify-center hover:bg-lavender-800/40 hover:border-lavender-400 transition-colors rounded-md"
                >
                  <Plus className="w-3.5 h-3.5 text-cream-100" />
                </button>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm text-cream-200/70">
                <span>{selection.ticketQty} × ₹{TICKET_PRICE} (includes FREE snacks)</span>
                <span className="text-cream-100">₹{total}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-lavender-700/35">
              <span className="font-display text-xl text-cream-50">TOTAL</span>
              <span className="font-display text-3xl text-lavender-200 font-medium">₹{total}</span>
            </div>

            <a
              href="#register"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-lavender-400 hover:bg-lavender-300 text-midnight-950 font-semibold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-lavender-950/50"
            >
              Continue to Registration
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
