
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Bus, Users, BarChart3, Route, CreditCard } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock data
const statistics = {
  totalUsers: 1250,
  totalTrips: 320,
  totalRoutes: 24,
  revenue: 8750000, // in RWF
  activeBookings: 156,
  customerGrowth: 15, // percentage
};

// Mock operators data
const operators = [
  { id: 1, name: 'Umuco Bus Main', busCount: 12, tripCount: 48, rating: 4.5 },
  { id: 2, name: 'Umuco Express', busCount: 8, tripCount: 32, rating: 4.3 },
  { id: 3, name: 'Umuco Shuttle', busCount: 5, tripCount: 20, rating: 4.2 },
];

// Format number with commas
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="text-3xl font-bold">{formatNumber(statistics.totalUsers)}</p>
                <p className="text-xs text-green-600">+{statistics.customerGrowth}% from last month</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Bookings</p>
                <p className="text-3xl font-bold">{formatNumber(statistics.activeBookings)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Bus className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Routes</p>
                <p className="text-3xl font-bold">{statistics.totalRoutes}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Route className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-3xl font-bold">RWF {formatNumber(statistics.revenue)}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operator Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Operator Performance</CardTitle>
          <CardDescription>Summary of active bus operators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {operators.map(operator => (
              <div key={operator.id} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{operator.name}</h3>
                    <div className="flex items-center text-gray-600 mt-1">
                      <span>{operator.busCount} buses • {operator.tripCount} trips</span>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <div className="flex items-center">
                      <span className="text-lg font-medium mr-2">{operator.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(operator.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Performance</span>
                    <span className="text-sm font-medium">{operator.rating * 20}%</span>
                  </div>
                  <Progress value={operator.rating * 20} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Summary placeholder for additional admin features */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-3">
                <Bus className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium">Buses</h3>
              <p className="text-sm text-gray-600">All systems operational</p>
            </div>
            
            <div className="border rounded-lg p-4 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-3">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium">Payments</h3>
              <p className="text-sm text-gray-600">Processing normally</p>
            </div>
            
            <div className="border rounded-lg p-4 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium">User Systems</h3>
              <p className="text-sm text-gray-600">All features available</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
