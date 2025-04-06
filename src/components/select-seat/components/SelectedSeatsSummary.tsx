
import React from 'react';
import { SelectedSeatsSummaryProps } from '../types';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const SelectedSeatsSummary: React.FC<SelectedSeatsSummaryProps> = ({ 
  selectedSeats, 
  calculateTotal,
  onProceedToCheckout 
}) => {
  if (selectedSeats.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No seats selected yet</p>
        <p className="text-sm mt-2">Please select seats to continue</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Selected Seats:</span>
          <div className="flex flex-wrap justify-end gap-1">
            {selectedSeats.map(seat => (
              <span 
                key={seat} 
                className="inline-flex items-center px-2 py-1 bg-blue-50 text-rwanda-blue text-xs rounded"
              >
                {seat}
              </span>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm">Seat Price:</span>
            <span className="text-sm">RWF {calculateTotal().toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Booking Fee:</span>
            <span className="text-sm">RWF 500</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t border-gray-100">
            <span>Total:</span>
            <span>RWF {(calculateTotal() + 500).toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full bg-rwanda-blue hover:bg-blue-800"
        onClick={onProceedToCheckout}
      >
        Proceed to Payment
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </>
  );
};

export default SelectedSeatsSummary;
