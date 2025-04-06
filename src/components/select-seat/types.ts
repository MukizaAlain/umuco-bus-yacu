
// Enum to represent seat statuses
export enum SeatStatus {
  Available = 'available',
  Selected = 'selected',
  Booked = 'booked',
  Priority = 'priority',
  Window = 'window',
}

export interface Seat {
  id: string;
  status: SeatStatus;
}

export interface SeatPriceMap {
  [key: string]: string;
}

export interface BusLayoutProps {
  busLayout: Array<Array<Seat>>;
  onSeatClick: (rowIndex: number, seatIndex: number) => void;
}

export interface SeatProps {
  seat: Seat;
  onClick: () => void;
}

export interface SelectedSeatsSummaryProps {
  selectedSeats: string[];
  calculateTotal: () => number;
  onProceedToCheckout: () => void;
}

export interface SeatLegendProps {
  seatPricing: SeatPriceMap;
}
