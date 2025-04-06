
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Bus, Users, CalendarDays, Clock, Route } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data
const scheduledTrips = [
  {
    id: 't1',
    route: 'Kigali to Butare',
    date: '2025-04-07',
    departureTime: '08:00',
    bus: 'Bus A-123',
    capacity: 45,
    booked: 32,
    status: 'scheduled'
  },
  {
    id: 't2',
    route: 'Kigali to Gisenyi',
    date: '2025-04-07',
    departureTime: '10:30',
    bus: 'Bus B-456',
    capacity: 50,
    booked: 42,
    status: 'scheduled'
  },
  {
    id: 't3',
    route: 'Kigali to Ruhengeri',
    date: '2025-04-08',
    departureTime: '07:30',
    bus: 'Bus C-789',
    capacity: 40,
    booked: 15,
    status: 'scheduled'
  }
];

export default function OperatorDashboard() {
  // Summary statistics
  const totalTrips = scheduledTrips.length;
  const totalPassengers = scheduledTrips.reduce((sum, trip) => sum + trip.booked, 0);
  const averageCapacity = scheduledTrips.reduce((sum, trip) => sum + (trip.booked / trip.capacity * 100), 0) / totalTrips;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Trips</p>
                <p className="text-3xl font-bold">{totalTrips}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Bus className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Passengers</p>
                <p className="text-3xl font-bold">{totalPassengers}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Capacity</p>
                <p className="text-3xl font-bold">{Math.round(averageCapacity)}%</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Route className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Trips */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Trips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledTrips.map(trip => (
              <div key={trip.id} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{trip.route}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      <span>{new Date(trip.date).toLocaleDateString()}</span>
                      <Clock className="ml-4 mr-2 h-4 w-4" />
                      <span>{trip.departureTime}</span>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p className="text-sm text-gray-600">Bus: <span className="font-medium">{trip.bus}</span></p>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Capacity</span>
                    <span className="text-sm font-medium">{trip.booked}/{trip.capacity} seats</span>
                  </div>
                  <Progress value={(trip.booked / trip.capacity) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
