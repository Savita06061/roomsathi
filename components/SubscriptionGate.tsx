
import React from 'react';
import { ShieldCheck, Star, Check, HelpCircle, Phone, Home, Users, CheckCircle2, Award } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface SubscriptionGateProps {
  onSubscribe: () => void;
  language: Language;
  mode?: 'CUSTOMER' | 'OWNER';
}

const SubscriptionGate: React.FC<SubscriptionGateProps> = ({ onSubscribe, language, mode = 'CUSTOMER' }) => {
  const t = translations[language];
  const isOwner = mode === 'OWNER';

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center">
      
      <div className="flex flex-col lg:flex-row gap-16 w-full max-w-6xl items-center lg:items-start">
        
        {/* Left Side: Value Prop */}
        <div className="flex-1 space-y-10 py-4 text-center lg:text-left animate-fade-in">
           <div>
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-orange-100">
                <Award size={14} /> Official Premium
              </div>
              <h2 className="text-5xl font-black text-slate-900 mb-6 leading-[1.1]">
                {isOwner ? t.ownerUnlock : t.unlockPremium}
              </h2>
              <p className="text-xl text-slate-500 font-medium">
                {isOwner ? t.ownerSubDesc : t.premiumSub}
              </p>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5">
                 <div className="bg-orange-600 p-3.5 rounded-2xl text-white shadow-xl shadow-orange-100 flex-shrink-0">
                   {isOwner ? <Users size={24} /> : <CheckCircle2 size={24} />}
                 </div>
                 <div>
                    <h4 className="font-black text-slate-900 text-lg mb-1">
                      {isOwner ? (language === 'HI' ? 'हज़ारों छात्र' : 'Thousands of Students') : t.instantContact}
                    </h4>
                    <p className="text-slate-500 font-medium text-sm">
                      {isOwner ? (language === 'HI' ? 'कवर्धा के छात्र और परिवार हर दिन कमरे खोज रहे हैं।' : 'Kawardha students are searching for rooms every day.') : t.instantContactDesc}
                    </p>
                 </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-5">
                 <div className="bg-slate-900 p-3.5 rounded-2xl text-white shadow-xl shadow-slate-100 flex-shrink-0">
                   {isOwner ? <Home size={24} /> : <Star size={24} />}
                 </div>
                 <div>
                    <h4 className="font-black text-slate-900 text-lg mb-1">
                      {isOwner ? (language === 'HI' ? 'सीधी बुकिंग' : 'Direct Booking') : (language === 'HI' ? 'एआई सहायक' : 'AI Assistant Access')}
                    </h4>
                    <p className="text-slate-500 font-medium text-sm">
                      {isOwner ? (language === 'HI' ? 'बिना किसी कमीशन के सीधे किराएदार से बात करें।' : 'Talk directly to tenants without any commission.') : (language === 'HI' ? 'किराये की सलाह के लिए साथी एआई से चैट करें।' : 'Chat with Saathi AI for rental advice.')}
                    </p>
                 </div>
              </div>
           </div>

           <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 flex flex-col sm:flex-row items-center gap-6">
              <div className="bg-white p-4 rounded-2xl shadow-sm text-green-600 flex-shrink-0">
                 <Phone size={24} />
              </div>
              <div className="text-center sm:text-left">
                 <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Admin Support</p>
                 <p className="text-xl font-black text-slate-800 tracking-tight">9340303098</p>
                 <p className="text-xs text-slate-500 font-bold">Mr. Vinay Chandravanshi</p>
              </div>
           </div>
        </div>

        {/* Right Side: Premium Card */}
        <div className="w-full max-w-md animate-fade-in delay-200">
           <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden relative transform hover:scale-[1.02] transition-transform">
              <div className="bg-slate-900 p-10 text-white text-center relative overflow-hidden">
                 <div className="relative z-10">
                    <div className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-4">Official Lifetime</div>
                    <h3 className="text-3xl font-black mb-2">{language === 'HI' ? 'लाइफटाइम पास' : 'Lifetime Pass'}</h3>
                    <p className="text-slate-400 text-sm font-medium">{language === 'HI' ? 'एक बार भुगतान, हमेशा के लिए।' : 'One time payment. Forever access.'}</p>
                 </div>
                 {/* Design Ornaments */}
                 <div className="absolute top-0 right-0 w-40 h-40 bg-orange-600/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                 <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-600/10 rounded-full -ml-10 -mb-10 blur-2xl"></div>
              </div>
              
              <div className="p-10 text-center">
                 <div className="flex justify-center items-end gap-3 mb-10">
                    <span className="text-slate-300 line-through text-2xl font-bold">₹{isOwner ? '199' : '499'}</span>
                    <span className="text-7xl font-black text-slate-900 tracking-tighter">₹{isOwner ? '49' : '199'}</span>
                 </div>
                 
                 <div className="space-y-4 mb-10">
                    {[
                      isOwner ? (language === 'HI' ? 'अनलिमिटेड रूम लिस्ट करें' : 'List unlimited rooms') : (language === 'HI' ? 'अनलिमिटेड नंबर देखें' : 'View unlimited phone numbers'),
                      'Official Verification Badge',
                      'Priority Support 24/7',
                      'No Monthly Renewal'
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                        <div className="bg-green-100 p-1 rounded-full text-green-600"><Check size={14} /></div>
                        {item}
                      </div>
                    ))}
                 </div>

                 <button 
                   onClick={onSubscribe}
                   className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-orange-700 transition-all shadow-xl shadow-orange-100 flex items-center justify-center gap-3 transform active:scale-95"
                 >
                   <ShieldCheck size={24} /> {isOwner ? t.ownerPayNow : t.payNow}
                 </button>
                 
                 <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col items-center gap-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Secure Payment via UPI</p>
                    <div className="flex justify-center gap-6 grayscale opacity-40">
                       <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4" />
                    </div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default SubscriptionGate;
