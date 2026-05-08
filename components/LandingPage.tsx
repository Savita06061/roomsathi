import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Languages, ArrowRight, ShieldCheck, Users, MapPin, Lock, Settings, PhoneCall, Map, Zap, Star, ShieldAlert, Clock } from 'lucide-react';
import { ViewState, Language, User } from '../types';
import { translations } from '../translations';
import Footer from './Footer';

interface LandingPageProps {
  onNavigate: (view: ViewState) => void;
  onLoginCustomer: () => void;
  onLoginOwner: () => void;
  onLoginAdmin: () => void;
  user: User | null;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ 
  onNavigate, onLoginCustomer, onLoginOwner, onLoginAdmin, user, language, setLanguage 
}) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
      
      {/* Mega Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full z-50 top-0 bg-white/70 backdrop-blur-2xl border-b border-slate-100 py-6"
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 group cursor-pointer" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <div className="bg-orange-600 p-2.5 rounded-2xl text-white shadow-2xl transition-all group-hover:rotate-[15deg]">
              <Home size={26} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 tracking-tighter leading-none">Room<span className="text-orange-600">Saathi</span></span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] mt-1">Premium Rental Hub</span>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
              className="px-4 py-2 hover:bg-slate-50 rounded-xl text-[10px] font-black text-slate-900 border-2 border-slate-100 flex items-center gap-2 transition-all uppercase tracking-widest"
            >
              <Languages size={14} className="text-orange-600" />
              {language === 'EN' ? 'हिन्दी' : 'English'}
            </motion.button>
            <div className="h-8 w-px bg-slate-100"></div>
            <motion.button 
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLoginAdmin}
              className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-xl"
            >
              <Settings size={20} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Futuristic Hero Section */}
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-12 shadow-sm border border-orange-100"
           >
              <Star size={14} className="fill-orange-600" /> {t.officialPartner}
           </motion.div>
           
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1, duration: 0.8 }}
             className="text-7xl lg:text-[11rem] font-black text-slate-900 leading-[0.8] tracking-tighter mb-16"
           >
             Rental <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-600 to-slate-900">Evolution.</span>
           </motion.h1>
           
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3, duration: 1 }}
             className="text-2xl text-slate-400 font-medium mb-16 max-w-4xl mx-auto leading-relaxed"
           >
             {t.heroSub} <br/> <span className="text-slate-900 font-black decoration-orange-500/30 underline underline-offset-8 decoration-4">{language === 'HI' ? 'अत्याधुनिक सुविधाएं। जीरो ब्रोकरेज। सटीक जानकारी।' : 'Modern Tech. Zero Brokerage. Accurate Specs.'}</span>
           </motion.p>

           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.5 }}
             className="flex flex-col sm:flex-row justify-center gap-8 mb-32"
           >
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLoginCustomer}
                className="bg-orange-600 text-white px-14 py-8 rounded-[3rem] font-black text-2xl hover:bg-orange-700 transition-all shadow-[0_30px_60px_-15px_rgba(234,88,12,0.4)] flex items-center justify-center gap-4"
              >
                {t.findRoom}
                <ArrowRight size={32} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLoginOwner}
                className="bg-white text-slate-900 border-[6px] border-slate-900 px-14 py-8 rounded-[3rem] font-black text-2xl hover:bg-slate-900 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-4"
              >
                 {t.listProperty}
              </motion.button>
           </motion.div>

           {/* Service Matrix - Added Sector */}
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
              {[
                { label: language === 'HI' ? 'लक्जरी पीजी' : 'Luxury PG', count: '120+', icon: <Users size={24} /> },
                { label: language === 'HI' ? 'विद्यार्थी रूम' : 'Student Rooms', count: '250+', icon: <Home size={24} /> },
                { label: language === 'HI' ? 'फॅमिली फ्लैट्स' : 'Family Flats', count: '80+', icon: <ShieldCheck size={24} /> },
                { label: language === 'HI' ? 'बिजनेस रेंट' : 'Business Space', count: '45+', icon: <Settings size={24} /> },
              ].map((service, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-slate-50/50 p-8 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all group"
                >
                   <div className="bg-white p-4 w-fit rounded-2xl shadow-sm mb-4 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                      {service.icon}
                   </div>
                   <h4 className="text-xl font-black text-slate-900 tracking-tight">{service.label}</h4>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{service.count} {language === 'HI' ? 'उपलब्ध' : 'Active Units'}</p>
                </motion.div>
              ))}
           </div>

           {/* Trust Stats Section */}
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto"
           >
              {/* Previous Stats content... */}
             <motion.div whileHover={{ y: -10 }} className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex flex-col justify-between">
                <Users size={40} className="text-blue-600" />
                <div>
                   <h4 className="text-4xl font-black text-slate-900">5.2k+</h4>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{language === 'HI' ? 'खुश किरायेदार' : 'Happy Tenants'}</p>
                </div>
             </motion.div>
             <motion.div whileHover={{ y: -10 }} className="bg-orange-600 p-10 rounded-[3rem] text-white flex flex-col justify-between shadow-2xl shadow-orange-200">
                <ShieldCheck size={40} />
                <div>
                   <h4 className="text-4xl font-black">100%</h4>
                   <p className="text-[10px] font-black uppercase tracking-widest text-orange-200">{language === 'HI' ? 'वेरिफाइड ओनर' : 'Owner Verified'}</p>
                </div>
             </motion.div>
             <motion.div whileHover={{ y: -10 }} className="bg-slate-900 p-10 rounded-[3rem] text-white md:col-span-2 flex flex-col justify-between">
                <Zap size={40} className="text-orange-500" />
                <div className="flex justify-between items-end">
                   <div>
                      <h4 className="text-4xl font-black">{language === 'HI' ? 'जीरो' : 'Zero'}</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{language === 'HI' ? 'कोई छुपा हुआ शुल्क नहीं' : 'Hidden Brokerage Fee'}</p>
                   </div>
                   <div className="bg-white/10 px-4 py-2 rounded-2xl text-xs font-bold border border-white/10">{language === 'HI' ? 'भरोसेमंद नेटवर्क' : 'Trusted Network'}</div>
                </div>
             </motion.div>
          </motion.div>
        </div>

        {/* Decorative Background Blur */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-orange-100/30 rounded-full blur-[160px] -mr-96 -mt-96"
        ></motion.div>
      </section>

      {/* Rules & Guidelines Section (Professional Niyam) */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex-1"
             >
                <div className="bg-white p-10 lg:p-16 rounded-[4rem] shadow-2xl border border-slate-100 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-10 text-slate-50"><Map size={120} strokeWidth={1} /></div>
                   <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 relative z-10 leading-tight">
                     {language === 'HI' ? 'प्लेटफॉर्म के नियम और ' : 'Platform Rules & '} <br/> <span className="text-orange-600">{language === 'HI' ? 'गारंटी' : 'Guarantees'}</span>
                   </h2>
                   <div className="space-y-8 relative z-10">
                      {[
                        { 
                          title: language === 'HI' ? '7-दिन पास नियम' : '7-Day Pass Rule', 
                          desc: language === 'HI' ? 'प्रीमियम पास केवल 7 दिनों तक मान्य है। इस दौरान आप अनलिमिटेड room देख सकते हैं।' : 'Premium pass is valid for 7 days. You can view unlimited rooms during this period.', 
                          icon: <Clock /> 
                        },
                        { 
                          title: language === 'HI' ? 'जीरो ब्रोकरेज पॉलिसी' : 'Zero Brokerage Policy', 
                          desc: language === 'HI' ? 'अगर कोई ओनर ब्रोकरेज मांगता है, तो हमें तुरंत रिपोर्ट करें। हम उसे प्लेटफार्म से हटा देंगे।' : 'If an owner asks for brokerage, report us immediately. we will remove them from platform.', 
                          icon: <ShieldAlert /> 
                        },
                        { 
                          title: language === 'HI' ? 'सुरक्षा प्रोटोकॉल' : 'Security Protocol', 
                          desc: language === 'HI' ? 'मालिक से मिलकर ही एडवांस दें। रेंट साथी केवल जानकारी साझा करता है, डील की सुरक्षा आपकी जिम्मेदारी है।' : 'Give advance only after meeting the owner. Saathi only shares info, deal safety is your responsibility.', 
                          icon: <Lock /> 
                        },
                      ].map((n, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-6"
                        >
                           <div className="bg-orange-50 p-4 h-fit rounded-2xl text-orange-600">{n.icon}</div>
                           <div>
                              <h4 className="text-lg font-black text-slate-900 mb-1 tracking-tight">{n.title}</h4>
                              <p className="text-sm text-slate-500 font-medium leading-relaxed">{n.desc}</p>
                           </div>
                        </motion.div>
                      ))}
                   </div>
                </div>
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex-1 space-y-10"
             >
                <motion.div 
                  whileHover={{ rotate: 0 }}
                  className="bg-slate-900 p-12 rounded-[4rem] text-white shadow-2xl transform lg:rotate-2 transition-transform"
                >
                   <PhoneCall size={48} className="text-orange-500 mb-8" />
                   <h3 className="text-3xl font-black mb-4">{language === 'HI' ? 'आधिकारिक सहायता' : 'Official Support'}</h3>
                   <p className="text-slate-400 font-medium text-lg leading-relaxed mb-8">
                     {language === 'HI' 
                        ? 'रूम ढूँढने में दिक्कत आ रही है? हमारी टीम आपको पर्सनली गाइड करेगी। कवर्धा के हर मोहल्ले की सही जानकारी के लिए कॉल करें।' 
                        : 'Having trouble finding a room? Our team will guide you personally. Call for accurate info on every locality in Kawardha.'}
                   </p>
                   <div className="flex items-center gap-6">
                      <div className="text-3xl font-black text-white">+91 9340303098</div>
                      <div className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">Vinay C.</div>
                   </div>
                </motion.div>
             </motion.div>
          </div>
        </div>
      </section>

      <Footer onAdminClick={onLoginAdmin} />
    </div>
  );
};

export default LandingPage;
