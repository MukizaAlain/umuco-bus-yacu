
import { Button } from '@/components/ui/button';
import { Phone, Mail } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-16 bg-gradient-to-r from-rwanda-blue to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold">Ready to Travel with Umuco Bus?</h2>
            <p className="mt-4 text-blue-100 max-w-lg">
              Join thousands of satisfied passengers who travel safely and comfortably across Rwanda. Book your next journey today!
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-white text-rwanda-blue hover:bg-gray-100"
              >
                Book Now
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-blue-700"
              >
                Download App
              </Button>
            </div>
          </div>
          
          <div className="bg-blue-700 rounded-lg p-6 lg:ml-auto">
            <h3 className="text-xl font-semibold mb-4">Need Assistance?</h3>
            <p className="text-blue-100 mb-6">
              Our customer support team is available to help you with any questions or issues you may have.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-full">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-blue-100">Call us at</p>
                  <p className="font-medium">+250 788 123 456</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-full">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-blue-100">Email us at</p>
                  <p className="font-medium">support@umucobus.rw</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
