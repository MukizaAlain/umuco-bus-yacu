
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Mail, Phone, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function SupportPage() {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Message sent',
        description: 'We\'ll get back to you as soon as possible.',
      });
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get help with your bookings, find answers to frequently asked questions, or contact our support team.
          </p>
        </div>

        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faq" className="flex items-center justify-center">
              <HelpCircle className="mr-2 h-4 w-4" />
              FAQs
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center justify-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Contact Us
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center justify-center">
              <Phone className="mr-2 h-4 w-4" />
              Contact Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I book a bus ticket?</AccordionTrigger>
                    <AccordionContent>
                      To book a bus ticket, go to the "Find Buses" page, enter your departure and destination locations, 
                      select your travel date, and click "Search." Choose your preferred bus from the search results, 
                      select your seat(s), and proceed to checkout.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I cancel my booking?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can cancel your booking up to 24 hours before the scheduled departure time. 
                      Go to your dashboard, find the booking you want to cancel, and click the "Cancel Booking" button. 
                      Refunds will be processed according to our refund policy.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How can I change my travel date?</AccordionTrigger>
                    <AccordionContent>
                      To change your travel date, you need to cancel your current booking (if eligible for cancellation) 
                      and make a new booking for your preferred date. Please note that fare differences may apply.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
                    <AccordionContent>
                      We accept various payment methods including credit/debit cards, mobile money (MTN Mobile Money, 
                      Airtel Money), and bank transfers. All payments are processed securely.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How much luggage can I bring?</AccordionTrigger>
                    <AccordionContent>
                      Each passenger is allowed one piece of luggage up to 20kg and one carry-on bag. Additional or 
                      overweight luggage may incur extra charges. Please contact the bus operator directly for specific 
                      luggage policies.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Our Support Team</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                      <Input 
                        id="name" 
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Enter your name" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="Enter your email" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea 
                      id="message" 
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Describe your issue or question" 
                      rows={6} 
                      required 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto bg-rwanda-blue hover:bg-blue-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Mail className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center p-6 border rounded-lg">
                    <Phone className="h-10 w-10 text-rwanda-blue mb-4" />
                    <h3 className="text-lg font-medium mb-2">Phone Support</h3>
                    <p className="text-center text-gray-600 mb-2">Available 24/7 for urgent issues</p>
                    <p className="font-semibold">+250 788 123 456</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-6 border rounded-lg">
                    <Mail className="h-10 w-10 text-rwanda-blue mb-4" />
                    <h3 className="text-lg font-medium mb-2">Email Support</h3>
                    <p className="text-center text-gray-600 mb-2">We'll respond within 24 hours</p>
                    <p className="font-semibold">support@umucobus.rw</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-6 border rounded-lg">
                    <MessageSquare className="h-10 w-10 text-rwanda-blue mb-4" />
                    <h3 className="text-lg font-medium mb-2">Live Chat</h3>
                    <p className="text-center text-gray-600 mb-2">Available 8am-8pm daily</p>
                    <Button className="mt-2 bg-rwanda-blue hover:bg-blue-800">Start Chat</Button>
                  </div>
                </div>

                <div className="mt-8 border-t pt-8">
                  <h3 className="text-lg font-medium mb-4">Main Office</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Kigali Office:</p>
                      <p>KN 5 Rd, Kigali, Rwanda</p>
                      <p>Nyabugogo Bus Terminal</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Office Hours:</p>
                      <p>Monday-Friday: 8am - 6pm</p>
                      <p>Saturday: 9am - 5pm</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
