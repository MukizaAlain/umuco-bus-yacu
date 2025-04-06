
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="imigongo-divider w-full"></div>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img 
              src="/images/logo.svg" 
              alt="Umuco Bus Logo" 
              className="h-10 mb-4" 
            />
            <p className="text-sm text-gray-600 mb-4">
              Reliable, comfortable and safe bus transportation across Rwanda.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-rwanda-blue hover:text-rwanda-yellow transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-rwanda-blue hover:text-rwanda-yellow transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-rwanda-blue hover:text-rwanda-yellow transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-rwanda-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-sm text-gray-600 hover:text-rwanda-blue transition-colors">
                  Find Buses
                </Link>
              </li>
              <li>
                <Link to="/routes" className="text-sm text-gray-600 hover:text-rwanda-blue transition-colors">
                  Popular Routes
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-rwanda-blue transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-rwanda-blue transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-rwanda-blue transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-rwanda-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-rwanda-blue transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-rwanda-blue" />
                <span className="text-sm text-gray-600">+250 788 123 456</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-rwanda-blue" />
                <span className="text-sm text-gray-600">info@umucobus.rw</span>
              </li>
              <li className="text-sm text-gray-600 mt-2">
                KN 5 Rd, Kigali, Rwanda
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Umuco Bus. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button className="text-sm text-gray-600 hover:text-rwanda-blue transition-colors">
              English
            </button>
            <button className="text-sm text-gray-600 hover:text-rwanda-blue transition-colors">
              Kinyarwanda
            </button>
            <button className="text-sm text-gray-600 hover:text-rwanda-blue transition-colors">
              Français
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
