import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Home, LogOut, Languages, User as UserIcon, Settings, ShieldCheck, Wallet, Zap, Loader2 } from 'lucide-react';
import { Language, User } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  onLogout: () => void;
  user: User | null;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, user, language, setLanguage }) => {
  const t = translations[language];
  const [isFaucetLoading, setIsFaucetLoading] = useState(false);

  const handleFaucet = async () => {
    if (!user?.walletAddress) return;
    setIsFaucetLoading(true);
    try {
      const response = await fetch(`https://faucet.testnet.aptoslabs.com/mint?amount=100000000&address=${user.walletAddress}`, {
        method: 'POST'
      });
      if (response.ok) {
        alert('1 APT (Testnet) added! Check your Petra wallet.');
      }
    } catch (e) {
      console.error(e);
      alert('Faucet failed. Visit: https://aptos.dev/network/faucet');
    } finally {
      setIsFaucetLoading(false);
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-2xl border-b border-slate-100 sticky top-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo Area */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => window.location.reload()}
        >
          <div className="bg-orange-600 p-2 rounded-xl text-white shadow-xl group-hover:rotate-12 transition-transform">
            <Home size={22} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none">
              Room<span className="text-orange-600">Saathi</span>
            </h1>
            <p className="text-[9px] text-slate-400 font-black tracking-[0.3em] uppercase mt-1">Kawardha Hub</p>
          </div>
        </motion.div>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          {user && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100 group"
            >
              {user.walletAddress ? (
                <div className="flex items-center gap-3">
                   <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100 text-orange-600">
                      <Wallet size={16} />
                   </div>
                   <div className="hidden md:block">
                      <p className="text-[9px] font-black text-slate-400 leading-none mb-1 uppercase tracking-widest">{user.walletType} (Testnet)</p>
                      <p className="text-xs font-mono font-black text-slate-900 leading-none">{user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}</p>
                   </div>
                   {user.walletType === 'PETRA' && (
                     <motion.button
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.9 }}
                       onClick={handleFaucet}
                       disabled={isFaucetLoading}
                       className="ml-2 p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                       title="Get Test Tokens"
                     >
                       {isFaucetLoading ? <Loader2 className="animate-spin" size={14} /> : <Zap size={14} fill="currentColor" />}
                     </motion.button>
                   )}
                </div>
              ) : (
                <>
                  <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full shadow-md border-2 border-white" />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-[9px] font-black text-slate-400 leading-none mb-1 uppercase tracking-widest">{user.role}</p>
                    <p className="text-sm font-black text-slate-900 leading-none tracking-tight">{user.name.split(' ')[0]}</p>
                  </div>
                </>
              )}
            </motion.div>
          )}

          <div className="h-8 w-px bg-slate-100 mx-1"></div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
            className="flex items-center gap-2 px-4 py-2 hover:bg-orange-50 rounded-xl text-[10px] font-black text-slate-900 border-2 border-slate-100 transition-all uppercase tracking-widest"
          >
            <Languages size={16} className="text-orange-600" />
            <span className="hidden md:inline">{language === 'EN' ? 'हिन्दी' : 'English'}</span>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#ef4444' }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="p-3 bg-slate-900 text-white rounded-xl transition-all shadow-xl"
          >
            <LogOut size={18} />
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;
