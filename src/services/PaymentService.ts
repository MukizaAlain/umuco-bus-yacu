
import { ApiService } from './ApiService';
import { toast } from "@/hooks/use-toast";

export type PaymentMethod = 'mobile' | 'card';

export interface PaymentDetails {
  phoneNumber?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvc?: string;
  cardholderName?: string;
}

export interface PaymentRequest {
  amount: number;
  method: PaymentMethod;
  details: PaymentDetails;
  bookingInfo: {
    route: string;
    date: string;
    seats: string[];
    busId: number;
  };
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  ticketNumber: string;
  message: string;
}

export const PaymentService = {
  processPayment: async (request: PaymentRequest): Promise<PaymentResponse> => {
    // Validate payment details
    if (request.method === 'mobile' && !request.details.phoneNumber) {
      throw new Error('Phone number is required for mobile money payment');
    }
    
    if (request.method === 'card') {
      if (!request.details.cardNumber || !request.details.expiryDate || !request.details.cvc) {
        throw new Error('Card number, expiry date, and CVC are required for card payment');
      }
    }
    
    // Create booking record first
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id;
    
    if (!userId) {
      throw new Error('User not logged in');
    }
    
    // Create booking via API
    const bookingData = {
      userId,
      route: request.bookingInfo.route,
      date: request.bookingInfo.date,
      seats: request.bookingInfo.seats,
      busId: request.bookingInfo.busId,
      amount: request.amount
    };
    
    const booking = await ApiService.createBooking(bookingData);
    
    // Process payment via API
    const paymentData = {
      bookingId: booking.id,
      amount: request.amount,
      method: request.method,
      details: request.details
    };
    
    try {
      return await ApiService.processPayment(paymentData);
    } catch (error) {
      // Update booking status to failed if payment fails
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Payment process failed. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  },
  
  getBookingsByUserId: (userId: string): Promise<any[]> => {
    return ApiService.getBookingsByUser(userId);
  }
};
