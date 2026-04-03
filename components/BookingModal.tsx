import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Phone, User, Calendar, MapPin, ShieldCheck } from 'lucide-react';
import { Listing } from '../types';

interface BookingModalProps {
  listing: Listing;
  onClose: () => void;
  onConfirm: (name: string, phone: string) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ listing, onClose, onConfirm }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      onConfirm(name, phone);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 z-[70] flex items-center justify-center p-4 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[3rem] shadow-2xl max-w-md w-full overflow-hidden border border-white/20 flex flex-col"
      >
        <div className="bg-orange-600 p-10 flex flex-col gap-4 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/20">
                <Calendar size={24} />
              </div>
              <motion.button 
                whileHover={{ rotate: 90, backgroundColor: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose} 
                className="p-2.5 bg-white/10 rounded-full transition-all border border-white/10"
              >
                <X size={20} />
              </motion.button>
            </div>
            <h3 className="text-4xl font-black tracking-tighter leading-none">Secure <br/> <span className="text-orange-200">This Room</span></h3>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mt-4 opacity-60">Booking Protocol v1.0</p>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        </div>
        
        <div className="p-10 space-y-10">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-6 bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-inner"
          >
             <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl border-4 border-white flex-shrink-0">
                <img src={listing.imageUrl} className="w-full h-full object-cover" alt="" />
             </div>
             <div>
                <p className="font-black text-slate-900 text-xl tracking-tight leading-none mb-2">{listing.type}</p>
                <div className="flex items-center gap-1.5 text-orange-600 font-black text-sm tracking-tighter">
                   <MapPin size={14} />
                   <span>{listing.locality}</span>
                </div>
                <p className="text-slate-400 text-xs font-bold mt-1 tracking-tight">₹{listing.rentPrice.toLocaleString()}/month</p>
             </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-8">
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                 <User size={12} className="inline mr-1" /> Full Identity Name
               </label>
               <input 
                 type="text" 
                 value={name}
                 onChange={e => setName(e.target.value)}
                 className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-5 focus:border-orange-600 focus:bg-white outline-none font-bold text-slate-900 transition-all"
                 placeholder="Enter your full name"
                 required
               />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                 <Phone size={12} className="inline mr-1" /> Secure Mobile Vector
               </label>
               <input 
                 type="tel" 
                 value={phone}
                 onChange={e => setPhone(e.target.value)}
                 className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-5 focus:border-orange-600 focus:bg-white outline-none font-bold text-slate-900 transition-all"
                 placeholder="10 digit mobile number"
                 required
               />
             </div>
             
             <div className="bg-slate-50 p-5 rounded-2xl flex gap-4 items-start border border-slate-100">
                <ShieldCheck className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                   Your request will be sent to the Admin. You will receive a call once approved.
                </p>
             </div>

             <motion.button 
               whileHover={{ scale: 1.02, y: -2 }}
               whileTap={{ scale: 0.98 }}
               type="submit"
               className="w-full bg-orange-600 text-white py-6 rounded-2xl font-black text-lg shadow-2xl shadow-orange-100 flex items-center justify-center gap-3 transition-all"
             >
               <CheckCircle size={24} /> 
               Commit Booking
             </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookingModal;
