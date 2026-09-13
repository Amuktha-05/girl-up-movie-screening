import Reveal from '@/components/Reveal';
import { eventData } from '@/data/eventData';
import { CalendarDays, Clock, MapPin, Navigation } from 'lucide-react';

const details = [
  { icon: CalendarDays, label: 'Date',     value: eventData.date     },
  { icon: Clock,       label: 'Time',     value: eventData.time     },
  { icon: MapPin,      label: 'Venue',    value: `${eventData.venue}` },
  { icon: Navigation,  label: 'Location', value: eventData.location },
];

const borderClasses = [
  'border-b sm:border-r border-lavender-700/35 lg:border-b-0',
  'border-b border-lavender-700/35 lg:border-b-0 lg:border-r',
  'border-b sm:border-b-0 sm:border-r border-lavender-700/35',
  '',
];

export default function EventDetails() {
  return (
    <section id="details" className="relative py-14 sm:py-20 section-padding overflow-hidden bg-gradient-to-b from-[#1b1229] via-[#2a173e] to-[#1c122b]">
      <div className="relative max-w-6xl mx-auto">
        <Reveal>
          <div className="mb-8">
            <span className="block text-xs tracking-[0.25em] text-lavender-400 font-medium mb-3 uppercase">
              Event Details
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-cream-50 text-balance">
              When &amp; Where the Magic Happens
            </h2>
          </div>
        </Reveal>

        {/* Structured information panel with rich plum background */}
        <Reveal delay={150}>
          <div className="border border-lavender-700/35 bg-midnight-800/80 rounded-xl overflow-hidden shadow-2xl shadow-midnight-950/70 backdrop-blur-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {details.map((detail, i) => (
                <div
                  key={detail.label}
                  className={`p-6 sm:p-7 ${borderClasses[i]} group hover:bg-lavender-900/15 transition-colors duration-300`}
                >
                  <detail.icon className="w-5 h-5 text-lavender-400 mb-4 group-hover:text-lavender-300 transition-colors" />
                  <p className="text-xs tracking-[0.2em] text-lavender-300/75 uppercase mb-1.5 font-medium">
                    {detail.label}
                  </p>
                  <p className="text-sm text-cream-100 font-normal leading-snug">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
