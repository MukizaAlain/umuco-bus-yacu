
import React from 'react';
import { SeatLegendProps } from '../types';

const SeatLegend: React.FC<SeatLegendProps> = ({ seatPricing }) => {
  return (
    <div className="mb-8">
      <div className="flex space-x-4 mb-6 justify-center">
        <div className="flex items-center">
          <div className="h-4 w-4 rounded border border-gray-300 bg-white mr-2"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 rounded border border-rwanda-blue bg-rwanda-blue mr-2"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="h-4 w-4 rounded border border-gray-300 bg-gray-200 mr-2"></div>
          <span className="text-sm">Booked</span>
        </div>
      </div>
      
      <div className="flex justify-center space-x-2 mb-2">
        <div className="h-4 w-4 rounded border border-rwanda-yellow bg-white mr-1"></div>
        <span className="text-sm mr-3">Window ({seatPricing.window})</span>
        
        <div className="h-4 w-4 rounded border border-rwanda-green bg-white mr-1"></div>
        <span className="text-sm">Priority ({seatPricing.priority})</span>
      </div>
    </div>
  );
};

export default SeatLegend;
