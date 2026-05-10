import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Key, ShieldCheck, UserCheck, Home, Settings, Loader2, CheckCircle2, ShieldAlert, Fingerprint, Wallet, ArrowRight, Zap } from 'lucide-react';
import { Language, User as UserType, UserRole, WalletType } from '../types';
import { translations } from '../translations';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserType) => void;
  language: Language;
  mode: UserRole;
}

type AuthStep = 'SIGNUP' | 'SENDING_OTP' | 'OTP' | 'LOGIN';

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess, language, mode }) => {
  const [step, setStep] = useState<AuthStep>('LOGIN');
  const [authType, setAuthType] = useState<'WEB3' | 'LEGACY'>('WEB3');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletLoading, setIsWalletLoading] = useState<WalletType>('NONE');
  const [isFaucetLoading, setIsFaucetLoading] = useState(false);
  
  const t = translations[language];

  const handleFaucetAddress = async (address: string) => {
    setIsFaucetLoading(true);
    try {
      const response = await fetch(`https://faucet.testnet.aptoslabs.com/mint?amount=100000000&address=${address}`, {
        method: 'POST'
      });
      if (response.ok) {
        alert('1 APT (Testnet) added! Use this for demo bookings.');
      }
    } catch (e) {
      console.error(e);
      alert('Faucet failed. Visit: https://aptos.dev/network/faucet');
    } finally {
      setIsFaucetLoading(false);
    }
  };

  const connectPetra = async () => {
    // Aptos Wallet Standard detection
    const getAptosWallet = () => {
      if ((window as any).aptos) return (window as any).aptos;
      // Many modern wallets follow the 'aptos' standard but might be accessible through other means
      // but 'window.aptos' is the primary standard entry point.
      return null;
    };

    const aptos = getAptosWallet();
    
    if (!aptos) {
      alert(language === 'HI' 
        ? 'पेट्रा वॉलेट नहीं मिला! कृपया एक्सटेंशन इंस्टॉल करें और इस ऐप को "न्यू टैब" में खोलें।' 
        : 'Petra Wallet not detected! Please ensure the extension is installed and open the app in a "New Tab" for extension support.');
      window.open('https://petra.app/', '_blank');
      return;
    }

    setIsWalletLoading('PETRA');
    try {
      // Connect to Aptos using standard window.aptos.connect()
      const result = await aptos.connect();
      const address = result.address;
      
      if (!address) throw new Error("No address returned from wallet");

      onLoginSuccess({
        id: 'aptos_' + (typeof address === 'string' ? address.slice(0, 8) : 'user'),
        name: `Aptos ${mode}`,
        email: `${typeof address === 'string' ? address.slice(0, 6) : 'user'}...${typeof address === 'string' ? address.slice(-4) : ''}@aptos.web3`,
        role: mode,
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${address}`,
        walletAddress: typeof address === 'string' ? address : '',
        walletType: 'PETRA'
      });
    } catch (error: any) {
      console.error("Petra Connection Error:", error);
      alert(language === 'HI'
        ? `कनेक्शन विफल: ${error.message || 'वॉलेट ने रिजेक्ट कर दिया'}. कृपया सुनिश्चित करें कि आप न्यू टैब में हैं।`
        : `Connection Failed: ${error.message || 'Wallet rejected the request'}. Ensure you are in a New Tab.`);
    } finally {
      setIsWalletLoading('NONE');
    }
  };

  const mockDb = [
    { email: 'admin@saathi.com', password: '123', role: 'ADMIN', name: 'Super Admin' },
    { email: 'owner@saathi.com', password: '123', role: 'OWNER', name: 'Rajesh Owner' },
    { email: 'user@saathi.com', password: '123', role: 'CUSTOMER', name: 'WWW Global User' }
  ];

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStep('SENDING_OTP');
    setTimeout(() => {
      setIsLoading(false);
      setStep('OTP');
    }, 2800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  const handleVerifyOtp = () => {
    if (otp.join('') === '123456') {
      setIsLoading(true);
      setTimeout(() => {
        onLoginSuccess({
          id: 'user_' + Date.now(),
          name: name || email.split('@')[0],
          email: email,
          role: mode,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name || email}`
        });
      }, 1200);
    } else {
      alert(language === 'HI' ? 'गलत OTP! (डेमो के लिए 123456 डालें)' : 'Invalid OTP! (Use 123456)');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const found = mockDb.find(u => u.email === email && u.password === password);
      
      if (found) {
        if (found.role === mode) {
          onLoginSuccess({
            id: 'id_' + Math.random(),
            name: found.name,
            email: found.email,
            role: found.role as UserRole,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${found.name}`
          });
        } else {
          alert(language === 'HI' 
            ? `एक्सेस अस्वीकृत: यह ईमेल ${found.role} के लिए रजिस्टर्ड है।` 
            : `Access Denied: This email belongs to a ${found.role} account.`);
        }
      } else {
        onLoginSuccess({
          id: 'new_' + Date.now(),
          name: email.split('@')[0],
          email: email,
          role: mode,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        });
      }
    }, 1200);
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
              {step === 'LOGIN' ? 'Welcome Back' : step === 'SIGNUP' ? 'Join Network' : 'Security Check'}
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
          {/* Navigation Tabs */}
          <div className="flex gap-4 p-2 bg-slate-50 rounded-2xl mb-10">
            <button 
              onClick={() => setAuthType('WEB3')}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                authType === 'WEB3' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Wallet size={14} /> Web3 Connect
            </button>
            <button 
              onClick={() => setAuthType('LEGACY')}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                authType === 'LEGACY' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Mail size={14} /> Legacy Login
            </button>
          </div>

          <AnimatePresence mode="wait">
            {authType === 'WEB3' ? (
              <motion.div 
                key="web3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
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
                  </div>
                  
                  <div className="flex items-center gap-2 justify-center py-2">
                    <ShieldAlert size={14} className="text-orange-500" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Tip: Open in <span className="text-slate-900 underline cursor-pointer" onClick={() => window.open(window.location.href, '_blank')}>New Tab</span> for Petra support
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
            ) : (
              <div key="legacy">
                {step === 'LOGIN' && (
                  <motion.form 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleLoginSubmit} 
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Gmail Vector</label>
                      <div className="relative group">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={20} />
                        <input 
                          type="email" required value={email} onChange={e => setEmail(e.target.value)}
                          className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-orange-600 focus:bg-white outline-none font-bold text-slate-900 transition-all"
                          placeholder="example@gmail.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
                      <div className="relative group">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={20} />
                        <input 
                          type="password" required value={password} onChange={e => setPassword(e.target.value)}
                          className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-orange-600 focus:bg-white outline-none font-bold text-slate-900 transition-all"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      className={`w-full ${accentColor} text-white py-6 rounded-2xl font-black text-lg shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 transition-all`}
                    >
                      {isLoading ? <Loader2 className="animate-spin" /> : (
                        <>
                          <Fingerprint size={24} />
                          Continue to Dashboard
                        </>
                      )}
                    </motion.button>

                    <div className="flex items-center justify-center gap-4 pt-4">
                      <div className="h-px flex-1 bg-slate-100"></div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        New here? <button type="button" onClick={() => setStep('SIGNUP')} className="text-orange-600 hover:underline">Register Account</button>
                      </p>
                      <div className="h-px flex-1 bg-slate-100"></div>
                    </div>
                  </motion.form>
                )}

                {step === 'SIGNUP' && (
                  <motion.form 
                    key="signup"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleSignupSubmit} 
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity Name</label>
                      <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Username / Business Name" className="w-full p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold focus:border-orange-600 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Gmail</label>
                      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="example@gmail.com" className="w-full p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold focus:border-orange-600 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Create Password</label>
                      <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold focus:border-orange-600 outline-none transition-all" />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      className={`w-full ${accentColor} text-white py-6 rounded-2xl font-black text-lg shadow-2xl flex items-center justify-center gap-3 transition-all`}
                    >
                      <Mail size={24} />
                      {language === 'HI' ? 'OTP प्राप्त करें' : 'Verify via Gmail OTP'}
                    </motion.button>
                    <button type="button" onClick={() => setStep('LOGIN')} className="w-full text-center text-[10px] text-slate-400 font-black uppercase tracking-widest mt-4">Already have access?</button>
                  </motion.form>
                )}

                {step === 'SENDING_OTP' && (
                  <motion.div 
                    key="sending"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-20 flex flex-col items-center text-center space-y-8"
                  >
                    <div className="relative">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-24 h-24 border-4 border-orange-100 border-t-orange-600 rounded-full"
                      />
                      <Mail className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-600" size={32} />
                    </div>
                    <div>
                      <h4 className="text-3xl font-black text-slate-900 mb-2 tracking-tighter">Authenticating Email</h4>
                      <p className="text-sm text-slate-400 font-bold max-w-[240px] mx-auto">Sending a 6-digit secure code to <span className="text-slate-900">{email}</span></p>
                    </div>
                  </motion.div>
                )}

                {step === 'OTP' && (
                  <motion.div 
                    key="otp"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-12 text-center"
                  >
                    <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 inline-flex items-center gap-4">
                      <ShieldCheck className="text-orange-600" size={28} />
                      <p className="text-[10px] font-black text-orange-800 uppercase tracking-widest text-left leading-relaxed">
                        {language === 'HI' ? 'हमने आपकी आईडी पर सुरक्षा कोड भेजा है।' : 'One-time security code sent to your Gmail.'}
                      </p>
                    </div>
                    <div className="flex justify-between gap-3 max-w-xs mx-auto">
                      {otp.map((d, i) => (
                        <input key={i} id={`otp-${i}`} type="text" maxLength={1} value={d} onChange={e => handleOtpChange(i, e.target.value)} className="w-12 h-16 text-center text-3xl font-black border-2 border-slate-50 bg-slate-50 rounded-2xl focus:border-orange-600 focus:bg-white outline-none transition-all shadow-inner" />
                      ))}
                    </div>
                    <div className="flex flex-col gap-6 pt-4">
                      <div className="flex items-center justify-center gap-3 text-[10px] text-slate-300 font-black uppercase tracking-widest">
                        <ShieldAlert size={14} /> Sandbox Mode: Use 123456
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleVerifyOtp} 
                        className={`w-full ${accentColor} text-white py-6 rounded-2xl font-black text-lg shadow-2xl transition-all`}
                      >
                        Verify & Access Portal
                      </motion.button>
                      <button onClick={() => setStep('SIGNUP')} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Resend Verification Code</button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </AnimatePresence>
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
