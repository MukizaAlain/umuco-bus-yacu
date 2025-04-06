
import { Bus, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

// Placeholder data - would come from API in real app
const LOCATIONS = [
  { id: 1, name: 'Kigali' },
  { id: 2, name: 'Butare' },
  { id: 3, name: 'Gisenyi' },
  { id: 4, name: 'Ruhengeri' },
  { id: 5, name: 'Cyangugu' },
  { id: 6, name: 'Kibungo' },
];

export default function Hero() {
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search');
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-24 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Travel across Rwanda <span className="text-rwanda-blue">safely</span> and <span className="text-rwanda-blue">comfortably</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-lg">
              Book bus tickets easily with Umuco Bus. Travel between cities across Rwanda with our modern fleet and professional service.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-rwanda-blue hover:bg-blue-800 text-white"
              >
                <Bus className="mr-2 h-5 w-5" />
                Find Buses
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-rwanda-blue text-rwanda-blue hover:bg-blue-50"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <Card className="shadow-lg border-0 overflow-hidden animate-fade-in">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Book Your Trip</h2>
              <form onSubmit={handleSearchSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-rwanda-blue" />
                      From
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select departure" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCATIONS.map(location => (
                          <SelectItem key={location.id} value={location.name.toLowerCase()}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-rwanda-blue" />
                      To
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select destination" />
                      </SelectTrigger>
                      <SelectContent>
                        {LOCATIONS.map(location => (
                          <SelectItem key={location.id} value={location.name.toLowerCase()}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-rwanda-blue" />
                      Date
                    </label>
                    <input 
                      type="date"
                      className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full mt-2 bg-rwanda-blue hover:bg-blue-800 text-white"
                  >
                    Search Buses
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <div className="imigongo-divider w-full"></div>
      </div>
    </section>
  );
}
