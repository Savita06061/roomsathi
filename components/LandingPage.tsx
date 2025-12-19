
import React, { useState } from 'react';
import { Search, Home, ShieldCheck, Key, ArrowRight, Star, Users, Languages, CheckCircle2, Building2, MapPin, Lock } from 'lucide-react';
import { ViewState, Language } from '../types';
import { translations } from '../translations';
import Footer from './Footer';

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [lang, setLang] = useState<Language>('HI');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900">
      
      {/* Premium Navigation */}
      <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-xl text-white shadow-lg shadow-orange-200">
              <Home size={24} />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">Room<span className="text-orange-600">Saathi</span></span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-6">
            <button 
              onClick={() => onNavigate('ADMIN')}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200"
              title="Admin Access"
            >
              <Lock size={14} className="text-slate-500" />
              <span>{t.adminPortal}</span>
            </button>

            <button 
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 transition-all border border-gray-200"
            >
              <Languages size={16} className="text-orange-600" />
              <span className="hidden sm:inline">{lang === 'EN' ? 'हिन्दी' : 'English'}</span>
              <span className="sm:hidden">{lang === 'EN' ? 'HI' : 'EN'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Official Look */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-700 px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-8 shadow-sm">
              <CheckCircle2 size={16} /> {t.officialPartner}
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tight">
              {lang === 'HI' ? (
                <>कवर्धा में <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">अपना कमरा</span> ढूँढें अब मिनटों में।</>
              ) : (
                <>Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Perfect Room</span> in Kawardha.</>
              )}
            </h1>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <button 
                onClick={() => onNavigate('CUSTOMER')}
                className="group bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-orange-600 shadow-2xl shadow-slate-200 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
              >
                {t.findRoom} <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                 onClick={() => onNavigate('OWNER')}
                 className="bg-white text-slate-900 border-2 border-slate-200 px-10 py-5 rounded-2xl font-bold text-xl hover:border-orange-600 hover:text-orange-600 transition-all shadow-sm"
              >
                {t.listProperty}
              </button>
            </div>
            
            {/* Stats */}
            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 sm:gap-12 grayscale opacity-70">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-black text-slate-800 tracking-tight">5,000+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Happy Users</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-black text-slate-800 tracking-tight">1,200+</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Verified Rooms</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-black text-slate-800 tracking-tight">24h</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fast Support</div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full lg:w-auto animate-fade-in delay-200">
            <div className="relative">
              {/* Feature Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 transform -rotate-2 hover:rotate-0 transition-transform">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-4 shadow-inner">
                    <ShieldCheck size={24} />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1">100% Safe</h4>
                  <p className="text-xs text-slate-500">Verified by ground team.</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 transform rotate-2 hover:rotate-0 transition-transform translate-y-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4 shadow-inner">
                    <Users size={24} />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1">No Broker</h4>
                  <p className="text-xs text-slate-500">Directly talk to owners.</p>
                </div>
                <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl col-span-2 mt-8 flex items-center justify-between group cursor-pointer hover:bg-orange-600 transition-all" onClick={() => onNavigate('CUSTOMER')}>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                       <Star className="text-orange-400 fill-orange-400" size={16} />
                       <span className="text-xs font-bold uppercase tracking-widest text-orange-200">Premium Choice</span>
                    </div>
                    <h3 className="text-2xl font-black">Browse Collections</h3>
                    <p className="text-slate-400 group-hover:text-white/80 transition-colors">Find best rooms in Ram Nagar & Siksha Colony</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                    <Building2 size={32} />
                  </div>
                </div>
              </div>
              
              {/* Trust Badge Decoration */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden sm:block animate-bounce duration-[3000ms]">
                <div className="flex items-center gap-2">
                   <div className="bg-green-100 p-2 rounded-lg text-green-600"><CheckCircle2 size={20} /></div>
                   <div className="text-left">
                      <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Status</p>
                      <p className="text-sm font-black text-slate-800">Verified App</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - Official Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">{lang === 'HI' ? 'यह कैसे काम करता है?' : 'How It Works?'}</h2>
            <div className="w-20 h-1.5 bg-orange-600 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">
              We've simplified the rental process in Kawardha to just three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-slate-200 -z-0"></div>
            
            {[
              { 
                icon: <Search size={28} />, 
                title: lang === 'HI' ? 'रूम खोजें' : 'Discover', 
                desc: lang === 'HI' ? 'अपने बजट के अनुसार फ़िल्टर करें।' : 'Filter by price and locality.',
                color: 'bg-orange-500'
              },
              { 
                icon: <ShieldCheck size={28} />, 
                title: lang === 'HI' ? 'विवरण देखें' : 'Verify Details', 
                desc: lang === 'HI' ? 'असली तस्वीरें और सुविधाएं जांचें।' : 'Check real photos and amenities.',
                color: 'bg-blue-600'
              },
              { 
                icon: <Key size={28} />, 
                title: lang === 'HI' ? 'सीधे बात करें' : 'Get Keys', 
                desc: lang === 'HI' ? 'मालिक से संपर्क करें और रूम लें।' : 'Contact owner and move in.',
                color: 'bg-green-600'
              }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                <div className={`${step.color} w-20 h-20 rounded-[2rem] flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform mb-8 ring-8 ring-white`}>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-3">{step.title}</h3>
                <p className="text-slate-500 font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-10">Trusted Local Locations</p>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16 opacity-40 hover:opacity-100 transition-opacity">
            {['RAM NAGAR', 'SIKSHA COLONY', 'RAJ MAHAL CHOWK', 'KAILASH NAGAR'].map(loc => (
              <div key={loc} className="flex items-center gap-2 font-black text-slate-800 text-lg">
                <MapPin size={20} /> {loc}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer onAdminClick={() => onNavigate('ADMIN')} />
    </div>
  );
};

export default LandingPage;
