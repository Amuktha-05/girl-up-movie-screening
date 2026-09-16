import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface SeatStatus {
  seat_number: string;
  status: 'available' | 'booked';
}

interface SeatMapProps {
  selectedSeats: string[];
  onSeatToggle: (seatNumber: string) => void;
  maxSeats?: number;
  onMaxExceeded?: () => void;
  /** Expose refresh fn so parent can re-fetch after a conflict */
  onRefreshRef?: (fn: () => void) => void;
}

/** Generate all seat IDs for a section */
function generateSeats(prefix: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) =>
    `${prefix}${String(i + 1).padStart(2, '0')}`,
  );
}

const SECTION_A = generateSeats('A', 100);
const SECTION_B = generateSeats('B', 100);
const SEATS_PER_ROW = 10;

export default function SeatMap({
  selectedSeats,
  onSeatToggle,
  maxSeats = 4,
  onMaxExceeded,
  onRefreshRef,
}: SeatMapProps) {
  const [seatStatuses, setSeatStatuses] = useState<Record<string, 'available' | 'booked'>>({});
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchSeats = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const { data, error } = await supabase
        .from('seats')
        .select('seat_number, status');

      if (error) throw error;

      const map: Record<string, 'available' | 'booked'> = {};
      (data as SeatStatus[]).forEach((s) => {
        map[s.seat_number] = s.status;
      });
      setSeatStatuses(map);
    } catch (err) {
      setFetchError('Could not load seat availability. Please refresh.');
      console.error('Seat fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSeats();
    if (onRefreshRef) onRefreshRef(fetchSeats);
  }, [fetchSeats, onRefreshRef]);

  const handleClick = (seat: string) => {
    const status = seatStatuses[seat];
    if (status === 'booked') return;
    if (!selectedSeats.includes(seat) && selectedSeats.length >= maxSeats) {
      onMaxExceeded?.();
      return;
    }
    onSeatToggle(seat);
  };

  const renderSection = (seats: string[], label: string) => {
    const rows: string[][] = [];
    for (let i = 0; i < seats.length; i += SEATS_PER_ROW) {
      rows.push(seats.slice(i, i + SEATS_PER_ROW));
    }

    return (
      <div className="flex-none">
        <p className="text-xs tracking-[0.2em] text-lavender-400 font-medium uppercase mb-3 text-center">
          {label}
        </p>
        <div className="space-y-1.5">
          {rows.map((row, ri) => (
            <div key={ri} className="flex flex-nowrap justify-center gap-1">
              {row.map((seat) => {
                const isBooked = seatStatuses[seat] === 'booked';
                const isSelected = selectedSeats.includes(seat);
                return (
                  <button
                    key={seat}
                    type="button"
                    disabled={isBooked}
                    onClick={() => handleClick(seat)}
                    title={seat}
                    className={[
                      'w-7 h-7 sm:w-8 sm:h-8 rounded text-[9px] sm:text-[10px] font-medium transition-all duration-150 border',
                      isBooked
                        ? 'bg-midnight-900/60 border-lavender-800/30 text-lavender-700/40 cursor-not-allowed'
                        : isSelected
                        ? 'bg-lavender-400 border-lavender-300 text-midnight-950 shadow-md shadow-lavender-900/40 scale-105'
                        : 'bg-midnight-800/80 border-lavender-700/40 text-cream-200/70 hover:border-lavender-400 hover:bg-lavender-900/40 hover:text-cream-50',
                    ].join(' ')}
                  >
                    {seat.replace(/^[AB]0?/, '')}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-cream-200/60 text-sm">
        <span className="animate-pulse">Loading seat map…</span>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-center py-10">
        <p className="text-sm text-red-300 mb-3">{fetchError}</p>
        <button
          type="button"
          onClick={fetchSeats}
          className="text-xs text-lavender-300 hover:text-lavender-200 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Screen indicator */}
      <div className="mb-6 text-center">
        <div className="inline-block w-2/3 h-1.5 rounded-full bg-gradient-to-r from-lavender-700/30 via-lavender-400/60 to-lavender-700/30 mb-1" />
        <p className="text-[10px] tracking-[0.3em] text-lavender-400/60 uppercase">Screen</p>
      </div>

      {/* Mobile-only swipe hint — hidden on md+ (desktop) */}
      <p className="md:hidden text-center text-[11px] text-lavender-400/70 tracking-wide mb-2 select-none">
        Swipe to see Section B →
      </p>

      {/* Two section columns — scroll wrapper isolates horizontal scroll to the map only */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-4 sm:gap-8 justify-center min-w-max mx-auto">
          {renderSection(SECTION_A, 'Section A')}
          {/* Aisle divider */}
          <div className="w-px bg-lavender-800/40 self-stretch mx-1 shrink-0" />
          {renderSection(SECTION_B, 'Section B')}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-5 flex-wrap">
        {[
          { cls: 'bg-midnight-800/80 border-lavender-700/40', label: 'Available' },
          { cls: 'bg-lavender-400 border-lavender-300', label: 'Selected' },
          { cls: 'bg-midnight-900/60 border-lavender-800/30', label: 'Booked' },
        ].map(({ cls, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-5 h-5 rounded border ${cls}`} />
            <span className="text-xs text-cream-200/60">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
