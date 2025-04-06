
import React from 'react';
import { Seat as SeatType, SeatProps } from '../types';
import { getSeatColor } from '../utils/seatUtils';
import { SeatStatus } from '../types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Seat: React.FC<SeatProps> = ({ seat, onClick }) => {
  const seatStatusText = () => {
    switch (seat.status) {
      case SeatStatus.Available:
        return 'Available';
      case SeatStatus.Selected:
        return 'Selected';
      case SeatStatus.Booked:
        return 'Booked';
      default:
        return '';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={`w-10 h-10 rounded border ${getSeatColor(seat.status)} flex items-center justify-center transition-colors ${
              seat.status === SeatStatus.Booked ? 'cursor-not-allowed' : 'cursor-pointer hover:border-rwanda-blue'
            }`}
            onClick={onClick}
            disabled={seat.status === SeatStatus.Booked}
            aria-label={`Seat ${seat.id} - ${seatStatusText()}`}
          >
            <span className="text-xs font-medium">{seat.id}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Seat {seat.id} - {seatStatusText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Seat;
