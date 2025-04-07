
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
    // Simulate API delay
    return new Promise((resolve, reject) => {
      // Validate payment details
      if (request.method === 'mobile' && !request.details.phoneNumber) {
        reject(new Error('Phone number is required for mobile money payment'));
        return;
      }
      
      if (request.method === 'card') {
        if (!request.details.cardNumber || !request.details.expiryDate || !request.details.cvc) {
          reject(new Error('Card number, expiry date, and CVC are required for card payment'));
          return;
        }
      }
      
      // In a real implementation, this would make an API call to a payment gateway
      setTimeout(() => {
        // Simulate payment success (95% success rate)
        const isSuccess = Math.random() > 0.05;
        
        if (isSuccess) {
          // Generate random transaction ID and ticket number
          const transactionId = 'TXN' + Math.floor(1000000000 + Math.random() * 9000000000);
          const ticketNumber = 'TK-' + Math.floor(100000 + Math.random() * 900000);
          
          // Store booking in localStorage for customer dashboard
          const user = JSON.parse(localStorage.getItem('user') || '{}');
          if (user && user.id) {
            const bookings = JSON.parse(localStorage.getItem(`bookings_${user.id}`) || '[]');
            
            const newBooking = {
              id: 'b' + Date.now(),
              route: request.bookingInfo.route,
              date: request.bookingInfo.date,
              departureTime: '09:00', // This would come from bus info in real app
              seats: request.bookingInfo.seats,
              status: 'confirmed',
              ticketNumber: ticketNumber,
              amount: request.amount,
              paymentMethod: request.method,
              transactionId: transactionId,
              createdAt: new Date().toISOString()
            };
            
            bookings.push(newBooking);
            localStorage.setItem(`bookings_${user.id}`, JSON.stringify(bookings));
          }
          
          resolve({
            success: true,
            transactionId,
            ticketNumber,
            message: 'Payment successful'
          });
        } else {
          reject(new Error('Payment failed. Please try again.'));
        }
      }, 2000); // Simulate network delay
    });
  },
  
  getBookingsByUserId: (userId: string): Promise<any[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bookings = JSON.parse(localStorage.getItem(`bookings_${userId}`) || '[]');
        resolve(bookings);
      }, 500);
    });
  }
};
