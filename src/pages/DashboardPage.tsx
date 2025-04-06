
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import CustomerDashboard from '@/components/dashboard/CustomerDashboard';
import OperatorDashboard from '@/components/dashboard/OperatorDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
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

        {user.role === 'customer' && <CustomerDashboard />}
        {user.role === 'operator' && <OperatorDashboard />}
        {user.role === 'admin' && <AdminDashboard />}
      </div>
    </Layout>
  );
}
