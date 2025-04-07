
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Bus, 
  Users, 
  BarChart3, 
  Route, 
  CreditCard,
  Calendar,
  Activity
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

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

// Mock routes data
const routes = [
  { id: 1, name: 'Kigali to Butare', distance: '135 km', duration: '2h 30m', price: 5000, buses: 12 },
  { id: 2, name: 'Kigali to Gisenyi', distance: '160 km', duration: '3h 00m', price: 6500, buses: 8 },
  { id: 3, name: 'Kigali to Ruhengeri', distance: '100 km', duration: '1h 45m', price: 4000, buses: 10 },
  { id: 4, name: 'Butare to Gisenyi', distance: '250 km', duration: '4h 15m', price: 8000, buses: 5 },
];

// Mock buses data
const buses = [
  { id: 1, number: 'RAC 123D', model: 'Toyota Coaster', capacity: 28, operator: 'Umuco Bus Main', status: 'active' },
  { id: 2, number: 'RAD 456E', model: 'Mercedes Sprinter', capacity: 18, operator: 'Umuco Express', status: 'active' },
  { id: 3, number: 'RAD 789F', model: 'Higer Coach', capacity: 45, operator: 'Umuco Shuttle', status: 'maintenance' },
  { id: 4, number: 'RAE 012G', model: 'Toyota Coaster', capacity: 28, operator: 'Umuco Bus Main', status: 'active' },
];

// Mock bookings data
const bookings = [
  { id: 'B00123', user: 'Jean Niyomugabo', route: 'Kigali to Butare', date: '2025-04-07', seats: 2, status: 'confirmed' },
  { id: 'B00124', user: 'Marie Uwase', route: 'Kigali to Gisenyi', date: '2025-04-08', seats: 1, status: 'pending' },
  { id: 'B00125', user: 'Eric Mutabazi', route: 'Kigali to Ruhengeri', date: '2025-04-07', seats: 3, status: 'confirmed' },
  { id: 'B00126', user: 'Alice Kampire', route: 'Butare to Gisenyi', date: '2025-04-09', seats: 1, status: 'cancelled' },
];

// Format number with commas
const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Format date to readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

