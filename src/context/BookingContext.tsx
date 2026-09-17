import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { ticketOptions, TICKET_PRICE, type TicketOption } from '@/data/pricingData';

export interface BookingSelection {
  ticketId: string;
  ticketQty: number;
}

interface BookingContextValue {
  selection: BookingSelection;
  setTicket: (id: string) => void;
  setTicketQty: (qty: number) => void;
  selectedTicket: TicketOption | undefined;
  ticketTotal: number;
  total: number;
  ticketList: TicketOption[];
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<BookingSelection>({
    ticketId: 'student',
    ticketQty: 1,
  });

  const setTicket = (id: string) => setSelection((s) => ({ ...s, ticketId: id }));
  const setTicketQty = (qty: number) =>
    setSelection((s) => ({ ...s, ticketQty: Math.max(1, Math.min(10, qty)) }));

  const selectedTicket = useMemo(
    () => ticketOptions.find((t) => t.id === selection.ticketId),
    [selection.ticketId],
  );

  const ticketTotal = useMemo(
    () => TICKET_PRICE * selection.ticketQty,
    [selection.ticketQty],
  );

  const total = ticketTotal;

  const value: BookingContextValue = {
    selection,
    setTicket,
    setTicketQty,
    selectedTicket,
    ticketTotal,
    total,
    ticketList: ticketOptions,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
