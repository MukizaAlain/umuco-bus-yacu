
import React from 'react';
import { BusLayoutProps } from '../types';
import Seat from './Seat';

const BusLayout: React.FC<BusLayoutProps> = ({ busLayout, onSeatClick }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Driver section */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-10 bg-gray-700 rounded-t-lg flex items-center justify-center">
          <span className="text-xs text-white">Driver</span>
        </div>
      </div>
      
      {/* Bus seats */}
      {busLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          <div className="grid grid-cols-4 gap-4 relative">
            <div className="col-span-4 absolute -top-6 left-0 right-0 flex justify-between px-2">
              <span className="text-xs">A</span>
              <span className="text-xs">B</span>
              <span className="text-xs">C</span>
              <span className="text-xs">D</span>
            </div>
            
            {row.map((seat, seatIndex) => (
              <Seat
                key={seat.id}
                seat={seat}
                onClick={() => onSeatClick(rowIndex, seatIndex)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusLayout;
