
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BarChart, PieChart, Users, Route, Bus, Calendar, User, Settings } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Mock data for the admin dashboard
const mockOperators = [
  { id: 1, name: 'Volcano Express', email: 'info@volcano.rw', phone: '+250 78 123 4567', status: 'active', busCount: 12 },
  { id: 2, name: 'Horizon Coach', email: 'info@horizon.rw', phone: '+250 72 345 6789', status: 'active', busCount: 8 },
  { id: 3, name: 'Capital Express', email: 'info@capital.rw', phone: '+250 78 987 6543', status: 'inactive', busCount: 5 },
];

const mockRoutes = [
  { id: 1, from: 'Kigali', to: 'Butare', distance: '135 km', duration: '2h 30m', price: 'RWF 5,000', operators: 3, status: 'active' },
  { id: 2, from: 'Kigali', to: 'Gisenyi', distance: '160 km', duration: '3h 00m', price: 'RWF 6,000', operators: 4, status: 'active' },
  { id: 3, from: 'Kigali', to: 'Ruhengeri', distance: '98 km', duration: '2h 00m', price: 'RWF 4,500', operators: 2, status: 'active' },
  { id: 4, from: 'Butare', to: 'Gisenyi', distance: '230 km', duration: '4h 30m', price: 'RWF 8,000', operators: 1, status: 'inactive' },
];

const mockBuses = [
  { id: 1, registrationNumber: 'RAB 123 A', operator: 'Volcano Express', capacity: 45, status: 'active', lastMaintenance: '2025-03-10' },
  { id: 2, registrationNumber: 'RAC 456 B', operator: 'Horizon Coach', capacity: 50, status: 'active', lastMaintenance: '2025-03-15' },
  { id: 3, registrationNumber: 'RAD 789 C', operator: 'Volcano Express', capacity: 40, status: 'maintenance', lastMaintenance: '2025-04-01' },
  { id: 4, registrationNumber: 'RAE 012 D', operator: 'Capital Express', capacity: 45, status: 'active', lastMaintenance: '2025-03-22' },
];

