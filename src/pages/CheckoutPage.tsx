
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CreditCard, Phone, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaymentService, type PaymentMethod } from '@/services/PaymentService';
import { useAuth } from '@/contexts/AuthContext';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mobile');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get selected seats and total from location state, or use defaults
  const { 
    selectedSeats = [], 
    total = 0,
    busInfo = {
      route: 'Unknown Route',
      date: '2023-04-10',
      id: 1
    }
  } = location.state || {};
  
  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to complete your booking",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    if (paymentMethod === 'mobile' && !phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your mobile money phone number",
        variant: "destructive"
      });
      return;
    }
    
    if (paymentMethod === 'card' && (!cardNumber || !expiryDate || !cvc || !cardholderName)) {
      toast({
        title: "Card details required",
        description: "Please fill in all card details",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const response = await PaymentService.processPayment({
        amount: total,
        method: paymentMethod,
        details: {
          phoneNumber,
          cardNumber,
          expiryDate,
          cvc,
          cardholderName
        },
        bookingInfo: {
          route: busInfo.route,
          date: busInfo.date,
          seats: selectedSeats,
          busId: busInfo.id
        }
      });
      
      toast({
        title: "Payment successful!",
        description: `Your booking has been confirmed. Ticket number: ${response.ticketNumber}`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Payment failed",
        description: error.message || "There was a problem processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  if (selectedSeats.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">No seats selected</h2>
            <p className="mb-6">You haven't selected any seats for checkout.</p>
            <Link to="/search">
              <Button>Find a Bus</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to={`/select-seat/${busInfo.id}`} className="flex items-center text-rwanda-blue hover:underline mr-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to seat selection
          </Link>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="mobile" className="flex items-center justify-center">
                      <Phone className="mr-2 h-4 w-4" />
                      Mobile Money
                    </TabsTrigger>
                    <TabsTrigger value="card" className="flex items-center justify-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Card Payment
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="mobile">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="phone-number">Mobile Money Number</Label>
                        <Input
                          id="phone-number"
                          type="tel"
                          placeholder="e.g. 078 123 4567"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <p className="text-sm text-gray-500 mt-1">Enter the phone number registered with MTN Mobile Money or Airtel Money</p>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-md text-sm">
                        <p>You will receive a prompt on your phone to confirm the payment.</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="card">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry-date">Expiry Date</Label>
                          <Input
                            id="expiry-date"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="cardholder-name">Cardholder Name</Label>
                        <Input
                          id="cardholder-name"
                          placeholder="John Doe"
                          value={cardholderName}
                          onChange={(e) => setCardholderName(e.target.value)}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Route</h3>
                    <p className="text-gray-600">{busInfo.route}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Selected Seats</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedSeats.map(seat => (
                        <span 
                          key={seat} 
                          className="inline-flex items-center px-2 py-1 bg-blue-50 text-rwanda-blue text-xs rounded"
                        >
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span>Subtotal:</span>
                      <span>RWF {(total - 500).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Booking Fee:</span>
                      <span>RWF 500</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t">
                      <span>Total:</span>
                      <span>RWF {total.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-rwanda-blue hover:bg-blue-800"
                    onClick={handlePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay RWF ${total.toLocaleString()}`
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
