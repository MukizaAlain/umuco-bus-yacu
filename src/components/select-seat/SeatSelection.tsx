
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SeatStatus, SeatPriceMap } from './types';
import { generateBusLayout, calculateSeatPrice } from './utils/seatUtils';
import SeatLegend from './components/SeatLegend';
import BusLayout from './components/BusLayout';
import SelectedSeatsSummary from './components/SelectedSeatsSummary';

const seatPricing: SeatPriceMap = {
  standard: 'RWF 5,000',
  window: 'RWF 5,500',
  priority: 'RWF 6,000',
};

export default function SeatSelection() {
  const navigate = useNavigate();
  const [busLayout, setBusLayout] = useState(generateBusLayout());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  
  const handleSeatClick = (rowIndex: number, seatIndex: number) => {
    const seat = busLayout[rowIndex][seatIndex];
    
    if (seat.status === SeatStatus.Booked) {
      return; // Cannot select booked seats
    }
    
    const newLayout = [...busLayout];
    const seatId = seat.id;
    
    if (seat.status === SeatStatus.Selected) {
      // If already selected, unselect it
      newLayout[rowIndex][seatIndex].status = 
        seat.id.endsWith('A') || seat.id.endsWith('D') 
          ? SeatStatus.Window 
          : rowIndex === 0 
            ? SeatStatus.Priority 
            : SeatStatus.Available;
      
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      // Select the seat
      newLayout[rowIndex][seatIndex].status = SeatStatus.Selected;
      setSelectedSeats([...selectedSeats, seatId]);
    }
    
    setBusLayout(newLayout);
  };
  
  const calculateTotal = () => {
    return selectedSeats.reduce((total, seatId) => {
      return total + calculateSeatPrice(seatId);
    }, 0);
  };
  
  const handleProceedToCheckout = () => {
    navigate('/checkout', { state: { selectedSeats, total: calculateTotal() } });
  };
  
  const handleReset = () => {
    setBusLayout(generateBusLayout());
    setSelectedSeats([]);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Your Seats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Bus Layout</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center"
                  onClick={handleReset}
                >
                  <RotateCw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
              
              <SeatLegend seatPricing={seatPricing} />
              <BusLayout busLayout={busLayout} onSeatClick={handleSeatClick} />
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="border-gray-200 sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Your Selection</h3>
              
              <SelectedSeatsSummary 
                selectedSeats={selectedSeats}
                calculateTotal={calculateTotal}
                onProceedToCheckout={handleProceedToCheckout}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