const mockBookings = [
  { id: 1, route: 'Kigali to Butare', customer: 'John Doe', seats: 2, date: '2025-04-10', amount: 'RWF 10,000', status: 'confirmed' },
  { id: 2, route: 'Kigali to Gisenyi', customer: 'Jane Smith', seats: 1, date: '2025-04-12', amount: 'RWF 6,000', status: 'confirmed' },
  { id: 3, route: 'Butare to Kigali', customer: 'Alice Johnson', seats: 3, date: '2025-04-15', amount: 'RWF 15,000', status: 'confirmed' },
  { id: 4, route: 'Kigali to Ruhengeri', customer: 'Bob Brown', seats: 1, date: '2025-04-11', amount: 'RWF 4,500', status: 'cancelled' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Statistics for summary cards
  const dailyBookings = 24;
  const dailyRevenue = 'RWF 145,000';
  const totalUsers = 156;
  const totalRoutes = 12;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="mb-8 w-full overflow-x-auto flex-nowrap justify-start">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="routes" className="flex items-center">
            <Route className="mr-2 h-4 w-4" />
            Routes
          </TabsTrigger>
          <TabsTrigger value="buses" className="flex items-center">
            <Bus className="mr-2 h-4 w-4" />
            Buses
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            Bookings
          </TabsTrigger>
          <TabsTrigger value="operators" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Operators
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <PieChart className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Daily Bookings</p>
                    <p className="text-3xl font-bold">{dailyBookings}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Daily Revenue</p>
                    <p className="text-3xl font-bold">{dailyRevenue}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <BarChart className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <p className="text-3xl font-bold">{totalUsers}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Routes</p>
                    <p className="text-3xl font-bold">{totalRoutes}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Route className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.slice(0, 3).map(booking => (
                    <div key={booking.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{booking.route}</p>
                        <p className="text-sm text-gray-500">{booking.customer} • {booking.seats} seat(s)</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{booking.amount}</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Bus Operators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOperators.map(operator => (
                    <div key={operator.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{operator.name}</p>
                        <p className="text-sm text-gray-500">{operator.busCount} buses</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        operator.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {operator.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Routes Tab */}
        <TabsContent value="routes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manage Routes</CardTitle>
              <Button className="bg-rwanda-blue hover:bg-blue-800">
                Add New Route
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Input placeholder="Search routes..." className="pl-10" />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Users className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Route</th>
                      <th className="text-left p-2">Distance</th>
                      <th className="text-left p-2">Duration</th>
                      <th className="text-left p-2">Price</th>
                      <th className="text-left p-2">Operators</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockRoutes.map(route => (
                      <tr key={route.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div className="font-medium">{route.from} to {route.to}</div>
                        </td>
                        <td className="p-2">{route.distance}</td>
                        <td className="p-2">{route.duration}</td>
                        <td className="p-2">{route.price}</td>
                        <td className="p-2">{route.operators}</td>
                        <td className="p-2">
                          <Badge className={`${
                            route.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }`}>
                            {route.status}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              {route.status === 'active' ? 'Deactivate' : 'Activate'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Buses Tab */}
        <TabsContent value="buses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Manage Buses</CardTitle>
              <Button className="bg-rwanda-blue hover:bg-blue-800">
                Add New Bus
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Input placeholder="Search buses..." className="pl-10" />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Users className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Registration</th>
                      <th className="text-left p-2">Operator</th>
                      <th className="text-left p-2">Capacity</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Last Maintenance</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBuses.map(bus => (
                      <tr key={bus.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div className="font-medium">{bus.registrationNumber}</div>
                        </td>
                        <td className="p-2">{bus.operator}</td>
                        <td className="p-2">{bus.capacity} seats</td>
                        <td className="p-2">
                          <Badge className={`${
                            bus.status === 'active' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : bus.status === 'maintenance'
                                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }`}>
                            {bus.status}
                          </Badge>
                        </td>
                        <td className="p-2">{bus.lastMaintenance}</td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm">Assign</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Bookings Tab */}
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="relative flex-1">
                  <Input placeholder="Search bookings..." className="pl-10" />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Users className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <select className="border rounded-md px-3 py-2 bg-white">
                    <option>All Status</option>
                    <option>Confirmed</option>
                    <option>Cancelled</option>
                  </select>
                  <Input type="date" className="w-auto" />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Booking ID</th>
                      <th className="text-left p-2">Route</th>
                      <th className="text-left p-2">Customer</th>
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Seats</th>
                      <th className="text-left p-2">Amount</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookings.map(booking => (
                      <tr key={booking.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div className="font-medium">#{booking.id.toString().padStart(5, '0')}</div>
                        </td>
                        <td className="p-2">{booking.route}</td>
                        <td className="p-2">{booking.customer}</td>
                        <td className="p-2">{booking.date}</td>
                        <td className="p-2">{booking.seats}</td>
                        <td className="p-2">{booking.amount}</td>
                        <td className="p-2">
                          <Badge className={`${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }`}>
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View</Button>
                            {booking.status === 'confirmed' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                Cancel
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Operators Tab */}
        <TabsContent value="operators">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Bus Operators</CardTitle>
              <Button className="bg-rwanda-blue hover:bg-blue-800">
                Add New Operator
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Input placeholder="Search operators..." className="pl-10" />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Users className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Company Name</th>
                      <th className="text-left p-2">Contact Email</th>
                      <th className="text-left p-2">Phone</th>
                      <th className="text-left p-2">Bus Count</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOperators.map(operator => (
                      <tr key={operator.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div className="font-medium">{operator.name}</div>
                        </td>
                        <td className="p-2">{operator.email}</td>
                        <td className="p-2">{operator.phone}</td>
                        <td className="p-2">{operator.busCount}</td>
                        <td className="p-2">
                          <Badge className={`${
                            operator.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }`}>
                            {operator.status}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              {operator.status === 'active' ? 'Deactivate' : 'Activate'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Route</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Kigali to Butare</span>
                      <span>RWF 450,000</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Kigali to Gisenyi</span>
                      <span>RWF 380,000</span>
                    </div>
                    <Progress value={63} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Kigali to Ruhengeri</span>
                      <span>RWF 290,000</span>
                    </div>
                    <Progress value={48} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Butare to Kigali</span>
                      <span>RWF 420,000</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Operator Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Volcano Express</span>
                      <span>178 bookings</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Horizon Coach</span>
                      <span>145 bookings</span>
                    </div>
                    <Progress value={69} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Capital Express</span>
                      <span>92 bookings</span>
                    </div>
                    <Progress value={44} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>New Registrations (This Week)</span>
                      <span>24 users</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Active Users (Last 7 Days)</span>
                      <span>87 users</span>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Booking Completion Rate</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
