
import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SearchFilter from '@/components/search/SearchFilter';
import BusCard from '@/components/search/BusCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CalendarIcon, MapPin, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BusSearchService, type Bus, type BusSearchFilters } from '@/services/BusSearchService';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchPage() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState<BusSearchFilters>({
    from: 'Kigali',
    to: 'Butare',
    date: '2025-04-10'
  });
  const [routes, setRoutes] = useState<{from: string, to: string}[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date('2025-04-10'));
  const [sortBy, setSortBy] = useState<string>('departureTime');
  const { toast } = useToast();

  // Load available routes
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const availableRoutes = await BusSearchService.getAvailableRoutes();
        setRoutes(availableRoutes);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };
    fetchRoutes();
  }, []);

  // Handle search
  useEffect(() => {
    const fetchBuses = async () => {
      setLoading(true);
      try {
        let results = await BusSearchService.searchBuses(searchParams);
        
        // Sort results
        if (sortBy === 'departureTime') {
          results.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        } else if (sortBy === 'price-low') {
          results.sort((a, b) => a.numericPrice - b.numericPrice);
        } else if (sortBy === 'price-high') {
          results.sort((a, b) => b.numericPrice - a.numericPrice);
        }
        
        setBuses(results);
      } catch (error) {
        console.error('Error searching buses:', error);
        toast({
          title: "Error searching buses",
          description: "There was a problem with your search. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchBuses();
  }, [searchParams, sortBy, toast]);

  const handleSearch = () => {
    // Update search params with current form values
    setSearchParams({
      ...searchParams,
      date: date ? format(date, 'yyyy-MM-dd') : undefined
    });
    
    toast({
      title: "Searching buses",
      description: `${searchParams.from} to ${searchParams.to} on ${date ? format(date, 'PPP') : 'any date'}`,
    });
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Form */}
          <Card className="mb-8 border-gray-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                  <Select 
                    value={searchParams.from}
                    onValueChange={(value) => setSearchParams({...searchParams, from: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(new Set(routes.map(route => route.from))).map((city, index) => (
                        <SelectItem key={index} value={city}>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                            {city}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <Select 
                    value={searchParams.to}
                    onValueChange={(value) => setSearchParams({...searchParams, to: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from(new Set(routes.map(route => route.to))).map((city, index) => (
                        <SelectItem key={index} value={city}>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                            {city}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    className="w-full bg-rwanda-blue hover:bg-blue-800"
                    onClick={handleSearch}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Search Buses
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Search Results</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <SearchFilter 
                onChange={(filters) => setSearchParams({...searchParams, ...filters})}
                currentFilters={searchParams}
              />
            </div>
            
            <div className="lg:col-span-3">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center">
                <div>
                  <h2 className="font-medium">{searchParams.from} to {searchParams.to}</h2>
                  <p className="text-sm text-gray-500">
                    {date ? format(date, 'PPPP') : 'Any date'} • {loading ? '...' : `${buses.length} buses found`}
                  </p>
                </div>
                <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                  <span className="text-sm text-gray-700">Sort by:</span>
                  <select 
                    className="text-sm border rounded-md px-2 py-1"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="departureTime">Departure Time</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                {loading ? (
                  // Loading skeletons
                  Array(3).fill(0).map((_, i) => (
                    <Card key={i} className="border-gray-200">
                      <CardContent className="p-0">
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Skeleton className="h-10 w-10 rounded-full" />
                              <div>
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24 mt-1" />
                              </div>
                            </div>
                            <Skeleton className="h-6 w-24" />
                          </div>
                        </div>
                        <div className="p-4">
                          <Skeleton className="h-20 w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : buses.length > 0 ? (
                  buses.map(bus => (
                    <BusCard key={bus.id} bus={bus} />
                  ))
                ) : (
                  <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                    <h3 className="text-lg font-medium mb-2">No buses found</h3>
                    <p className="text-gray-500 mb-4">
                      We couldn't find any buses matching your search criteria. Try adjusting your filters or searching for a different route.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => setSearchParams({
                        from: 'Kigali',
                        to: 'Butare',
                        date: '2025-04-10'
                      })}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
