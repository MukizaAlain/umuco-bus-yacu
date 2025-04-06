
import React from 'react';
import { Seat as SeatType, SeatProps } from '../types';
import { getSeatColor } from '../utils/seatUtils';
import { SeatStatus } from '../types';

const Seat: React.FC<SeatProps> = ({ seat, onClick }) => {
  return (
    <button
      className={`w-10 h-10 rounded border ${getSeatColor(seat.status)} flex items-center justify-center transition-colors ${
        seat.status === SeatStatus.Booked ? 'cursor-not-allowed' : 'cursor-pointer hover:border-rwanda-blue'
      }`}
      onClick={onClick}
      disabled={seat.status === SeatStatus.Booked}
    >
      <span className="text-xs font-medium">{seat.id}</span>
    </button>
  );
};

export default Seat;
