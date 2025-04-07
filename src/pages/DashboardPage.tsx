
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import CustomerDashboard from '@/components/dashboard/CustomerDashboard';
import OperatorDashboard from '@/components/dashboard/OperatorDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  CreditCard, 
  Settings, 
  User, 
  Clock, 
  MapPin, 
  Bus 
} from 'lucide-react';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (!isMounted || isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center">
            <p className="text-xl">Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null; // This will redirect due to the useEffect above
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
          <p className="text-gray-600 mt-2">
            Your role: <span className="capitalize font-medium">{user.role}</span>
          </p>
        </div>

        {user.role === 'customer' && (
          <Tabs defaultValue="bookings">
            <TabsList className="mb-8">
              <TabsTrigger value="bookings" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                My Bookings
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Methods
              </TabsTrigger>
            </TabsList>
            <TabsContent value="bookings">
              <CustomerDashboard />
            </TabsContent>
            <TabsContent value="profile">
              <div className="grid gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <div className="mt-1 p-2 bg-gray-50 rounded-md">{user.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <div className="mt-1 p-2 bg-gray-50 rounded-md">{user.email}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Account Type</label>
                      <div className="mt-1 p-2 bg-gray-50 rounded-md capitalize">{user.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="payments">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Mobile Money</p>
                        <p className="text-sm text-gray-500">Pay directly with your mobile money account</p>
                      </div>
                    </div>
                    <span className="text-rwanda-blue font-medium cursor-pointer">Add</span>
                  </div>
                  <div className="p-4 border rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <CreditCard className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Credit/Debit Card</p>
                        <p className="text-sm text-gray-500">Pay with your card</p>
                      </div>
                    </div>
                    <span className="text-rwanda-blue font-medium cursor-pointer">Add</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {user.role === 'operator' && (
          <Tabs defaultValue="dashboard">
            <TabsList className="mb-8">
              <TabsTrigger value="dashboard" className="flex items-center">
                <Bus className="mr-2 h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="routes" className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                Routes
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Schedule
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dashboard">
              <OperatorDashboard />
            </TabsContent>
            <TabsContent value="routes">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Manage Routes</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Kigali to Butare</h3>
                        <div className="flex items-center text-gray-600 mt-1">
                          <span>Distance: 135 km • Duration: ~2h 30m</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 flex space-x-2">
                        <button className="px-3 py-1 bg-blue-50 text-rwanda-blue rounded-md text-sm">Edit</button>
                        <button className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm">Deactivate</button>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Kigali to Gisenyi</h3>
                        <div className="flex items-center text-gray-600 mt-1">
                          <span>Distance: 160 km • Duration: ~3h 00m</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 flex space-x-2">
                        <button className="px-3 py-1 bg-blue-50 text-rwanda-blue rounded-md text-sm">Edit</button>
                        <button className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm">Deactivate</button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="px-4 py-2 bg-rwanda-blue text-white rounded-md">Add New Route</button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="schedule">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Manage Schedule</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Kigali to Butare</h3>
                        <div className="flex items-center text-gray-600 mt-1">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Daily • </span>
                          <Clock className="ml-2 mr-2 h-4 w-4" />
                          <span>Departure: 08:00, 10:30, 14:00</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 flex space-x-2">
                        <button className="px-3 py-1 bg-blue-50 text-rwanda-blue rounded-md text-sm">Edit</button>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">Kigali to Gisenyi</h3>
                        <div className="flex items-center text-gray-600 mt-1">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Daily • </span>
                          <Clock className="ml-2 mr-2 h-4 w-4" />
                          <span>Departure: 07:00, 11:00, 15:00</span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0 flex space-x-2">
                        <button className="px-3 py-1 bg-blue-50 text-rwanda-blue rounded-md text-sm">Edit</button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button className="px-4 py-2 bg-rwanda-blue text-white rounded-md">Add New Schedule</button>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="settings">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Operator Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input type="text" className="mt-1 block w-full p-2 border rounded-md" defaultValue="Umuco Express" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                    <input type="email" className="mt-1 block w-full p-2 border rounded-md" defaultValue={user.email} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                    <input type="text" className="mt-1 block w-full p-2 border rounded-md" defaultValue="+250 78 123 4567" />
                  </div>
                  <div className="pt-4">
                    <button className="px-4 py-2 bg-rwanda-blue text-white rounded-md">Save Changes</button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {user.role === 'admin' && <AdminDashboard />}
      </div>
    </Layout>
  );
}
