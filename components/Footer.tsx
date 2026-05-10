
import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Lock, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-orange-600 p-1.5 rounded-lg text-white">
               <ShieldCheck size={20} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">RoomSaathi</h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-500 mb-6">
            Connecting landlords and tenants globally on a single, secure, and smart platform. 
            No brokers, direct contact.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-orange-500 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-bold mb-6 uppercase text-[10px] tracking-widest text-slate-500">Service Map</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-orange-600"></div> Executive PGs</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-orange-600"></div> Luxury Flats</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-orange-600"></div> Student Units</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-orange-600"></div> Commercial</a></li>
            {onAdminClick && (
              <li>
                <button 
                  onClick={onAdminClick}
                  className="flex items-center gap-2 text-slate-400 hover:text-orange-500 font-bold transition-all mt-4 border border-slate-800 px-4 py-2 rounded-xl"
                >
                  <Lock size={14} /> Protocol Access
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="text-white font-bold mb-6 uppercase text-[10px] tracking-widest text-slate-500">Legal & Ethics</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Protocol</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">User Agreement</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Zero-Brokerage Policy</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Security Guidelines</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h3 className="text-orange-500 font-bold mb-4 uppercase text-xs tracking-widest">HQ Support</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
               <div className="mt-1 text-orange-500"><Phone size={16} /></div>
               <div>
                 <p className="text-white font-bold">9340303098</p>
                 <p className="text-[10px] text-slate-500 font-bold">Mr. Vinay Chandravanshi</p>
               </div>
            </div>
            <div className="flex items-center gap-3">
               <div className="text-orange-500"><MapPin size={16} /></div>
               <p className="text-xs">World Wide Web, Decentralized Hub</p>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-600 gap-4">
        <p>&copy; {new Date().getFullYear()} Room Saathi WWW. All rights reserved.</p>
        <div className="flex items-center gap-1">
           Made with <Heart size={10} className="text-red-500 fill-red-500" /> globally
        </div>
      </div>
    </footer>
  );
};

export default Footer;
