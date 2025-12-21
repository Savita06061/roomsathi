
import React, { useState } from 'react';
import { Home, Languages, ArrowRight, ShieldCheck, Users, MapPin, Lock, LogIn, Building, Settings, CheckCircle2, PhoneCall, Sparkles, Map, HeartHandshake, Zap } from 'lucide-react';
import { ViewState, Language, User } from '../types';
import { translations } from '../translations';
import Footer from './Footer';

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
  onLoginCustomer: () => void;
  onLoginOwner: () => void;
  onLoginAdmin: () => void;
  user: User | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onLoginCustomer, onLoginOwner, onLoginAdmin, user }) => {
  const [lang, setLang] = useState<Language>('HI');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
      
      {/* Dynamic Glass Navigation */}
      <nav className="fixed w-full z-50 top-0 bg-white/70 backdrop-blur-xl border-b border-gray-100 py-5 transition-all">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-orange-600 p-2.5 rounded-2xl text-white shadow-xl transition-transform group-hover:rotate-6">
              <Home size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 tracking-tight leading-none">Room<span className="text-orange-600">Saathi</span></span>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] mt-1">Kawardha City</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onLoginAdmin}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all border border-slate-700 shadow-xl"
            >
              <Settings size={14} className="text-orange-500" />
              <span>{lang === 'HI' ? 'एडमिन पोर्टल' : 'Admin Hub'}</span>
            </button>

            <button 
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
              className="px-5 py-2.5 hover:bg-slate-50 rounded-2xl text-[10px] font-black text-slate-900 border-2 border-slate-100 flex items-center gap-2 transition-all"
            >
              <Languages size={14} className="text-orange-600" />
              {lang === 'EN' ? 'हिन्दी' : 'EN'}
            </button>
          </div>
        </div>
      </nav>

      {/* Modern Hero Section */}
      <section className="relative pt-44 pb-32 overflow-hidden bg-gradient-to-br from-orange-50/50 via-white to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 text-center lg:text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-200 text-orange-700 px-5 py-2.5 rounded-full text-xs font-black mb-10 shadow-sm">
                <Sparkles size={16} className="text-orange-500" /> Trusted by 5,000+ Students
              </div>
              <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.95] mb-10 tracking-tighter">
                {lang === 'HI' ? <>कवर्धा का <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">स्मार्ट रूम</span> नेटवर्क</> : <>Kawardha's <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Smart Room</span> Network</>}
              </h1>
              <p className="text-xl text-slate-500 font-medium mb-12 max-w-xl leading-relaxed">
                Connect directly with property owners in Kawardha. Verified listings, zero brokerage, and instant secure access.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto lg:mx-0">
                {/* Tenant Entry */}
                <button 
                  onClick={onLoginCustomer}
                  className="group relative bg-orange-600 text-white p-10 rounded-[2.5rem] text-left transition-all hover:scale-[1.03] active:scale-95 shadow-[0_20px_50px_rgba(234,88,12,0.3)] overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="bg-white/20 p-3 w-fit rounded-2xl mb-8 group-hover:scale-110 transition-transform">
                      <Zap size={32} />
                    </div>
                    <h3 className="text-3xl font-black mb-1 tracking-tight">{lang === 'HI' ? 'किरायेदार' : 'I Need a Room'}</h3>
                    <p className="text-orange-100 text-sm font-bold opacity-80 uppercase tracking-widest">Premium Lifetime Access</p>
                  </div>
                  <div className="absolute -right-8 -bottom-8 bg-white/5 w-48 h-48 rounded-full blur-2xl"></div>
                </button>

                {/* Owner Entry */}
                <button 
                  onClick={onLoginOwner}
                  className="group relative bg-slate-900 text-white p-10 rounded-[2.5rem] text-left transition-all hover:scale-[1.03] active:scale-95 shadow-[0_20px_50px_rgba(15,23,42,0.3)] overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className="bg-white/10 p-3 w-fit rounded-2xl mb-8 group-hover:scale-110 transition-transform">
                      <Building size={32} />
                    </div>
                    <h3 className="text-3xl font-black mb-1 tracking-tight">{lang === 'HI' ? 'मकान मालिक' : 'List My Property'}</h3>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Verify & Post Listing</p>
                  </div>
                  <div className="absolute -right-8 -bottom-8 bg-white/5 w-48 h-48 rounded-full blur-2xl"></div>
                </button>
              </div>
            </div>

            {/* Visual Social Proof Area */}
            <div className="flex-1 w-full grid grid-cols-2 gap-6 relative">
               <div className="absolute inset-0 bg-orange-600/5 blur-[120px] rounded-full"></div>
               <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-white flex flex-col justify-center animate-fade-in delay-100">
                  <div className="bg-blue-100 text-blue-600 p-4 w-fit rounded-2xl mb-6"><Users size={32} /></div>
                  <h4 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">5.2k+</h4>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Kawardha Seekers</p>
               </div>
               <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-white translate-y-12 animate-fade-in delay-200">
                  <div className="bg-orange-100 text-orange-600 p-4 w-fit rounded-2xl mb-6"><MapPin size={32} /></div>
                  <h4 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">12+</h4>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Verified Sectors</p>
               </div>
               <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-white flex flex-col justify-center animate-fade-in delay-300">
                  <div className="bg-green-100 text-green-600 p-4 w-fit rounded-2xl mb-6"><CheckCircle2 size={32} /></div>
                  <h4 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">0%</h4>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Brokerage Fee</p>
               </div>
               <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl translate-y-12 animate-fade-in delay-500">
                  <div className="bg-white/10 p-4 w-fit rounded-2xl mb-6 text-orange-500"><ShieldCheck size={32} /></div>
                  <h4 className="text-2xl font-black text-white leading-tight mb-2">Verified System</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Kawardha Saathi Approved</p>
               </div>
            </div>
          </div>
        </div>
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-100/30 rounded-full blur-[120px] -mr-96 -mt-96"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[100px] -ml-64 -mb-64"></div>
      </section>

      {/* Information / How it works Section */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">How RoomSaathi Works</h2>
            <p className="text-slate-500 font-medium text-lg">We've simplified the rental process in Kawardha to just three easy steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                step: "01", 
                title: "Explore Listings", 
                desc: "Browse verified single rooms, family flats, and girls PGs in Kawardha's best localities like Siksha Colony.", 
                icon: <Map className="text-orange-600" size={32} /> 
              },
              { 
                step: "02", 
                title: "Unlock Details", 
                desc: "Join our premium network to instantly see owner contact numbers and exact map locations without brokers.", 
                icon: <Lock className="text-slate-900" size={32} /> 
              },
              { 
                step: "03", 
                title: "Direct Move-in", 
                desc: "Call the owner directly, visit the room, and finalize your stay. No hidden charges or monthly commissions.", 
                icon: <HeartHandshake className="text-green-600" size={32} /> 
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 hover:translate-y-[-10px] transition-all group">
                <div className="flex justify-between items-start mb-8">
                  <div className="bg-slate-50 p-5 rounded-2xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-5xl font-black text-slate-100 group-hover:text-orange-100 transition-colors">{item.step}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Support Bar */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-6">
            <div className="bg-green-100 p-5 rounded-3xl text-green-600 shadow-lg"><PhoneCall size={32} /></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Direct Assistance</p>
              <h4 className="text-2xl font-black text-slate-900">Need help? Call Vinay</h4>
              <p className="text-orange-600 font-bold text-lg">+91 9340303098</p>
            </div>
          </div>
          <div className="h-px w-full md:w-px md:h-20 bg-slate-100"></div>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            <div className="flex items-center gap-2 font-black text-xl text-slate-900"><ShieldCheck /> Secured</div>
            <div className="flex items-center gap-2 font-black text-xl text-slate-900"><MapPin /> Kawardha</div>
            <div className="flex items-center gap-2 font-black text-xl text-slate-900"><Users /> Community</div>
          </div>
        </div>
      </section>

      <Footer onAdminClick={onLoginAdmin} />
    </div>
  );
};

export default LandingPage;
