
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Clock } from 'lucide-react';

// Mock data - would come from the backend in a real application
const routes = [
  {
    id: 1,
    from: 'Kigali',
    to: 'Butare',
    duration: '2.5 hours',
    price: 'RWF 5,000',
    image: 'https://images.unsplash.com/photo-1578594640334-b17666cf4c2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    from: 'Kigali',
    to: 'Gisenyi',
    duration: '3 hours',
    price: 'RWF 7,000',
    image: 'https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    from: 'Kigali',
    to: 'Ruhengeri',
    duration: '2 hours',
    price: 'RWF 4,500',
    image: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 4,
    from: 'Kigali',
    to: 'Cyangugu',
    duration: '4 hours',
    price: 'RWF 8,000',
    image: 'https://images.unsplash.com/photo-1482927236422-04106419d9ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
];

export default function PopularRoutes() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Popular Routes</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most frequented routes across Rwanda
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route) => (
            <Card key={route.id} className="overflow-hidden border-0 shadow-md">
              <div className="h-48 overflow-hidden">
                <img 
                  src={route.image} 
                  alt={`${route.from} to ${route.to}`}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-rwanda-blue mr-1" />
                    <span className="text-sm font-medium">{route.from}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-rwanda-green mr-1" />
                    <span className="text-sm font-medium">{route.to}</span>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <Clock className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">{route.duration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-rwanda-blue">{route.price}</span>
                  <Button variant="outline" className="text-rwanda-blue border-rwanda-blue hover:bg-blue-50">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="border-rwanda-blue text-rwanda-blue hover:bg-blue-50"
          >
            View All Routes
          </Button>
        </div>
      </div>
    </section>
  );
}
