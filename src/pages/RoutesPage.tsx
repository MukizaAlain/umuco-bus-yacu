
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, ArrowRight, Clock, Search, Calendar, Bus } from 'lucide-react';

// Mock data - would come from the backend in a real application
const routesData = [
  {
    id: 1,
    from: 'Kigali',
    to: 'Butare',
    duration: '2.5 hours',
    price: 'RWF 5,000',
    distance: '135 km',
    departures: ['07:00', '10:30', '14:00', '17:30'],
    frequency: 'Daily',
    operator: 'Umuco Bus',
    image: 'https://images.unsplash.com/photo-1578594640334-b17666cf4c2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    from: 'Kigali',
    to: 'Gisenyi',
    duration: '3 hours',
    price: 'RWF 7,000',
    distance: '160 km',
    departures: ['06:30', '09:00', '12:30', '16:00'],
    frequency: 'Daily',
    operator: 'Umuco Bus',
    image: 'https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    from: 'Kigali',
    to: 'Ruhengeri',
    duration: '2 hours',
    price: 'RWF 4,500',
    distance: '100 km',
    departures: ['07:30', '11:00', '15:30', '18:00'],
    frequency: 'Daily',
    operator: 'Umuco Bus',
    image: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 4,
    from: 'Kigali',
    to: 'Cyangugu',
    duration: '4 hours',
    price: 'RWF 8,000',
    distance: '225 km',
    departures: ['06:00', '10:00', '14:30'],
    frequency: 'Daily',
    operator: 'Umuco Bus',
    image: 'https://images.unsplash.com/photo-1482927236422-04106419d9ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 5,
    from: 'Butare',
    to: 'Kigali',
    duration: '2.5 hours',
    price: 'RWF 5,000',
    distance: '135 km',
    departures: ['06:00', '09:30', '13:00', '16:30'],
    frequency: 'Daily',
    operator: 'Umuco Bus',
    image: 'https://images.unsplash.com/photo-1578594640334-b17666cf4c2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 6,
    from: 'Gisenyi',
    to: 'Kigali',
    duration: '3 hours',
    price: 'RWF 7,000',
    distance: '160 km',
    departures: ['05:30', '08:00', '11:30', '15:00'],
    frequency: 'Daily',
    operator: 'Umuco Bus',
    image: 'https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 7,
    from: 'Ruhengeri',
    to: 'Gisenyi',
    duration: '1.5 hours',
    price: 'RWF 3,500',
    distance: '60 km',
    departures: ['07:00', '10:30', '14:00', '17:30'],
    frequency: 'Daily',
    operator: 'Umuco Bus',
    image: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 8,
    from: 'Cyangugu',
    to: 'Butare',
    duration: '2 hours',
    price: 'RWF 4,000',
    distance: '90 km',
    departures: ['07:30', '11:00', '15:30'],
    frequency: 'Daily',
    operator: 'Umuco Bus',
    image: 'https://images.unsplash.com/photo-1482927236422-04106419d9ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
];

// Get unique locations from routes data
const locations = Array.from(
  new Set([
    ...routesData.map((route) => route.from),
    ...routesData.map((route) => route.to),
  ])
).sort();

export default function RoutesPage() {
  const [fromLocation, setFromLocation] = useState<string>('any-location');
  const [toLocation, setToLocation] = useState<string>('any-location');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('price');

  // Filter and sort routes based on user selections
  const filteredRoutes = routesData.filter((route) => {
    const matchesFrom = fromLocation === 'any-location' || route.from === fromLocation;
    const matchesTo = toLocation === 'any-location' || route.to === toLocation;
    const matchesSearch = !searchQuery || 
      route.from.toLowerCase().includes(searchQuery.toLowerCase()) || 
      route.to.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFrom && matchesTo && matchesSearch;
  });

  // Sort routes based on selected criteria
  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
      case 'duration':
        return parseFloat(a.duration) - parseFloat(b.duration);
      case 'distance':
        return parseInt(a.distance.replace(/\D/g, '')) - parseInt(b.distance.replace(/\D/g, ''));
      default:
        return 0;
    }
  });

  return (
    <Layout>
      <div className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore All Routes</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find and book bus routes all across Rwanda with our convenient service
            </p>
          </div>

          {/* Search and filter bar */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <Select value={fromLocation} onValueChange={setFromLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select departure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any-location">Any location</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <Select value={toLocation} onValueChange={setToLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any-location">Any location</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search routes..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Price: Low to High</SelectItem>
                    <SelectItem value="duration">Duration: Shortest</SelectItem>
                    <SelectItem value="distance">Distance: Shortest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Routes listing */}
          <div className="grid grid-cols-1 gap-6">
            {sortedRoutes.length > 0 ? (
              sortedRoutes.map((route) => (
                <RouteCard key={route.id} route={route} />
              ))
            ) : (
              <div className="text-center py-10">
                <Bus className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No routes found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface RouteCardProps {
  route: typeof routesData[0];
}

function RouteCard({ route }: RouteCardProps) {
  return (
    <Card className="overflow-hidden border border-gray-200 transition-all hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 h-48 md:h-auto overflow-hidden">
          <img 
            src={route.image} 
            alt={`${route.from} to ${route.to} route`}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="flex flex-col items-center mr-4">
                <MapPin className="h-5 w-5 text-rwanda-blue mb-1" />
                <span className="text-lg font-semibold">{route.from}</span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 mx-4" />
              <div className="flex flex-col items-center ml-4">
                <MapPin className="h-5 w-5 text-rwanda-green mb-1" />
                <span className="text-lg font-semibold">{route.to}</span>
              </div>
            </div>
            <div className="flex flex-col md:items-end">
              <span className="text-2xl font-bold text-rwanda-blue">{route.price}</span>
              <span className="text-sm text-gray-500">{route.distance}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">{route.duration}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">{route.frequency}</span>
            </div>
            <div className="flex items-center">
              <Bus className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-600">{route.operator}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Departure Times</h4>
              <div className="flex flex-wrap gap-2">
                {route.departures.map((time) => (
                  <span 
                    key={time} 
                    className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button className="bg-rwanda-blue hover:bg-blue-800">
                Book Now
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
