
import React from 'react';
import { ShieldCheck, Lock, Star, Check, HelpCircle, Phone } from 'lucide-react';

interface SubscriptionGateProps {
  onSubscribe: () => void;
}

const SubscriptionGate: React.FC<SubscriptionGateProps> = ({ onSubscribe }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col items-center">
      
      <div className="flex flex-col md:flex-row gap-12 w-full max-w-5xl items-center md:items-start">
        
        {/* Left Side: Value Prop */}
        <div className="flex-1 space-y-8 py-4">
           <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Unlock Premium Access</h2>
              <p className="text-xl text-gray-500">
                Join 500+ happy tenants in Kawardha who found their home with our premium plan.
              </p>
           </div>
           
           <div className="space-y-6">
              <div className="flex items-start gap-4">
                 <div className="bg-green-100 p-2 rounded-lg text-green-600"><Check size={24} /></div>
                 <div>
                    <h4 className="font-bold text-gray-800 text-lg">Instant Owner Details</h4>
                    <p className="text-gray-500">Get direct mobile numbers of landlords. No hidden brokers.</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Star size={24} /></div>
                 <div>
                    <h4 className="font-bold text-gray-800 text-lg">AI Assistant Access</h4>
                    <p className="text-gray-500">Chat with Saathi AI for rental advice and locality tips.</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><ShieldCheck size={24} /></div>
                 <div>
                    <h4 className="font-bold text-gray-800 text-lg">Money Back Guarantee</h4>
                    <p className="text-gray-500">If you don't find a room in 7 days, get a full refund.</p>
                 </div>
              </div>
           </div>

           <div className="bg-gray-100 rounded-xl p-5 border border-gray-200">
              <p className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                 <HelpCircle size={18} className="text-orange-600" /> Need Help? Contact Admin
              </p>
              <div className="flex items-center gap-3">
                 <div className="bg-white p-2 rounded-full shadow-sm text-green-600">
                    <Phone size={18} />
                 </div>
                 <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Vinay Chandravanshi</p>
                    <p className="text-lg font-bold text-gray-800 tracking-wide">9340303098</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Side: Payment Card */}
        <div className="w-full max-w-md">
           <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden relative">
              <div className="bg-orange-600 p-6 text-white text-center relative overflow-hidden">
                 <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-1">Lifetime Pass</h3>
                    <p className="text-orange-100 text-sm">One time payment. Forever access.</p>
                 </div>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              </div>
              
              <div className="p-8 text-center">
                 <div className="flex justify-center items-end gap-2 mb-6">
                    <span className="text-gray-400 line-through text-xl">₹199</span>
                    <span className="text-5xl font-extrabold text-gray-900">₹49</span>
                 </div>
                 
                 <ul className="text-left space-y-3 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <li className="flex items-center gap-2 text-sm text-gray-600"><Check size={16} className="text-green-500" /> View unlimited phone numbers</li>
                    <li className="flex items-center gap-2 text-sm text-gray-600"><Check size={16} className="text-green-500" /> Verified Listing badge</li>
                    <li className="flex items-center gap-2 text-sm text-gray-600"><Check size={16} className="text-green-500" /> Priority Support from Admin</li>
                 </ul>

                 <button 
                   onClick={onSubscribe}
                   className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-colors shadow-lg flex items-center justify-center gap-2"
                 >
                   <ShieldCheck size={20} /> Pay ₹49 Securely
                 </button>
                 
                 <div className="mt-4 flex justify-center gap-4 opacity-50 grayscale">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-4" />
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default SubscriptionGate;
