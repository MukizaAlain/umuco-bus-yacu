
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import SearchFilter from '@/components/search/SearchFilter';
import BusCard from '@/components/search/BusCard';
import { Button } from '@/components/ui/button';

// Mock data for buses - would come from API in real app
const MOCK_BUSES = [
  {
    id: 1,
    operator: 'Volcano Express',
    logo: 'https://via.placeholder.com/100/1E3A8A/FFFFFF?text=VE',
    from: 'Kigali',
    to: 'Butare',
    departureTime: '08:00 AM',
    arrivalTime: '10:30 AM',
    duration: '2h 30m',
    price: 'RWF 5,000',
    seatsAvailable: 12,
    features: {
      wifi: true,
      ac: true,
      usb: true,
    },
  },
  {
    id: 2,
    operator: 'Horizon Coach',
    logo: 'https://via.placeholder.com/100/047857/FFFFFF?text=HC',
    from: 'Kigali',
    to: 'Butare',
    departureTime: '09:30 AM',
    arrivalTime: '12:00 PM',
    duration: '2h 30m',
    price: 'RWF 5,500',
    seatsAvailable: 8,
    features: {
      wifi: true,
      ac: true,
      usb: false,
    },
  },
  {
    id: 3,
    operator: 'Rwanda Tours',
    logo: 'https://via.placeholder.com/100/FCD34D/FFFFFF?text=RT',
    from: 'Kigali',
    to: 'Butare',
    departureTime: '11:00 AM',
    arrivalTime: '01:30 PM',
    duration: '2h 30m',
    price: 'RWF 4,800',
    seatsAvailable: 5,
    features: {
      wifi: false,
      ac: true,
      usb: true,
    },
  },
  {
    id: 4,
    operator: 'Volcano Express',
    logo: 'https://via.placeholder.com/100/1E3A8A/FFFFFF?text=VE',
    from: 'Kigali',
    to: 'Butare',
    departureTime: '02:00 PM',
    arrivalTime: '04:30 PM',
    duration: '2h 30m',
    price: 'RWF 5,000',
    seatsAvailable: 15,
    features: {
      wifi: true,
      ac: true,
      usb: true,
    },
  },
  {
    id: 5,
    operator: 'Capital Express',
    logo: 'https://via.placeholder.com/100/1E3A8A/FFFFFF?text=CE',
    from: 'Kigali',
    to: 'Butare',
    departureTime: '04:30 PM',
    arrivalTime: '07:00 PM',
    duration: '2h 30m',
    price: 'RWF 5,200',
    seatsAvailable: 10,
    features: {
      wifi: true,
      ac: false,
      usb: true,
    },
  },
];

export default function SearchPage() {
  const [buses] = useState(MOCK_BUSES);

  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Search Results</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <SearchFilter />
            </div>
            
            <div className="lg:col-span-3">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center">
                <div>
                  <h2 className="font-medium">Kigali to Butare</h2>
                  <p className="text-sm text-gray-500">April 10, 2023 • {buses.length} buses found</p>
                </div>
                <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                  <span className="text-sm text-gray-700">Sort by:</span>
                  <select className="text-sm border rounded-md px-2 py-1">
                    <option>Departure Time</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Duration</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {buses.map(bus => (
                  <BusCard key={bus.id} bus={bus} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
