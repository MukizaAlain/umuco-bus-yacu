
import { Shield, Clock, CreditCard, MapPin, UserCheck, BellRing } from 'lucide-react';

const features = [
  {
    icon: <Shield className="h-6 w-6 text-rwanda-blue" />,
    title: 'Safe Travel',
    description: 'All our buses are regularly maintained and driven by professional drivers for your safety.'
  },
  {
    icon: <Clock className="h-6 w-6 text-rwanda-blue" />,
    title: 'Punctual Service',
    description: 'We value your time. Our buses depart and arrive as scheduled.'
  },
  {
    icon: <CreditCard className="h-6 w-6 text-rwanda-blue" />,
    title: 'Easy Payment',
    description: 'Pay online or via mobile money for a seamless booking experience.'
  },
  {
    icon: <MapPin className="h-6 w-6 text-rwanda-blue" />,
    title: 'Wide Network',
    description: 'We connect all major cities and towns across Rwanda.'
  },
  {
    icon: <UserCheck className="h-6 w-6 text-rwanda-blue" />,
    title: 'Comfort',
    description: 'Modern buses with comfortable seating for a pleasant journey.'
  },
  {
    icon: <BellRing className="h-6 w-6 text-rwanda-blue" />,
    title: 'Trip Alerts',
    description: 'Get notified about your upcoming trips, delays or changes.'
  }
];

export default function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Umuco Bus</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the difference with Rwanda's most trusted bus service
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="relative rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center rounded-md bg-blue-50 p-3 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
