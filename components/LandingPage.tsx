
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
      
      {/* Friendly Navigation */}
      <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="bg-orange-600 p-2 rounded-xl text-white shadow-lg shadow-orange-200">
              <Home size={24} />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight">Room<span className="text-orange-600">Saathi</span></span>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-6">
            <button 
              onClick={() => onNavigate('ADMIN')}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200"
            >
              <Lock size={14} className="text-slate-500" />
              <span>{t.adminPortal}</span>
            </button>

            <button 
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-xl text-xs font-bold text-gray-700 transition-all border border-gray-200"
            >
              <Languages size={16} className="text-orange-600" />
              <span>{lang === 'EN' ? 'हिन्दी' : 'English'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Friendly & Practical */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-orange-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-700 px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-8">
              <CheckCircle2 size={16} /> {t.officialPartner}
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-8">
              {lang === 'HI' ? (
                <>कवर्धा में <span className="text-orange-600">अपना कमरा</span> ढूँढें अब मिनटों में।</>
              ) : (
                <>Find Your <span className="text-orange-600">Perfect Room</span> in Kawardha.</>
              )}
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => onNavigate('CUSTOMER')}
                className="group bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-700 shadow-xl shadow-orange-200 transition-all flex items-center justify-center gap-3"
              >
                {t.findRoom} <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                 onClick={() => onNavigate('OWNER')}
                 className="bg-white text-slate-800 border-2 border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:border-orange-600 hover:text-orange-600 transition-all"
              >
                {t.listProperty}
              </button>
            </div>
          </div>

          <div className="flex-1 w-full lg:w-auto">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-4">
                    <ShieldCheck size={24} />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1">100% Safe</h4>
                  <p className="text-xs text-slate-500">Verified by ground team.</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 translate-y-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4">
                    <Users size={24} />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1">No Broker</h4>
                  <p className="text-xs text-slate-500">Directly talk to owners.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Localities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-12">{lang === 'HI' ? 'प्रमुख इलाके' : 'Top Localities'}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Ram Nagar', 'Siksha Colony', 'Raj Mahal Chowk', 'Kailash Nagar'].map((loc) => (
              <div key={loc} onClick={() => onNavigate('CUSTOMER')} className="px-6 py-4 bg-orange-50 border border-orange-100 rounded-2xl font-bold text-orange-700 cursor-pointer hover:bg-orange-600 hover:text-white transition-all shadow-sm">
                <MapPin size={18} className="inline mr-2" /> {loc}
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
