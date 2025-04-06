import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, RotateCw, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const seatPricing = {
  standard: 'RWF 5,000',
  window: 'RWF 5,500',
  priority: 'RWF 6,000',
};

// Enum to represent seat statuses
enum SeatStatus {
  Available = 'available',
  Selected = 'selected',
  Booked = 'booked',
  Priority = 'priority',
  Window = 'window',
}

// Generate a mock bus layout
const generateBusLayout = () => {
  const rows = 10;
  const seatsPerRow = 4; // 2 on each side of the aisle
  const layout: Array<Array<{ id: string; status: SeatStatus }>> = [];

  for (let i = 1; i <= rows; i++) {
    const row: Array<{ id: string; status: SeatStatus }> = [];
    
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
      const rowIndex = parseInt(seatId.charAt(0)) - 1;
      const colChar = seatId.charAt(1);
      const isWindow = colChar === 'A' || colChar === 'D';
      const isPriority = rowIndex === 0;
      
      if (isPriority) {
        return total + 6000; // Priority seat price
      } else if (isWindow) {
        return total + 5500; // Window seat price
      } else {
        return total + 5000; // Standard seat price
      }
    }, 0);
  };
  
  const handleProceedToCheckout = () => {
    navigate('/checkout', { state: { selectedSeats, total: calculateTotal() } });
  };
  
  const getSeatColor = (status: SeatStatus) => {
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
                  onClick={() => {
                    setBusLayout(generateBusLayout());
                    setSelectedSeats([]);
                  }}
                >
                  <RotateCw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
              
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
              
              {/* Driver section */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-10 bg-gray-700 rounded-t-lg flex items-center justify-center">
                  <span className="text-xs text-white">Driver</span>
                </div>
              </div>
              
              {/* Bus seats */}
              <div className="grid grid-cols-1 gap-4">
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
                        <button
                          key={seat.id}
                          className={`w-10 h-10 rounded border ${getSeatColor(seat.status)} flex items-center justify-center transition-colors ${seat.status === SeatStatus.Booked ? 'cursor-not-allowed' : 'cursor-pointer hover:border-rwanda-blue'}`}
                          onClick={() => handleSeatClick(rowIndex, seatIndex)}
                          disabled={seat.status === SeatStatus.Booked}
                        >
                          <span className="text-xs font-medium">{seat.id}</span>
                        </button>
                      ))}
                      
                      {/* Add aisle between B and C */}
                      
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="border-gray-200 sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Your Selection</h3>
              
              {selectedSeats.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No seats selected yet</p>
                  <p className="text-sm mt-2">Please select seats to continue</p>
                </div>
              ) : (
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
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Payment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
