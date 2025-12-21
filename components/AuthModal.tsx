
import React, { useState } from 'react';
import { X, Mail, Lock, User, Key, ShieldCheck, UserCheck, Home, Settings, Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Language, User as UserType, UserRole } from '../types';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  
  const t = translations[language];

  const mockDb = [
    { email: 'admin@saathi.com', password: '123', role: 'ADMIN', name: 'Super Admin' },
    { email: 'owner@saathi.com', password: '123', role: 'OWNER', name: 'Rajesh Owner' },
    { email: 'user@saathi.com', password: '123', role: 'CUSTOMER', name: 'Kawardha User' }
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
    <div className="fixed inset-0 bg-slate-900/80 z-[100] flex items-center justify-center p-4 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] max-w-lg w-full overflow-hidden border border-white/20">
        
        {/* Modern Header Section */}
        <div className={`${accentColor} p-10 text-white relative overflow-hidden`}>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/10 p-2.5 rounded-2xl backdrop-blur-md border border-white/20">
                {isAdmin ? <Settings size={24} /> : isCustomer ? <UserCheck size={24} /> : <Home size={24} />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Secure Portal
              </span>
            </div>
            <h3 className="text-4xl font-black tracking-tight mb-2">
              {step === 'LOGIN' ? 'Welcome Back' : step === 'SIGNUP' ? 'Join the Network' : 'Security Check'}
            </h3>
            <p className="text-white/60 text-sm font-medium">
              Authorized access for <span className="text-white underline decoration-orange-500 underline-offset-4">{portalTitle}</span>
            </p>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all border border-white/10">
            <X size={20} />
          </button>
        </div>

        <div className="p-10">
          {step === 'LOGIN' && (
            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Gmail</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={20} />
                  <input 
                    type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:border-orange-500 focus:bg-white outline-none font-bold text-slate-800 transition-all"
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors" size={20} />
                  <input 
                    type="password" required value={password} onChange={e => setPassword(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:border-orange-500 focus:bg-white outline-none font-bold text-slate-800 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <button type="submit" className={`w-full ${accentColor} text-white py-5 rounded-[1.5rem] font-black text-xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3`}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Continue to Dashboard'}
              </button>
              <div className="flex items-center justify-center gap-2 pt-2">
                <div className="h-px w-8 bg-slate-100"></div>
                <p className="text-xs font-bold text-slate-400">
                  New here? <button type="button" onClick={() => setStep('SIGNUP')} className="text-orange-600 hover:underline">Register Account</button>
                </p>
                <div className="h-px w-8 bg-slate-100"></div>
              </div>
            </form>
          )}

          {step === 'SIGNUP' && (
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Username / Business Name" className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] font-bold focus:border-orange-500 outline-none transition-all" />
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Primary Gmail" className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] font-bold focus:border-orange-500 outline-none transition-all" />
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Create Secure Password" className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] font-bold focus:border-orange-500 outline-none transition-all" />
              <button type="submit" className={`w-full ${accentColor} text-white py-5 rounded-[1.5rem] font-black text-xl shadow-xl flex items-center justify-center gap-2`}>
                {language === 'HI' ? 'OTP प्राप्त करें' : 'Verify via Gmail OTP'}
              </button>
              <button type="button" onClick={() => setStep('LOGIN')} className="w-full text-center text-xs text-slate-400 font-bold uppercase tracking-widest mt-4">Already have access?</button>
            </form>
          )}

          {step === 'SENDING_OTP' && (
            <div className="py-20 flex flex-col items-center text-center space-y-6 animate-pulse">
              <div className="relative">
                <Loader2 className="w-16 h-16 text-orange-600 animate-spin" />
                <Mail className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-600" size={20} />
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-800 mb-1">Authenticating Email</h4>
                <p className="text-sm text-slate-400 font-medium max-w-[240px] mx-auto">Sending a 6-digit secure code to <span className="text-slate-900 font-bold">{email}</span></p>
              </div>
            </div>
          )}

          {step === 'OTP' && (
            <div className="space-y-10 text-center animate-in zoom-in-95 duration-300">
              <div className="bg-orange-50 p-6 rounded-[2rem] border border-orange-100 inline-flex items-center gap-3">
                <ShieldCheck className="text-orange-600" size={24} />
                <p className="text-xs font-bold text-orange-800">
                  {language === 'HI' ? 'हमने आपकी आईडी पर सुरक्षा कोड भेजा है।' : 'One-time security code sent to your Gmail.'}
                </p>
              </div>
              <div className="flex justify-between gap-3 max-w-xs mx-auto">
                {otp.map((d, i) => (
                  <input key={i} id={`otp-${i}`} type="text" maxLength={1} value={d} onChange={e => handleOtpChange(i, e.target.value)} className="w-14 h-16 text-center text-3xl font-black border-2 border-slate-100 bg-slate-50 rounded-2xl focus:border-orange-500 focus:bg-white outline-none transition-all shadow-inner" />
                ))}
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-300 font-black uppercase tracking-widest">
                  <ShieldAlert size={12} /> Sandbox Mode: Use 123456
                </div>
                <button onClick={handleVerifyOtp} className={`w-full ${accentColor} text-white py-5 rounded-[1.5rem] font-black text-xl shadow-2xl transition-all`}>
                  Verify & Access Portal
                </button>
                <button onClick={() => setStep('SIGNUP')} className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">Resend Verification Code</button>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer Trust Bar */}
        <div className="bg-slate-50 p-6 flex justify-center items-center gap-8 border-t border-slate-100 grayscale opacity-50">
           <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4" />
           <div className="flex items-center gap-2">
             <ShieldCheck size={16} />
             <span className="text-[10px] font-black uppercase tracking-widest">256-bit AES Encrypted</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
