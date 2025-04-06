
import Layout from '@/components/layout/Layout';
import SeatSelection from '@/components/select-seat/SeatSelection';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, Bus, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SeatSelectionPage() {
  // This would normally be fetched based on the bus ID
  const busDetails = {
    id: 1,
    operator: 'Volcano Express',
    logo: 'https://via.placeholder.com/100/1E3A8A/FFFFFF?text=VE',
    from: 'Kigali',
    to: 'Butare',
    date: 'April 10, 2023',
    departureTime: '08:00 AM',
    arrivalTime: '10:30 AM',
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link to="/search" className="flex items-center text-rwanda-blue hover:underline mr-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to search
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Select Your Seat</h1>
          </div>
          
          <Card className="border-gray-200 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <img 
                    src={busDetails.logo} 
                    alt={busDetails.operator}
                    className="h-12 w-12 rounded-full bg-gray-50"
                  />
                  <div>
                    <h2 className="font-semibold text-lg">{busDetails.operator}</h2>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Bus className="h-4 w-4" />
                      <span>Express Coach</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-rwanda-blue mr-2" />
                    <span className="text-sm">{busDetails.date}</span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-rwanda-blue mr-1" />
                      <div className="text-sm">
                        <span className="block text-gray-500">From</span>
                        <span className="font-medium">{busDetails.from}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-rwanda-green mr-1" />
                      <div className="text-sm">
                        <span className="block text-gray-500">To</span>
                        <span className="font-medium">{busDetails.to}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-6">
                    <div className="text-sm">
                      <span className="block text-gray-500">Departure</span>
                      <span className="font-medium">{busDetails.departureTime}</span>
                    </div>
                    <div className="text-sm">
                      <span className="block text-gray-500">Arrival</span>
                      <span className="font-medium">{busDetails.arrivalTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <SeatSelection />
        </div>
      </div>
    </Layout>
  );
}
