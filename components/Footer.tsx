
import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold text-white mb-4">Kawardha Room Saathi</h2>
          <p className="text-sm text-gray-400 mb-6">
            Connecting Kawardha's landlords and tenants on a single, secure, and smart platform. 
            Trusted by 1000+ locals.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-500 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Post a Room</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Find a PG</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Rental Agreement</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Premium Support</a></li>
          </ul>
        </div>

        {/* Official Contact (Admin) */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-orange-500 font-bold mb-4 uppercase text-xs tracking-wider">Official Support</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
               <div className="mt-1 text-orange-500"><Phone size={16} /></div>
               <div>
                 <p className="text-xs text-gray-400">Helpline & Admin</p>
                 <p className="text-white font-bold">9340303098</p>
                 <p className="text-xs text-gray-500">Mr. Vinay Chandravanshi</p>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="text-orange-500"><MapPin size={16} /></div>
               <p className="text-sm">Main Market, Kawardha (C.G.)</p>
            </div>
            <div className="flex items-center gap-3">
               <div className="text-orange-500"><Mail size={16} /></div>
               <p className="text-sm">support@roomsaathi.com</p>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Kawardha Room Saathi Pvt Ltd. All rights reserved.</p>
        <p className="mt-1">Designed & Managed by Vinay Chandravanshi.</p>
      </div>
    </footer>
  );
};

export default Footer;
