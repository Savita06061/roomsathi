import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Listing, Language, User } from '../types';
import { Plus, LogOut, Home, Settings, Clock, CheckCircle, XCircle, ShieldCheck, MapPin, LayoutDashboard } from 'lucide-react';
import SubscriptionGate from './SubscriptionGate';

interface OwnerDashboardProps {
  listings: Listing[];
  onAdd: () => void;
  onLogout: () => void;
  isSubscribed: boolean;
  onSubscribe: () => void;
  language: Language;
  user: User | null;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ 
  listings, onAdd, onLogout, isSubscribed, onSubscribe, language, user 
}) => {
  if (!isSubscribed) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-white"
      >
        <nav className="bg-slate-900 text-white shadow-2xl p-6 sticky top-0 z-50">
           <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-orange-600 p-2 rounded-xl">
                  <Home size={20} />
                </div>
                <span className="text-xl font-black tracking-tighter">Owner<span className="text-orange-500">Portal</span></span>
              </div>
              <motion.button 
                whileHover={{ x: 5 }}
                onClick={onLogout} 
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 px-5 py-2.5 rounded-xl border border-white/10"
              >
                <LogOut size={14} /> Exit Panel
              </motion.button>
           </div>
        </nav>
        <SubscriptionGate language={language} onSubscribe={onSubscribe} mode="OWNER" />
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-slate-900 text-white shadow-2xl sticky top-0 z-50 py-6"
      >
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="bg-orange-600 p-2.5 rounded-2xl shadow-xl"
            >
              <LayoutDashboard size={24} />
            </motion.div>
            <div>
               <h1 className="text-2xl font-black tracking-tighter leading-none">Owner <span className="text-orange-500">Dashboard</span></h1>
               <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.4em] mt-1">Room Saathi WWW</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            {user && (
              <div className="hidden sm:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5">
                <img src={user.avatar} alt="" className="w-6 h-6 rounded-full border border-white/20" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{user.name}</span>
              </div>
            )}
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#ef4444' }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout} 
              className="p-3 bg-white/10 text-white rounded-xl transition-all border border-white/5"
            >
              <LogOut size={18} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <main className="max-w-5xl mx-auto px-8 py-16 w-full flex-1">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 p-10 lg:p-16 mb-12 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-3">
              {language === 'HI' ? `नमस्ते, ${user?.name?.split(' ')[0]}!` : `Welcome, ${user?.name?.split(' ')[0]}!`}
            </h2>
            <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-md">
              {language === 'HI' 
                ? 'अपने कमरे यहाँ लिस्ट करें। एडमिन वेरिफिकेशन के बाद ये लाइव हो जाएंगे।' 
                : 'List your rooms here. They will go live after admin verification.'}
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAdd}
            className="bg-orange-600 text-white px-10 py-6 rounded-3xl font-black text-lg shadow-[0_20px_40px_-10px_rgba(234,88,12,0.4)] hover:bg-orange-700 transition-all flex items-center gap-3 relative z-10"
          >
            <Plus size={24} /> Add New Room
          </motion.button>
          
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
        </motion.div>

        <div className="flex items-center gap-3 mb-10">
          <div className="bg-slate-900 p-2 rounded-xl text-white">
            <Settings size={20} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">My Active Listings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {listings.length > 0 ? (
              listings.map((listing, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  key={listing.id} 
                  className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-slate-100 flex flex-col group hover:shadow-2xl transition-all duration-500"
                >
                   <div className="h-56 bg-slate-200 relative overflow-hidden">
                      <motion.img 
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        src={listing.imageUrl} 
                        alt="" 
                        className="w-full h-full object-cover" 
                      />
                      
                      {/* Status Badge Overlay */}
                      <div className="absolute top-4 right-4">
                         {listing.status === 'PENDING' && (
                            <motion.span 
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="flex items-center gap-2 bg-yellow-500 text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-xl uppercase tracking-widest"
                            >
                               <Clock size={12} /> {language === 'HI' ? 'जाँच जारी है' : 'Waiting Approval'}
                            </motion.span>
                         )}
                         {listing.status === 'APPROVED' && (
                            <span className="flex items-center gap-2 bg-green-500 text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-xl uppercase tracking-widest">
                               <CheckCircle size={12} /> {language === 'HI' ? 'सत्यापित' : 'Live & Approved'}
                            </span>
                         )}
                         {listing.status === 'REJECTED' && (
                            <span className="flex items-center gap-2 bg-red-500 text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-xl uppercase tracking-widest">
                               <XCircle size={12} /> {language === 'HI' ? 'अस्वीकृत' : 'Rejected'}
                            </span>
                         )}
                      </div>

                      <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-widest border border-white/10">
                        {listing.type}
                      </div>
                   </div>
                   <div className="p-8">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 text-orange-600">
                          <MapPin size={16} />
                          <h4 className="font-black text-slate-900 text-xl tracking-tight">{listing.locality}</h4>
                        </div>
                        <span className="font-black text-2xl text-orange-600 tracking-tighter">₹{listing.rentPrice.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-400 font-medium mb-6 line-clamp-1">{listing.address}</p>
                      
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-300 border-t border-slate-50 pt-6 mt-auto">
                         <div className="flex items-center gap-2">
                            <span>Status Vector:</span>
                            <span className={`font-black ${
                               listing.status === 'APPROVED' ? 'text-green-500' : 
                               listing.status === 'PENDING' ? 'text-yellow-500' : 'text-red-500'
                            }`}>
                               {listing.status}
                            </span>
                         </div>
                         <span className="opacity-40">System ID: {listing.id}</span>
                      </div>
                   </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full bg-white p-24 rounded-[4rem] text-center border-dashed border-4 border-slate-100 flex flex-col items-center"
              >
                 <div className="bg-slate-50 p-8 rounded-full text-slate-200 mb-6">
                    <Home size={64} />
                 </div>
                 <h4 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">No Active Listings</h4>
                 <p className="text-slate-400 font-medium uppercase text-[10px] tracking-widest">Start by adding your first property</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
};

export default OwnerDashboard;
