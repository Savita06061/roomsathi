
import React from 'react';
import { Search, Home, ShieldCheck, Key, ArrowRight, Star, Users } from 'lucide-react';
import { ViewState } from '../types';
import Footer from './Footer';

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      
      {/* Navigation (Transparent) */}
      <nav className="absolute w-full z-10 top-0 py-6">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-orange-600 p-1.5 rounded-lg text-white">
              <Home size={20} />
            </div>
            <span className="text-2xl font-extrabold text-gray-900">Room<span className="text-orange-600">Saathi</span></span>
          </div>
          <button className="text-sm font-semibold text-gray-600 hover:text-orange-600">Contact Support</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 via-white to-blue-50 pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left animate-in slide-in-from-bottom-10 fade-in duration-700">
            <div className="inline-block bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              Official Rental Partner of Kawardha
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Find your <span className="text-orange-600">perfect room</span> without the hassle.
            </h1>
            <p className="text-xl text-gray-500 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
              Join thousands of students and families in Kawardha who use Room Saathi to find verified PGs, flats, and homes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => onNavigate('CUSTOMER')}
                className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-700 shadow-lg hover:shadow-orange-200 transition-all flex items-center justify-center gap-2"
              >
                Find a Room <ArrowRight size={20} />
              </button>
              <button 
                 onClick={() => onNavigate('OWNER')}
                 className="bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-orange-600 hover:text-orange-600 transition-all"
              >
                List Property
              </button>
            </div>
            
            <div className="mt-8 flex items-center justify-center md:justify-start gap-6 text-sm text-gray-500 font-medium">
              <span className="flex items-center gap-1"><Star size={16} className="text-yellow-500 fill-yellow-500" /> 4.9/5 Rating</span>
              <span className="flex items-center gap-1"><Users size={16} className="text-blue-500" /> 2k+ Users</span>
            </div>
          </div>

          {/* Login Cards / Visuals */}
          <div className="flex-1 w-full max-w-md md:max-w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {/* Admin Card */}
               <div 
                 onClick={() => onNavigate('ADMIN')}
                 className="col-span-1 sm:col-span-2 bg-gray-900 text-white p-6 rounded-2xl cursor-pointer hover:scale-[1.02] transition-transform shadow-xl flex items-center justify-between group"
               >
                 <div>
                   <h3 className="font-bold text-lg group-hover:text-orange-400 transition-colors">Admin Portal</h3>
                   <p className="text-gray-400 text-xs">For Staff & Management</p>
                 </div>
                 <ShieldCheck className="text-gray-600 group-hover:text-white transition-colors" size={24} />
               </div>

               {/* Stats Card (Visual only) */}
               <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-center items-center">
                  <div className="text-4xl font-extrabold text-blue-600 mb-1">100%</div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">Verified</div>
               </div>

               <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-center items-center">
                  <div className="text-4xl font-extrabold text-green-600 mb-1">24/7</div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wide">Support</div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Kawardha chooses us?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We provide a seamless experience for both tenants and landlords with our technology-first approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
               <div className="bg-orange-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-orange-600">
                  <ShieldCheck size={28} />
               </div>
               <h3 className="text-xl font-bold text-gray-800 mb-3">Verified Listings</h3>
               <p className="text-gray-500 leading-relaxed">Every room listed on our platform is physically verified by our ground team.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
               <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                  <Search size={28} />
               </div>
               <h3 className="text-xl font-bold text-gray-800 mb-3">Smart Filters</h3>
               <p className="text-gray-500 leading-relaxed">Find exactly what you need with filters for price, locality, and room type.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
               <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-green-600">
                  <Key size={28} />
               </div>
               <h3 className="text-xl font-bold text-gray-800 mb-3">Instant Booking</h3>
               <p className="text-gray-500 leading-relaxed">Book your preferred room directly through the app without brokerage hassle.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
