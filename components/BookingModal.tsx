import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Phone, User, Calendar, MapPin, ShieldCheck, Loader2, Zap } from 'lucide-react';
import { Listing } from '../types';

interface BookingModalProps {
  listing: Listing;
  onClose: () => void;
  onConfirm: (name: string, phone: string) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ listing, onClose, onConfirm }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<'IDLE' | 'PENDING' | 'SUCCESS'>('IDLE');
  const [isFaucetLoading, setIsFaucetLoading] = useState(false);

  const aptPrice = (listing.rentPrice / 750).toFixed(2);

  const handleFaucet = async () => {
    if (!(window as any).aptos) {
      alert('Petra Wallet not found!');
      return;
    }
    setIsFaucetLoading(true);
    try {
      const account = await (window as any).aptos.account();
      const address = account.address;
      // Using Aptos Testnet Faucet API
      const response = await fetch(`https://faucet.testnet.aptoslabs.com/mint?amount=100000000&address=${address}`, {
        method: 'POST'
      });
      if (response.ok) {
        alert('1 APT (Testnet) added to your wallet!');
      } else {
        throw new Error('Faucet failed');
      }
    } catch (error) {
      console.error(error);
      alert('Faucet request failed. Please use: https://aptos.dev/network/faucet');
    } finally {
      setIsFaucetLoading(false);
    }
  };

  const handleAptPayment = async () => {
    if (!(window as any).aptos) {
      alert('Petra Wallet not found! Please connect Petra first.');
      return;
    }
    
    setPaymentStatus('PENDING');
    try {
      // Real Aptos Transaction on Testnet
      const transaction = {
        arguments: ["0x264903328e9cf64188fa642a86847849e7b233a0ec3bdde0a3e8e19e075f10b7", (parseFloat(aptPrice) * 100000000).toString()], // recipient and amount in octas
        function: "0x1::coin::transfer",
        type: "entry_function_payload",
        type_arguments: ["0x1::aptos_coin::AptosCoin"],
      };
      
      const response = await (window as any).aptos.signAndSubmitTransaction(transaction);
      console.log('TX Hash:', response.hash);
      
      setPaymentStatus('SUCCESS');
      setTimeout(() => {
        onConfirm(name || 'Web3 User', phone || '9999999999');
      }, 2000);
    } catch (error) {
      console.error(error);
      setPaymentStatus('IDLE');
      alert('Payment Failed or Cancelled');
    }
  };

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
            <h3 className="text-4xl font-black tracking-tighter leading-none">Protocol <br/> <span className="text-orange-200">Confirmation</span></h3>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] mt-4 opacity-60">Security Matrix Enabled</p>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        </div>
        
        <div className="p-10 space-y-8">
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
                <div className="flex items-center gap-1 mt-1">
                   <img src="https://cryptologos.cc/logos/aptos-apt-logo.svg?v=025" className="w-4 h-4" alt="APT" />
                   <span className="text-orange-600 font-black text-sm">{aptPrice} APT</span>
                   <span className="text-[10px] text-slate-400 font-bold ml-1">/ ₹{listing.rentPrice}</span>
                </div>
             </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {paymentStatus === 'SUCCESS' ? (
              <motion.div 
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="bg-green-50 p-6 rounded-full inline-block text-green-600 mx-auto">
                   <CheckCircle size={48} />
                </div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">Transaction Verified</h4>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-relaxed">Processing booking vector in database...</p>
              </motion.div>
            ) : (
              <motion.div 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                       <User size={12} className="inline mr-1" /> Contact Identity
                     </label>
                     <input 
                       type="text" 
                       value={name}
                       onChange={e => setName(e.target.value)}
                       className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 focus:border-orange-600 focus:bg-white outline-none font-bold text-slate-900 transition-all"
                       placeholder="Enter holder name"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                       <Phone size={12} className="inline mr-1" /> Mobile Link
                     </label>
                     <input 
                       type="tel" 
                       value={phone}
                       onChange={e => setPhone(e.target.value)}
                       className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 focus:border-orange-600 focus:bg-white outline-none font-bold text-slate-900 transition-all"
                       placeholder="10 digit vector"
                     />
                   </div>
                </form>

                <div className="flex flex-col gap-4">
                   <motion.button 
                     whileHover={{ scale: 1.02, y: -2 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={handleAptPayment}
                     disabled={paymentStatus === 'PENDING'}
                     className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-lg shadow-2xl flex items-center justify-center gap-3 transition-all relative overflow-hidden"
                   >
                     {paymentStatus === 'PENDING' ? <Loader2 className="animate-spin" /> : (
                       <>
                         <img src="https://cryptologos.cc/logos/aptos-apt-logo.svg?v=025" className="w-6 h-6 invert" alt="APT" />
                         Pay {aptPrice} APT (Testnet)
                       </>
                     )}
                   </motion.button>

                   <motion.button 
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={handleFaucet}
                     disabled={isFaucetLoading}
                     className="w-full bg-orange-50 text-orange-600 border-2 border-orange-100 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all"
                   >
                     {isFaucetLoading ? <Loader2 className="animate-spin" size={14} /> : (
                       <>
                         <Zap size={14} fill="currentColor" />
                         Claim 1 APT Demo Faucet
                       </>
                     )}
                   </motion.button>
                   
                   <p className="text-[10px] text-slate-400 text-center font-black uppercase tracking-widest opacity-60">or proceed with cash inquiry</p>

                   <motion.button 
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={handleSubmit}
                     className="w-full bg-white text-slate-900 border-2 border-slate-100 py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all"
                   >
                     Inform Owner (Cash)
                   </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="bg-slate-50 p-5 rounded-2xl flex gap-4 items-start border border-slate-100">
             <ShieldCheck className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
             <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                Aptos Testnet Protocol Active. Transactions are irreversible and secure for demo usage.
             </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookingModal;
