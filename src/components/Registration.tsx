import Reveal from '@/components/Reveal';
import { eventData } from '@/data/eventData';
import {
  TicketX,
  MapPin,
  Clock,
  Calendar,
  AlertCircle,
  Instagram,
  ArrowRight,
} from 'lucide-react';
import { MandalaMotif, CornerFiligree } from './FestiveMotifs';

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section
      id="register"
      className="relative py-24 sm:py-32 section-padding overflow-hidden"
      style={{ backgroundColor: '#120727' }}
    >
      <div
        className="pointer-events-none absolute top-24 -left-10 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(60, 120, 255, 0.28) 0%, transparent 70%)',
          filter: 'blur(36px)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-10 -right-8 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 60, 160, 0.2) 0%, transparent 70%)',
          filter: 'blur(36px)',
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.06]">
        <MandalaMotif className="w-full h-full" />
      </div>
      {children}
    </section>
  );
}

export default function Registration() {
  return (
    <Shell>
      <div className="relative max-w-2xl mx-auto">
        <Reveal>
          {/* Header Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4 bg-red-950/70 border border-red-500/50 shadow-lg shadow-red-950/40">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-body font-bold text-[13px] sm:text-[14px] tracking-wider text-red-200 uppercase">
                REGISTRATIONS CLOSED
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#FFF8EF] mb-3 text-balance">
              Registration Update
            </h2>

            <p className="font-body text-[16px] sm:text-[17px] text-[#FFF8EF]/80 font-light max-w-md mx-auto">
              Event day update for VIBRANCE 2026 &mdash; Girl Up Andhra University
            </p>
          </div>

          {/* Prominent Registrations Closed Panel */}
          <div className="relative festive-panel rounded-3xl p-7 sm:p-11 text-center shadow-2xl border-2 border-red-500/40 bg-gradient-to-b from-[#200a28]/95 to-[#140822]/95 overflow-hidden">
            <CornerFiligree className="absolute top-3 left-3 w-10 h-10 opacity-30" />
            <CornerFiligree className="absolute bottom-3 right-3 w-10 h-10 opacity-30" style={{ transform: 'scale(-1)' }} />

            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-950/80 border border-red-500/40 mb-6 shadow-xl">
              <TicketX className="w-8 h-8 text-red-300" />
            </div>

            {/* Core Prominent Message */}
            <div className="space-y-4 mb-8">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white leading-snug">
                Online registrations for VIBRANCE 2026 are now closed.
              </h3>

              <div className="gold-rule mx-auto my-3 opacity-60" />

              <p className="font-body text-[16px] sm:text-[18px] text-[#FFF8EF]/95 font-light leading-relaxed max-w-xl mx-auto">
                Thank you for the overwhelming response! If you haven't registered yet, you may enquire about spot registration at the venue. Spot registrations are subject to availability and confirmation by the organising team.
              </p>
            </div>

            {/* Spot Registration Venue & Timing Info */}
            <div className="jewel-chip rounded-2xl p-5 mb-8 text-left space-y-3 border border-[#F3CA66]/30 bg-[#160a2c]/80">
              <p className="font-body text-[13px] font-bold uppercase tracking-wider text-[#F3CA66] mb-1 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#F3CA66]" />
                Spot Registration Enquiry Details
              </p>

              <div className="space-y-2.5 font-body text-[14px] sm:text-[15px] text-[#FFF8EF]/85">
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-[#F3CA66] shrink-0 mt-0.5" />
                  <span><strong>Date:</strong> {eventData.date}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#F3CA66] shrink-0 mt-0.5" />
                  <span><strong>Time:</strong> {eventData.time}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#F3CA66] shrink-0 mt-0.5" />
                  <span><strong>Venue:</strong> {eventData.venue} (Enquire directly at the entry desk)</span>
                </div>
              </div>

              <p className="text-[12px] sm:text-[13px] text-[#FFF8EF]/65 font-light pt-1 border-t border-[#F3CA66]/15">
                Note: Spot registration is not guaranteed and remains strictly subject to venue capacity and on-ground confirmation.
              </p>
            </div>

            {/* Live Updates & Social Links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href="https://www.instagram.com/girlup.au/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto text-[15px] px-7 py-3.5 shadow-lg shadow-[#FF6F1E]/20 inline-flex items-center justify-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                Follow @girlup.au on Instagram
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#about"
                className="btn-secondary w-full sm:w-auto text-[15px] px-6 py-3"
              >
                Explore Festival Highlights
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Shell>
  );
}
