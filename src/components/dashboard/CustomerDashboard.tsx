
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CalendarDays, Ticket, Clock, AlertCircle } from 'lucide-react';

// Simulated booking data
const mockBookings = [
  {
    id: 'b1',
    route: 'Kigali to Butare',
    date: '2025-04-10',
    departureTime: '09:00',
    seats: ['A1', 'A2'],
    status: 'confirmed',
    ticketNumber: 'TK-12345'
  },
  {
    id: 'b2',
    route: 'Butare to Kigali',
    date: '2025-04-20',
    departureTime: '14:30',
    seats: ['B5'],
    status: 'confirmed',
    ticketNumber: 'TK-23456'
  }
];

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);

  useEffect(() => {
    // Filter bookings by date
    const today = new Date();
    const upcoming = mockBookings.filter(booking => new Date(booking.date) >= today);
    const past = mockBookings.filter(booking => new Date(booking.date) < today);
    
    setUpcomingBookings(upcoming);
    setPastBookings(past);
  }, []);

  const renderBookings = (bookings) => {
    if (bookings.length === 0) {
      return (
        <div className="text-center py-10">
          <AlertCircle className="mx-auto h-10 w-10 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
          <p className="mt-1 text-sm text-gray-500">You don't have any bookings yet.</p>
        </div>
      );
    }

    return bookings.map(booking => (
      <Card key={booking.id} className="mb-4">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">{booking.route}</h3>
              <div className="flex items-center text-gray-600 mt-1">
                <CalendarDays className="mr-2 h-4 w-4" />
                <span>{new Date(booking.date).toLocaleDateString()}</span>
                <Clock className="ml-4 mr-2 h-4 w-4" />
                <span>{booking.departureTime}</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
              </span>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm text-gray-600">Ticket: </span>
                <span className="font-medium">{booking.ticketNumber}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Seats: </span>
                <span className="font-medium">{booking.seats.join(', ')}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div>
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming" className="flex items-center">
                <Ticket className="mr-2 h-4 w-4" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="past" className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Past
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {renderBookings(upcomingBookings)}
            </TabsContent>
            
            <TabsContent value="past">
              {renderBookings(pastBookings)}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
