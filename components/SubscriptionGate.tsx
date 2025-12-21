
import React from 'react';
import { ShieldCheck, Star, Check, HelpCircle, Phone, Home, Users, CheckCircle2, Award, Sparkles, Zap } from 'lucide-react';
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
    <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center">
      
      <div className="flex flex-col lg:flex-row gap-24 w-full max-w-6xl items-center lg:items-start relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-100/50 rounded-full blur-[100px] -ml-32 -mt-32"></div>
        
        {/* Left Side: Value Prop */}
        <div className="flex-1 space-y-12 py-4 text-center lg:text-left animate-fade-in relative z-10">
           <div>
              <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-orange-100 shadow-sm">
                <Award size={14} /> Official Premium Pass
              </div>
              <h2 className="text-6xl font-black text-slate-900 mb-8 leading-[1.05] tracking-tighter">
                {isOwner ? t.ownerUnlock : t.unlockPremium}
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
                {isOwner ? t.ownerSubDesc : t.premiumSub}
              </p>
           </div>
           
           <div className="space-y-10">
              {[
                { 
                  title: isOwner ? 'Reach 5k+ Students' : 'Direct Owner Access', 
                  desc: isOwner ? 'Your property visible to everyone seeking rooms.' : 'Get direct mobile numbers. No brokers, no hidden fees.',
                  icon: <Zap className="text-orange-600" />
                },
                { 
                  title: isOwner ? 'Zero Commission' : 'AI Local Guide', 
                  desc: isOwner ? 'Keep 100% of your rent money for yourself.' : 'Ask Saathi AI about safe areas and average market rents.',
                  icon: <Sparkles className="text-blue-600" />
                }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col lg:flex-row items-center lg:items-start gap-6 group">
                   <div className="bg-white p-5 rounded-[1.5rem] shadow-xl group-hover:scale-110 transition-transform flex-shrink-0 border border-slate-50">
                     {item.icon}
                   </div>
                   <div>
                      <h4 className="font-black text-slate-900 text-xl mb-2">{item.title}</h4>
                      <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-md">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>

           <div className="bg-slate-900 rounded-[2.5rem] p-10 flex flex-col sm:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-xl"></div>
              <div className="bg-white/10 p-5 rounded-2xl text-orange-500 backdrop-blur-md">
                 <Phone size={28} />
              </div>
              <div className="text-center sm:text-left relative z-10">
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2">Support Helpline</p>
                 <p className="text-2xl font-black text-white tracking-tight leading-none mb-1">+91 9340303098</p>
                 <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Office of Vinay Chandravanshi</p>
              </div>
           </div>
        </div>

        {/* Right Side: High-End Pricing Card */}
        <div className="w-full max-w-md animate-fade-in delay-200 relative">
           <div className="absolute -inset-4 bg-gradient-to-br from-orange-600 to-red-600 rounded-[3.5rem] blur-2xl opacity-20 animate-pulse"></div>
           <div className="bg-white rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden relative transition-transform hover:scale-[1.01]">
              <div className="bg-slate-900 p-12 text-white text-center relative overflow-hidden">
                 <div className="relative z-10">
                    <div className="bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-full inline-block mb-6 shadow-xl border border-white/10">Official Life-Pass</div>
                    <h3 className="text-4xl font-black mb-2 tracking-tight">{language === 'HI' ? 'लाइफटाइम एक्सेस' : 'Full Lifetime Access'}</h3>
                    <p className="text-slate-400 text-sm font-medium">No renewals. One-time payment.</p>
                 </div>
                 <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              </div>
              
              <div className="p-12 text-center">
                 <div className="flex justify-center items-end gap-3 mb-12">
                    <span className="text-slate-300 line-through text-2xl font-bold opacity-50 mb-2">₹{isOwner ? '199' : '499'}</span>
                    <div className="flex flex-col items-center leading-none">
                      <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">Limited Offer</span>
                      <span className="text-8xl font-black text-slate-900 tracking-tighter">₹{isOwner ? '49' : '199'}</span>
                    </div>
                 </div>
                 
                 <div className="space-y-5 mb-12">
                    {[
                      isOwner ? 'Unlimited property listings' : 'View all mobile numbers',
                      'Direct owner-to-tenant chat',
                      'Official Verification badge',
                      '24/7 Admin call support'
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 text-slate-600 font-bold text-sm">
                        <div className="bg-green-100 p-1 rounded-full text-green-600 shadow-sm"><Check size={14} /></div>
                        {item}
                      </div>
                    ))}
                 </div>

                 <button 
                   onClick={onSubscribe}
                   className="w-full bg-orange-600 text-white py-6 rounded-[2rem] font-black text-2xl hover:bg-orange-700 transition-all shadow-[0_20px_40px_-5px_rgba(234,88,12,0.4)] flex items-center justify-center gap-4 active:scale-95 transform"
                 >
                   <ShieldCheck size={28} /> {isOwner ? 'Verify & Post' : 'Pay & Unlock'}
                 </button>
                 
                 <div className="mt-10 pt-10 border-t border-slate-50 flex flex-col items-center gap-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Secure UPI Gateway</p>
                    <div className="flex justify-center gap-8 grayscale opacity-30">
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
