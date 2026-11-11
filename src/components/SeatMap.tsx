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

/** Generate all pass slot IDs for a section */
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
      setFetchError('Could not load pass allocation status. Please refresh.');
      console.error('Pass fetch error:', err);
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
        <p className="text-[14px] tracking-[0.2em] text-[#F3CA66] font-semibold uppercase mb-3 text-center">
          {label}
        </p>
        <div className="space-y-1.5">
          {rows.map((row, ri) => (
            <div key={ri} className="flex flex-nowrap justify-center gap-1.5">
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
                      'w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[11px] sm:text-[12px] font-semibold transition-all duration-150 border',
                      isBooked
                        ? 'bg-[#0E041A] border-[#1C0A33] text-[#FFF8EF]/20 cursor-not-allowed'
                        : isSelected
                        ? 'bg-gradient-to-b from-[#FFE9A0] to-[#FFB020] border-[#FFF0C2] text-[#2E1502] shadow-md shadow-[#FFB020]/50 scale-105'
                        : 'bg-[#14082B] border-[#F3CA66]/25 text-[#FFF8EF]/80 hover:border-[#F3CA66] hover:bg-[#1E0D44] hover:text-[#FFF8EF]',
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
      <div className="flex items-center justify-center py-16 text-[#FFF8EF]/70 text-[16px]">
        <span className="animate-pulse">Loading pass allocation…</span>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-center py-10">
        <p className="text-[16px] text-red-300 mb-3">{fetchError}</p>
        <button
          type="button"
          onClick={fetchSeats}
          className="text-[14px] text-[#F3CA66] hover:underline font-semibold"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Stage indicator for open-air venue */}
      <div className="mb-6 text-center">
        <div
          className="inline-block w-2/3 h-1.5 rounded-full mb-1.5"
          style={{ background: 'linear-gradient(90deg, transparent, #7EB6FF, #FFE36A, #FF4DB8, transparent)' }}
        />
        <p className="text-[13px] tracking-[0.25em] text-[#F3CA66] uppercase font-semibold">
          Main Stage &amp; Dance Floor
        </p>
      </div>

      {/* Mobile-only swipe hint */}
      <p className="md:hidden text-center text-[13px] text-[#F3CA66]/80 tracking-wide mb-3 select-none">
        Swipe to see Zone B →
      </p>

      {/* Two section columns */}
      <div className="overflow-x-auto pb-3">
        <div className="flex gap-4 sm:gap-8 justify-center min-w-max mx-auto">
          {renderSection(SECTION_A, 'Zone A')}
          {/* Aisle divider */}
          <div className="w-px bg-[#F3CA66]/25 self-stretch mx-1 shrink-0" />
          {renderSection(SECTION_B, 'Zone B')}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 flex-wrap pt-3 border-t border-[#F3CA66]/15">
        {[
          { cls: 'bg-[#14082B] border-[#F3CA66]/30', label: 'Available' },
          { cls: 'bg-[#F3CA66] border-[#FFE169]', label: 'Selected' },
          { cls: 'bg-[#0E041A] border-[#1C0A33]', label: 'Reserved' },
        ].map(({ cls, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-md border ${cls}`} />
            <span className="text-[14px] text-[#FFF8EF]/80 font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
