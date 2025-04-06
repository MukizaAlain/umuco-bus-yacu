
import { Seat, SeatStatus } from '../types';

// Generate a mock bus layout
export const generateBusLayout = (): Array<Array<Seat>> => {
  const rows = 10;
  const seatsPerRow = 4; // 2 on each side of the aisle
  const layout: Array<Array<Seat>> = [];

  for (let i = 1; i <= rows; i++) {
    const row: Array<Seat> = [];
    
    for (let j = 1; j <= seatsPerRow; j++) {
      let status = SeatStatus.Available;
      
      // Randomly mark some seats as booked (30% chance)
      if (Math.random() < 0.3) {
        status = SeatStatus.Booked;
      }
      
      // Mark window seats
      if (j === 1 || j === 4) {
        status = status === SeatStatus.Booked ? SeatStatus.Booked : SeatStatus.Window;
      }
      
      // Mark front row as priority
      if (i === 1 && status !== SeatStatus.Booked) {
        status = SeatStatus.Priority;
      }
      
      row.push({
        id: `${i}${String.fromCharCode(64 + j)}`, // 1A, 1B, etc.
        status,
      });
    }
    
    layout.push(row);
  }
  
  return layout;
};

export const getSeatColor = (status: SeatStatus): string => {
  switch (status) {
    case SeatStatus.Available:
      return 'bg-white border-gray-300';
    case SeatStatus.Selected:
      return 'bg-rwanda-blue text-white border-rwanda-blue';
    case SeatStatus.Booked:
      return 'bg-gray-200 border-gray-300 cursor-not-allowed';
    case SeatStatus.Priority:
      return 'bg-white border-rwanda-green';
    case SeatStatus.Window:
      return 'bg-white border-rwanda-yellow';
    default:
      return 'bg-white border-gray-300';
  }
};

export const calculateSeatPrice = (seatId: string): number => {
  const rowIndex = parseInt(seatId.charAt(0)) - 1;
  const colChar = seatId.charAt(1);
  const isWindow = colChar === 'A' || colChar === 'D';
  const isPriority = rowIndex === 0;
  
  if (isPriority) {
    return 6000; // Priority seat price
  } else if (isWindow) {
    return 5500; // Window seat price
  } else {
    return 5000; // Standard seat price
  }
};
