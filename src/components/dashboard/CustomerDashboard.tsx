
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CalendarDays, Ticket, Clock, AlertCircle, ArrowRight } from 'lucide-react';
import { PaymentService } from '@/services/PaymentService';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router-dom';

// Booking interface
interface Booking {
  id: string;
  route: string;
  date: string;
  departureTime: string;
  seats: string[];
  status: 'confirmed' | 'cancelled' | 'completed';
  ticketNumber: string;
  amount: number;
  paymentMethod: 'mobile' | 'card';
  transactionId: string;
  createdAt: string;
}

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [pastBookings, setPastBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      setLoading(true);
      
      try {
        // Fetch bookings from localStorage (via service)
        const bookings = await PaymentService.getBookingsByUserId(user.id);
        
        // If no bookings found, add mock data for demonstration
        const allBookings: Booking[] = bookings.length > 0 ? bookings : [
          {
            id: 'b1',
            route: 'Kigali to Butare',
            date: '2025-04-10',
            departureTime: '09:00',
            seats: ['A1', 'A2'],
            status: 'confirmed',
            ticketNumber: 'TK-12345',
            amount: 10000,
            paymentMethod: 'mobile',
            transactionId: 'TXN123456789',
            createdAt: '2025-04-01T12:00:00Z'
          },
          {
            id: 'b2',
            route: 'Butare to Kigali',
            date: '2025-04-20',
            departureTime: '14:30',
            seats: ['B5'],
            status: 'confirmed',
            ticketNumber: 'TK-23456',
            amount: 5000,
            paymentMethod: 'card',
            transactionId: 'TXN987654321',
            createdAt: '2025-04-02T15:30:00Z'
          }
        ];
        
        // Filter bookings by date
        const today = new Date();
        const upcoming = allBookings.filter(booking => new Date(booking.date) >= today);
        const past = allBookings.filter(booking => new Date(booking.date) < today);
        
        setUpcomingBookings(upcoming);
        setPastBookings(past);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [user]);

  const renderBookings = (bookings: Booking[]) => {
    if (loading) {
      return Array(2).fill(0).map((_, i) => (
        <Card key={i} className="mb-4">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <div>
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-4 w-60" />
              </div>
              <Skeleton className="h-6 w-20 mt-2 md:mt-0" />
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      ));
    }
    
    if (bookings.length === 0) {
      return (
        <div className="text-center py-10">
          <AlertCircle className="mx-auto h-10 w-10 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
          <p className="mt-1 text-sm text-gray-500 mb-4">You don't have any bookings yet.</p>
          <Link to="/search">
            <Button className="bg-rwanda-blue hover:bg-blue-800">
              Find a Bus
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
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
                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {booking.status === 'confirmed' ? 'Confirmed' : 
                 booking.status === 'cancelled' ? 'Cancelled' : 'Completed'}
              </span>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="mb-2 sm:mb-0">
                <span className="text-sm text-gray-600">Ticket: </span>
                <span className="font-medium">{booking.ticketNumber}</span>
              </div>
              <div className="mb-2 sm:mb-0">
                <span className="text-sm text-gray-600">Seats: </span>
                <span className="font-medium">{booking.seats.join(', ')}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Amount: </span>
                <span className="font-medium">RWF {booking.amount.toLocaleString()}</span>
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
