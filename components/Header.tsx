import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Home, LogOut, Languages, User as UserIcon, Settings, ShieldCheck, Wallet, Zap, Loader2, Sun, Moon } from 'lucide-react';
import { Language, User } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  onLogout: () => void;
  user: User | null;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout, user, language, setLanguage, theme, setTheme }) => {
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
    <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-100 dark:border-slate-850 sticky top-0 z-50 py-4 transition-colors duration-300">
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
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-none transition-colors">
              Room<span className="text-orange-600">Saathi</span>
            </h1>
            <p className="text-[9px] text-slate-400 dark:text-slate-500 font-black tracking-[0.3em] uppercase mt-1 transition-colors">WWW Global Hub</p>
          </div>
        </motion.div>
        
        {/* Actions */}
        <div className="flex items-center gap-4">
          {user && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-850 group transition-colors duration-300"
            >
              {user.walletAddress ? (
                <div className="flex items-center gap-3">
                   <div className="bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 text-orange-600 transition-colors">
                      <Wallet size={16} />
                   </div>
                   <div className="hidden md:block">
                      <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 leading-none mb-1 uppercase tracking-widest transition-colors">{user.walletType} (Testnet)</p>
                      <p className="text-xs font-mono font-black text-slate-900 dark:text-slate-100 leading-none transition-colors">{user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}</p>
                   </div>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(234, 88, 12, 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleFaucet}
                      disabled={isFaucetLoading}
                      className="ml-2 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl hover:from-orange-700 hover:to-red-700 transition-all shadow-2xl relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      {isFaucetLoading ? <Loader2 className="animate-spin" size={16} /> : (
                        <>
                           <Zap size={16} fill="white" className="animate-pulse" />
                           <div className="flex flex-col items-start leading-none">
                             <span className="text-[10px] font-black uppercase tracking-widest text-orange-100">Claim APT/SUSD</span>
                             <span className="text-[12px] font-black uppercase tracking-tighter">Testnet Faucet</span>
                           </div>
                        </>
                      )}
                    </motion.button>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full shadow-md border-2 border-white dark:border-slate-800" />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 shadow-sm animate-pulse"></div>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 leading-none mb-1 uppercase tracking-widest transition-colors">{user.role}</p>
                    <p className="text-sm font-black text-slate-900 dark:text-slate-100 leading-none tracking-tight transition-colors">{user.name.split(' ')[0]}</p>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Light/Dark Toggle */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-3 bg-slate-50 dark:bg-slate-900 text-orange-600 dark:text-orange-500 rounded-xl hover:bg-orange-50 dark:hover:bg-slate-800 border-2 border-slate-100 dark:border-slate-850 transition-all shadow-sm flex items-center justify-center cursor-pointer"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </motion.button>

          <div className="h-8 w-px bg-slate-100 dark:bg-slate-850 mx-1 transition-colors"></div>

          <div className="flex items-center gap-2 px-3 py-2 hover:bg-orange-50 dark:hover:bg-slate-850 rounded-xl border-2 border-slate-100 dark:border-slate-850 transition-all">
            <Languages size={16} className="text-orange-600 shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-[10px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest cursor-pointer focus:outline-none pr-1 select-none border-none outline-none appearance-none"
            >
              <option value="EN" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">English</option>
              <option value="HI" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">हिन्दी</option>
              <option value="TA" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">தமிழ்/Tamil</option>
              <option value="OD" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">ଓଡ଼ିଆ/Odia</option>
              <option value="TE" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">తెలుగు/Telugu</option>
              <option value="BN" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">বাংলা/Bengali</option>
              <option value="MR" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">मराठी/Marathi</option>
            </select>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#ef4444' }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            className="p-3 bg-slate-900 dark:bg-slate-800 text-white rounded-xl transition-all shadow-xl border border-transparent dark:border-slate-700 cursor-pointer"
          >
            <LogOut size={18} />
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;
