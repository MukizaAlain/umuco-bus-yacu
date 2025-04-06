
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight, CalendarClock, Bus, Wifi, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BusCardProps {
  bus: {
    id: number;
    operator: string;
    logo: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: string;
    seatsAvailable: number;
    features: {
      wifi: boolean;
      ac: boolean;
      usb: boolean;
    };
  };
}

export default function BusCard({ bus }: BusCardProps) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleSelectBus = () => {
    navigate(`/select-seat/${bus.id}`);
  };

  return (
    <Card className="border-gray-200 hover:border-rwanda-blue transition-colors">
      <CardContent className="p-0">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={bus.logo} 
                alt={bus.operator}
                className="h-10 w-10 object-contain rounded-full bg-gray-50 p-1"
              />
              <div>
                <h3 className="font-medium text-gray-900">{bus.operator}</h3>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Bus className="h-3 w-3" />
                  <span>Modern Coach</span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-rwanda-blue border-rwanda-blue">
              {bus.seatsAvailable} seats left
            </Badge>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 md:mb-0">
              <div className="text-center sm:text-left">
                <span className="text-sm text-gray-500">{bus.from}</span>
                <p className="text-lg font-bold">{bus.departureTime}</p>
              </div>
              
              <div className="flex items-center my-2 sm:my-0">
                <div className="h-px w-12 bg-gray-300"></div>
                <div className="flex flex-col items-center">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500">{bus.duration}</span>
                </div>
                <div className="h-px w-12 bg-gray-300"></div>
              </div>
              
              <div className="text-center sm:text-left">
                <span className="text-sm text-gray-500">{bus.to}</span>
                <p className="text-lg font-bold">{bus.arrivalTime}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between md:flex-col md:items-end">
              <div className="md:mb-2">
                <span className="text-sm text-gray-500">Price</span>
                <p className="text-lg font-bold text-rwanda-blue">{bus.price}</p>
              </div>
              <Button
                className="bg-rwanda-blue hover:bg-blue-800"
                onClick={handleSelectBus}
              >
                Select Seats
              </Button>
            </div>
          </div>
          
          {expanded && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2 mb-4">
                {bus.features.wifi && (
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Wifi className="h-3 w-3 mr-1" />
                    <span>Wi-Fi</span>
                  </Badge>
                )}
                {bus.features.ac && (
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <span className="font-bold mr-1">AC</span>
                    <span>Air Conditioning</span>
                  </Badge>
                )}
                {bus.features.usb && (
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Zap className="h-3 w-3 mr-1" />
                    <span>USB Charging</span>
                  </Badge>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <CalendarClock className="h-4 w-4 mr-1 text-rwanda-blue" />
                  <span>Estimated departure</span>
                </div>
                <div>
                  Boarding: 30 minutes before departure
                </div>
              </div>
            </div>
          )}
          
          <button
            type="button"
            className="mt-3 text-sm text-rwanda-blue flex items-center mx-auto hover:underline"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less' : 'Show more details'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
