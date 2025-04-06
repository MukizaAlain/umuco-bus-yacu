
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CreditCard, Phone, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('mobile');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get selected seats and total from location state, or use defaults
  const { selectedSeats = [], total = 0 } = location.state || {};
  
  const handlePayment = () => {
    if (paymentMethod === 'mobile' && !phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your mobile money phone number",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment successful!",
        description: `Your booking has been confirmed. Ticket number: TK-${Math.floor(100000 + Math.random() * 900000)}`,
      });
      navigate('/dashboard');
    }, 2000);
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
          <Link to="/select-seat/1" className="flex items-center text-rwanda-blue hover:underline mr-4">
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
                <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
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
                        <label className="block text-sm font-medium mb-1">Mobile Money Number</label>
                        <input
                          type="tel"
                          className="w-full p-2 border rounded-md"
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
                        <label className="block text-sm font-medium mb-1">Card Number</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Expiry Date</label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">CVC</label>
                          <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          className="w-full p-2 border rounded-md"
                          placeholder="John Doe"
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
