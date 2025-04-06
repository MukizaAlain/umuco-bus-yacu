
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogIn, LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-10 w-auto"
                src="/images/logo.svg"
                alt="Umuco Bus"
              />
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-rwanda-blue"
                >
                  Home
                </Link>
                <Link
                  to="/search"
                  className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-rwanda-blue"
                >
                  Find Buses
                </Link>
                <Link
                  to="/routes"
                  className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-rwanda-blue"
                >
                  Routes
                </Link>
                {isAuthenticated && user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-rwanda-blue"
                  >
                    Admin
                  </Link>
                )}
                {isAuthenticated && user?.role === 'operator' && (
                  <Link
                    to="/operator"
                    className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-rwanda-blue"
                  >
                    Operator
                  </Link>
                )}
                <Link
                  to="/support"
                  className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-rwanda-blue"
                >
                  Support
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="outline" className="flex items-center space-x-1">
                      <Settings className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleLogout} 
                    variant="outline" 
                    className="flex items-center space-x-1 border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="flex items-center space-x-1">
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="flex items-center space-x-1 bg-rwanda-blue hover:bg-blue-800">
                      <User className="h-4 w-4" />
                      <span>Register</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-700 hover:text-rwanda-blue"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn("md:hidden", {
          "block": mobileMenuOpen,
          "hidden": !mobileMenuOpen
        })}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-rwanda-blue"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/search"
            className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-rwanda-blue"
            onClick={() => setMobileMenuOpen(false)}
          >
            Find Buses
          </Link>
          <Link
            to="/routes"
            className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-rwanda-blue"
            onClick={() => setMobileMenuOpen(false)}
          >
            Routes
          </Link>
          {isAuthenticated && user?.role === 'admin' && (
            <Link
              to="/admin"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-rwanda-blue"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
          )}
          {isAuthenticated && user?.role === 'operator' && (
            <Link
              to="/operator"
              className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-rwanda-blue"
              onClick={() => setMobileMenuOpen(false)}
            >
              Operator
            </Link>
          )}
          <Link
            to="/support"
            className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-rwanda-blue"
            onClick={() => setMobileMenuOpen(false)}
          >
            Support
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:text-rwanda-blue"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex pt-4 space-x-3">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="flex items-center space-x-1">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="flex items-center space-x-1 bg-rwanda-blue hover:bg-blue-800">
                  <User className="h-4 w-4" />
                  <span>Register</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