export default function AdminDashboard() {
  const [newBusAssignment, setNewBusAssignment] = useState({ busId: '', operatorId: '' });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle bus assignment
  const handleBusAssignment = () => {
    // Here you would implement the actual assignment logic
    console.log('Assigning bus to operator:', newBusAssignment);
    // Reset form
    setNewBusAssignment({ busId: '', operatorId: '' });
  };

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="mb-6">
        <TabsTrigger value="overview" className="flex items-center">
          <BarChart3 className="mr-2 h-4 w-4" />
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
          <Activity className="mr-2 h-4 w-4" />
          Analytics
        </TabsTrigger>
      </TabsList>

      {/* Overview Tab Content */}
      <TabsContent value="overview">
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
      </TabsContent>

      {/* Routes Tab Content */}
      <TabsContent value="routes">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manage Routes</CardTitle>
              <CardDescription>Add, edit or delete routes</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add New Route</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Route</DialogTitle>
                  <DialogDescription>Enter details for the new route.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="route-name">Route Name</Label>
                    <Input id="route-name" placeholder="e.g. Kigali to Butare" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="distance">Distance (km)</Label>
                      <Input id="distance" type="number" placeholder="135" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input id="duration" placeholder="e.g. 2h 30m" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (RWF)</Label>
                      <Input id="price" type="number" placeholder="5000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="buses">Assigned Buses</Label>
                      <Input id="buses" type="number" placeholder="0" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Route</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Buses</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {routes.map(route => (
                  <TableRow key={route.id}>
                    <TableCell className="font-medium">{route.name}</TableCell>
                    <TableCell>{route.distance}</TableCell>
                    <TableCell>{route.duration}</TableCell>
                    <TableCell>RWF {formatNumber(route.price)}</TableCell>
                    <TableCell>{route.buses}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Buses Tab Content */}
      <TabsContent value="buses">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manage Buses</CardTitle>
              <CardDescription>Add, edit or delete buses</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add New Bus</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Bus</DialogTitle>
                  <DialogDescription>Enter details for the new bus.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="bus-number">Bus Number</Label>
                    <Input id="bus-number" placeholder="e.g. RAC 123D" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input id="model" placeholder="e.g. Toyota Coaster" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input id="capacity" type="number" placeholder="28" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="operator">Operator</Label>
                      <Input id="operator" placeholder="Select Operator" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Bus</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bus Number</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Operator</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {buses.map(bus => (
                  <TableRow key={bus.id}>
                    <TableCell className="font-medium">{bus.number}</TableCell>
                    <TableCell>{bus.model}</TableCell>
                    <TableCell>{bus.capacity} seats</TableCell>
                    <TableCell>{bus.operator}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        bus.status === 'active' ? 'bg-green-100 text-green-800' : 
                        bus.status === 'maintenance' ? 'bg-amber-100 text-amber-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {bus.status.charAt(0).toUpperCase() + bus.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Bus Assignment Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Assign Buses to Operators</CardTitle>
            <CardDescription>Manage which operator is responsible for which buses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bus-select">Select Bus</Label>
                  <select 
                    id="bus-select" 
                    className="w-full p-2 border rounded-md"
                    value={newBusAssignment.busId}
                    onChange={(e) => setNewBusAssignment({...newBusAssignment, busId: e.target.value})}
                  >
                    <option value="">Select a bus</option>
                    {buses.map(bus => (
                      <option key={bus.id} value={bus.id}>{bus.number} - {bus.model}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="operator-select">Select Operator</Label>
                  <select 
                    id="operator-select" 
                    className="w-full p-2 border rounded-md"
                    value={newBusAssignment.operatorId}
                    onChange={(e) => setNewBusAssignment({...newBusAssignment, operatorId: e.target.value})}
                  >
                    <option value="">Select an operator</option>
                    {operators.map(operator => (
                      <option key={operator.id} value={operator.id}>{operator.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Button onClick={handleBusAssignment}>Assign Bus to Operator</Button>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Current Assignments</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bus Number</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Operator</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buses.map(bus => (
                    <TableRow key={`assignment-${bus.id}`}>
                      <TableCell>{bus.number}</TableCell>
                      <TableCell>{bus.model}</TableCell>
                      <TableCell>{bus.operator}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Change</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Bookings Tab Content */}
      <TabsContent value="bookings">
        <Card>
          <CardHeader>
            <CardTitle>Manage Bookings</CardTitle>
            <CardDescription>View and manage all bookings across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-6">
              <Input 
                placeholder="Search bookings..." 
                className="max-w-sm" 
              />
              <div className="space-x-2">
                <Button variant="outline">Export</Button>
                <Button variant="outline">Filter</Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Seats</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map(booking => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.user}</TableCell>
                    <TableCell>{booking.route}</TableCell>
                    <TableCell>{formatDate(booking.date)}</TableCell>
                    <TableCell>{booking.seats}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                        booking.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {isMobile ? (
                        <Drawer>
                          <DrawerTrigger asChild>
                            <Button variant="outline" size="sm">Details</Button>
                          </DrawerTrigger>
                          <DrawerContent>
                            <DrawerHeader>
                              <DrawerTitle>Booking Details - {booking.id}</DrawerTitle>
                              <DrawerDescription>View or edit this booking</DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4 space-y-4">
                              <div>
                                <Label>User</Label>
                                <p className="text-sm">{booking.user}</p>
                              </div>
                              <div>
                                <Label>Route</Label>
                                <p className="text-sm">{booking.route}</p>
                              </div>
                              <div>
                                <Label>Date</Label>
                                <p className="text-sm">{formatDate(booking.date)}</p>
                              </div>
                              <div>
                                <Label>Seats</Label>
                                <p className="text-sm">{booking.seats}</p>
                              </div>
                              <div>
                                <Label>Status</Label>
                                <select className="w-full p-2 border rounded-md mt-1">
                                  <option value="confirmed" selected={booking.status === 'confirmed'}>Confirmed</option>
                                  <option value="pending" selected={booking.status === 'pending'}>Pending</option>
                                  <option value="cancelled" selected={booking.status === 'cancelled'}>Cancelled</option>
                                </select>
                              </div>
                              <div className="flex space-x-2 pt-4">
                                <Button className="flex-1">Update</Button>
                                <Button variant="destructive" className="flex-1">Cancel Booking</Button>
                              </div>
                            </div>
                          </DrawerContent>
                        </Drawer>
                      ) : (
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="outline" size="sm">Details</Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Booking Details - {booking.id}</SheetTitle>
                              <SheetDescription>View or edit this booking</SheetDescription>
                            </SheetHeader>
                            <div className="py-6 space-y-4">
                              <div>
                                <Label>User</Label>
                                <p className="text-sm">{booking.user}</p>
                              </div>
                              <div>
                                <Label>Route</Label>
                                <p className="text-sm">{booking.route}</p>
                              </div>
                              <div>
                                <Label>Date</Label>
                                <p className="text-sm">{formatDate(booking.date)}</p>
                              </div>
                              <div>
                                <Label>Seats</Label>
                                <p className="text-sm">{booking.seats}</p>
                              </div>
                              <div>
                                <Label>Status</Label>
                                <select className="w-full p-2 border rounded-md mt-1">
                                  <option value="confirmed" selected={booking.status === 'confirmed'}>Confirmed</option>
                                  <option value="pending" selected={booking.status === 'pending'}>Pending</option>
                                  <option value="cancelled" selected={booking.status === 'cancelled'}>Cancelled</option>
                                </select>
                              </div>
                              <div className="flex space-x-2 pt-4">
                                <Button className="flex-1">Update</Button>
                                <Button variant="destructive" className="flex-1">Cancel Booking</Button>
                              </div>
                            </div>
                          </SheetContent>
                        </Sheet>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Operators Tab Content */}
      <TabsContent value="operators">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Manage Operators</CardTitle>
              <CardDescription>View and manage bus operators</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add New Operator</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Operator</DialogTitle>
                  <DialogDescription>Enter details for the new bus operator.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="operator-name">Operator Name</Label>
                    <Input id="operator-name" placeholder="e.g. Umuco Express" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Contact Person</Label>
                    <Input id="contact-name" placeholder="Full Name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+250 7X XXX XXXX" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Operator</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Buses</TableHead>
                  <TableHead>Trips</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {operators.map(operator => (
                  <TableRow key={operator.id}>
                    <TableCell className="font-medium">{operator.name}</TableCell>
                    <TableCell>{operator.busCount}</TableCell>
                    <TableCell>{operator.tripCount}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="mr-2">{operator.rating}</span>
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
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm">Deactivate</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Analytics Tab Content */}
      <TabsContent value="analytics">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Analytics</CardTitle>
              <CardDescription>View booking trends and data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                <p className="text-muted-foreground">Chart showing daily bookings would be rendered here</p>
                {/* In a real implementation, you would use a chart library like recharts */}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">Today's Bookings</p>
                      <p className="text-3xl font-bold">42</p>
                      <p className="text-xs text-green-600">+12% from yesterday</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">Weekly Total</p>
                      <p className="text-3xl font-bold">289</p>
                      <p className="text-xs text-green-600">+8% from last week</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">Monthly Total</p>
                      <p className="text-3xl font-bold">1,245</p>
                      <p className="text-xs text-green-600">+15% from last month</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>Financial performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                <p className="text-muted-foreground">Chart showing revenue trends would be rendered here</p>
                {/* In a real implementation, you would use a chart library like recharts */}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">Today's Revenue</p>
                      <p className="text-3xl font-bold">RWF {formatNumber(210000)}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">Weekly Revenue</p>
                      <p className="text-3xl font-bold">RWF {formatNumber(1450000)}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                      <p className="text-3xl font-bold">RWF {formatNumber(6225000)}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Monitor user engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                <p className="text-muted-foreground">Chart showing user activity would be rendered here</p>
                {/* In a real implementation, you would use a chart library like recharts */}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">Active Users Today</p>
                      <p className="text-3xl font-bold">156</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">New Registrations</p>
                      <p className="text-3xl font-bold">24</p>
                      <p className="text-xs text-green-600">+18% from last week</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">Return Rate</p>
                      <p className="text-3xl font-bold">68%</p>
                      <p className="text-xs text-green-600">+5% from last month</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
