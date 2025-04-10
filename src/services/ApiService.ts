
import { toast } from "@/hooks/use-toast";

// This is a mock implementation that simulates API calls
// Replace these functions with actual API calls when you integrate with Spring Boot

// Base URL would point to your actual backend in production
const API_BASE_URL = 'http://localhost:8080/api';

// Helper function to handle API responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.message || `Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response.json();
}

// Function to handle API errors
function handleError(error: any) {
  console.error('API Error:', error);
  const message = error.message || 'An unexpected error occurred';
  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });
  throw error;
}

export const ApiService = {
  // Auth endpoints
  login: async (email: string, password: string) => {
    try {
      // Mock implementation - replace with actual API call
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = storedUsers.find((u: any) => u.email === email);
      
      if (!user || user.password !== password) {
        throw new Error('Invalid credentials');
      }
      
      // Simulate JWT token generation
      const token = `mock-jwt-token-${Date.now()}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { user, token };
    } catch (error) {
      return handleError(error);
    }
  },
  
  register: async (userData: any) => {
    try {
      // Mock implementation - replace with actual API call
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      if (storedUsers.some((u: any) => u.email === userData.email)) {
        throw new Error('Email already registered');
      }
      
      const newUser = {
        id: `user-${Date.now()}`,
        ...userData,
        role: userData.role || 'CUSTOMER',
        createdAt: new Date().toISOString()
      };
      
      storedUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));
      
      return newUser;
    } catch (error) {
      return handleError(error);
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Bus endpoints
  getBuses: async (filters = {}) => {
    try {
      // Mock implementation - replace with actual API call
      return JSON.parse(localStorage.getItem('buses') || '[]');
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Routes endpoints
  getRoutes: async () => {
    try {
      // Mock implementation - replace with actual API call
      return JSON.parse(localStorage.getItem('routes') || '[]');
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Trips endpoints
  getTrips: async (filters: any = {}) => {
    try {
      // Mock implementation - replace with actual API call
      const trips = JSON.parse(localStorage.getItem('trips') || '[]');
      
      // Apply filters
      return trips.filter((trip: any) => {
        let match = true;
        if (filters.route) match = match && trip.route === filters.route;
        if (filters.date) match = match && trip.date === filters.date;
        if (filters.operator) match = match && trip.operator === filters.operator;
        return match;
      });
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Bookings endpoints
  createBooking: async (bookingData: any) => {
    try {
      // Mock implementation - replace with actual API call
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      
      const newBooking = {
        id: `booking-${Date.now()}`,
        ...bookingData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      bookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(bookings));
      
      return newBooking;
    } catch (error) {
      return handleError(error);
    }
  },
  
  getBookingsByUser: async (userId: string) => {
    try {
      // Mock implementation - replace with actual API call
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      return bookings.filter((booking: any) => booking.userId === userId);
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Payments endpoints
  processPayment: async (paymentData: any) => {
    try {
      // Mock implementation - replace with actual API call
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate 95% success rate
      const isSuccess = Math.random() > 0.05;
      
      if (!isSuccess) {
        throw new Error('Payment failed. Please try again.');
      }
      
      const transactionId = 'TXN' + Math.floor(1000000000 + Math.random() * 9000000000);
      const ticketNumber = 'TK-' + Math.floor(100000 + Math.random() * 900000);
      
      // Store payment in localStorage
      const payments = JSON.parse(localStorage.getItem('payments') || '[]');
      const newPayment = {
        id: `payment-${Date.now()}`,
        ...paymentData,
        transactionId,
        ticketNumber,
        status: 'completed',
        createdAt: new Date().toISOString()
      };
      
      payments.push(newPayment);
      localStorage.setItem('payments', JSON.stringify(payments));
      
      // Update booking status
      if (paymentData.bookingId) {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const bookingIndex = bookings.findIndex((b: any) => b.id === paymentData.bookingId);
        
        if (bookingIndex !== -1) {
          bookings[bookingIndex].status = 'confirmed';
          bookings[bookingIndex].ticketNumber = ticketNumber;
          localStorage.setItem('bookings', JSON.stringify(bookings));
        }
      }
      
      return {
        success: true,
        transactionId,
        ticketNumber,
        message: 'Payment successful'
      };
    } catch (error) {
      return handleError(error);
    }
  }
};
