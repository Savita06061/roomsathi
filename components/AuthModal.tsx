import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, UserCheck, Home, Settings, Loader2, ShieldAlert, Zap, ArrowRight } from 'lucide-react';
import { Language, User as UserType, UserRole, WalletType } from '../types';
import { translations } from '../translations';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserType) => void;
  language: Language;
  mode: UserRole;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess, language, mode }) => {
  const [isWalletLoading, setIsWalletLoading] = useState<WalletType>('NONE');
  
  const t = translations[language];

  const connectPetra = async () => {
    // Use the standard window.aptos which is the modern way to connect
    const aptos = (window as any).aptos;
    
    if (!aptos) {
      // Prompt user to open in new tab if wallet is not detected (often true in iframes)
      const confirmed = confirm(language === 'HI' 
        ? 'सुरक्षा कारणों से क्रेडेंशियल को "न्यू टैब" में खोलना आवश्यक है। क्या आप अभी ओपन करना चाहते हैं?' 
        : 'For security, browser wallets require opening the app in a "New Tab". Opening now...');
        
      if (confirmed) {
        window.open(window.location.href, '_blank');
      }
      return;
    }

    setIsWalletLoading('PETRA');
    try {
      // Attempt connection using standard Aptos Wallet standard
      const response = await aptos.connect();
      const address = response.address;
      
      if (!address) throw new Error("Aptos address not found");

      onLoginSuccess({
        id: 'aptos_' + (typeof address === 'string' ? address.slice(0, 8) : 'user'),
        name: `Aptos Member`,
        email: `${typeof address === 'string' ? address.slice(0, 6) : 'user'}...${typeof address === 'string' ? address.slice(-4) : ''}@aptos.web3`,
        role: mode,
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${address}`,
        walletAddress: typeof address === 'string' ? address : '',
        walletType: 'PETRA'
      });
    } catch (error: any) {
      console.error("Wallet Connection Error:", error);
      alert(language === 'HI'
        ? `त्रुटि: ${error.message || 'वॉलेट ने मना किया'}. कृपया सुनिश्चित करें कि आप न्यू टैब में हैं।`
        : `Error: ${error.message || 'Request rejected'}. Ensure you are in a Full Tab.`);
    } finally {
      setIsWalletLoading('NONE');
    }
  };

  const connectMartian = async () => {
    const martian = (window as any).martian;
    if (!martian) {
      const confirmed = confirm(language === 'HI' 
        ? 'मार्टियन वॉलेट नहीं मिला! कृपया इसे इंस्टॉल करें और फिर इस पेज को "न्यू टैब" में खोलें।' 
        : 'Martian Wallet not detected! Please install it and open this app in a "New Tab" for extension support.');
      if (confirmed) window.open('https://martianwallet.xyz/', '_blank');
      return;
    }

    setIsWalletLoading('MARTIAN');
    try {
      const response = await martian.connect();
      const address = response.address;
      onLoginSuccess({
        id: 'martian_' + (typeof address === 'string' ? address.slice(0, 8) : 'user'),
        name: `Martian Member`,
        email: `${typeof address === 'string' ? address.slice(0, 6) : 'user'}...@martian.web3`,
        role: mode,
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${address}`,
        walletAddress: typeof address === 'string' ? address : '',
        walletType: 'MARTIAN'
      });
    } catch (error: any) {
      console.error("Martian Connection Error:", error);
      alert(`Error: ${error.message || 'Connection failed'}`);
    } finally {
      setIsWalletLoading('NONE');
    }
  };

  const isCustomer = mode === 'CUSTOMER';
  const isAdmin = mode === 'ADMIN';
  const accentColor = isAdmin ? 'bg-slate-900' : isCustomer ? 'bg-orange-600' : 'bg-indigo-700';
  const portalTitle = isAdmin ? 'Admin Control' : isCustomer ? 'Tenant' : 'Property Owner';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[3rem] shadow-2xl max-w-lg w-full overflow-hidden border border-white/20 flex flex-col"
      >
        
        {/* Modern Header Section */}
        <div className={`${accentColor} p-12 text-white relative overflow-hidden`}>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/20"
              >
                {isAdmin ? <Settings size={28} /> : isCustomer ? <UserCheck size={28} /> : <Home size={28} />}
              </motion.div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
                Secure Protocol
              </span>
            </div>
            <h3 className="text-5xl font-black tracking-tighter mb-2 leading-none">
              Welcome Back
            </h3>
            <p className="text-white/50 text-xs font-black uppercase tracking-widest mt-4">
              Authorized access for <span className="text-white underline decoration-orange-500 underline-offset-4">{portalTitle}</span>
            </p>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <motion.button 
            whileHover={{ rotate: 90, backgroundColor: 'rgba(255,255,255,0.2)' }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose} 
            className="absolute top-8 right-8 p-3 bg-white/10 rounded-full transition-all border border-white/10"
          >
            <X size={20} />
          </motion.button>
        </div>

        <div className="p-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Protocol Authority</p>
              <div className="grid grid-cols-1 gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={connectPetra}
                  className="flex items-center justify-between gap-4 bg-slate-900 border-2 border-slate-900 text-white p-6 rounded-3xl font-black text-lg shadow-2xl transition-all hover:bg-slate-800"
                >
                  <div className="flex items-center gap-4">
                    {isWalletLoading === 'PETRA' ? <Loader2 className="animate-spin" size={24} /> : <img src="https://petra.app/favicon.ico" className="w-8 h-8 rounded-full" alt="Petra" />}
                    <div className="text-left leading-none">
                       <span className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Connect with</span>
                       <p className="text-xl">Petra Wallet</p>
                    </div>
                  </div>
                  <ArrowRight size={20} />
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={connectMartian}
                  className="flex items-center justify-between gap-4 bg-white border-2 border-slate-200 text-slate-900 p-6 rounded-3xl font-black text-lg shadow-sm hover:border-orange-600 transition-all"
                >
                  <div className="flex items-center gap-4">
                    {isWalletLoading === 'MARTIAN' ? <Loader2 className="animate-spin" size={24} /> : <img src="https://martianwallet.xyz/favicon.ico" className="w-8 h-8 rounded-full" alt="Martian" />}
                    <div className="text-left leading-none">
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Connect with</span>
                       <p className="text-xl">Martian Wallet</p>
                    </div>
                  </div>
                  <ArrowRight size={20} />
                </motion.button>
              </div>
              
              <div className="flex items-center gap-2 justify-center py-2">
                <ShieldAlert size={14} className="text-orange-500" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                  Tip: Open in <span className="text-slate-900 underline cursor-pointer" onClick={() => window.open(window.location.href, '_blank')}>New Tab</span> for Wallet support
                </p>
              </div>
            </div>

            {/* Faucet Box */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 border border-orange-100 space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap size={80} fill="currentColor" className="text-orange-600" />
              </div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="bg-orange-600 p-3 rounded-2xl text-white shadow-lg shadow-orange-200">
                  <Zap size={24} fill="currentColor" />
                </div>
                <div>
                  <h5 className="text-sm font-black text-slate-900 uppercase tracking-tight">Aptos Testnet Faucet</h5>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Free Demo APT / ShelbyUSD Tokens</p>
                </div>
              </div>
              <p className="text-[11px] font-medium text-slate-600 leading-relaxed relative z-10">
                You need test tokens to simulate room bookings and property listings. 
                If you don't see the auto-faucet in the header, use the official link below:
              </p>
              <div className="flex flex-col gap-3 relative z-10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://aptos.dev/network/faucet', '_blank')}
                  className="w-full bg-white border border-slate-200 text-slate-900 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-orange-600 hover:text-orange-600 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <img src="https://petra.app/favicon.ico" className="w-4 h-4" alt="Aptos" />
                  Official APT Faucet
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open('https://shelby.exchange/faucet', '_blank')}
                  className="w-full bg-white border border-slate-200 text-slate-900 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  Get ShelbyUSD Tokens
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Footer Trust Bar */}
        <div className="bg-slate-50 p-8 flex justify-center items-center gap-10 border-t border-slate-100 grayscale opacity-40">
           <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-5" />
           <div className="flex items-center gap-3">
             <ShieldCheck size={20} />
             <span className="text-[10px] font-black uppercase tracking-[0.3em]">256-bit AES Encrypted</span>
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;
