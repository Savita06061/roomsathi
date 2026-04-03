import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Clock, Home, Zap, Info, ShieldAlert, Check, Star, Lock, Phone, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface SubscriptionGateProps {
  onSubscribe: () => void;
  language: Language;
  mode?: 'CUSTOMER' | 'OWNER';
}

const SubscriptionGate: React.FC<SubscriptionGateProps> = ({ onSubscribe, language, mode = 'CUSTOMER' }) => {
  const isOwner = mode === 'OWNER';
  const t = translations[language];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
      {/* Top Badge */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-center mb-10"
      >
        <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.3em] shadow-2xl border border-white/10">
          <Star size={14} className="text-orange-500 fill-orange-500" /> {language === 'HI' ? 'प्रीमियम साथी मेंबरशिप' : 'Premium Saathi Membership'}
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
        
        {/* Left: Rich Content & Features */}
        <div className="flex-1 space-y-12">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tighter mb-8">
              {isOwner ? (language === 'HI' ? 'किरायेदार पाएं' : 'Get Tenants') : (language === 'HI' ? 'अनलॉक करें' : 'Unlock')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">5000+ Rooms</span> <br/> {language === 'HI' ? 'कवर्धा में' : 'in Kawardha'}
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
              {language === 'HI' 
                ? 'कवर्धा का सबसे बड़ा रूम नेटवर्क। बिना दलाली के, सीधे मकान मालिक से जुड़ें और अपना समय और पैसा बचाएं।' 
                : 'Kawardha\'s largest room network. Connect directly with landlords without brokerage and save your time and money.'}
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                title: language === 'HI' ? '7 दिनों की वैधता' : '7 Days Validity', 
                desc: language === 'HI' ? '7 दिनों तक अनलिमिटेड एक्सेस' : 'Unlimited access for 7 days', 
                icon: <Clock className="text-orange-600" /> 
              },
              { 
                title: language === 'HI' ? 'कोई दलाली नहीं' : 'No Brokerage', 
                desc: language === 'HI' ? '0% कमीशन, सीधा मालिक से डील' : '0% Commission, deal directly with owner', 
                icon: <ShieldCheck className="text-blue-600" /> 
              },
              { 
                title: language === 'HI' ? 'वेरिफाइड डेटा' : 'Verified Data', 
                desc: language === 'HI' ? 'हर रूम की साफ़ फोटो और सही लोकेशन' : 'Clean photos and accurate location for every room', 
                icon: <Home className="text-green-600" /> 
              },
              { 
                title: language === 'HI' ? 'सपोर्ट कॉल' : 'Support Call', 
                desc: language === 'HI' ? 'विनय सर की टीम से डायरेक्ट मदद' : 'Direct help from Vinay Sir\'s team', 
                icon: <Phone className="text-purple-600" /> 
              },
            ].map((f, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, borderColor: '#ea580c' }}
                className="bg-white p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border-2 border-transparent transition-all group"
              >
                <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-50 transition-colors">
                  {f.icon}
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-2">{f.title}</h4>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Local Trust Footer */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-orange-50/50 p-10 rounded-[3rem] border border-orange-100/50 flex flex-col sm:flex-row items-center gap-8"
          >
             <div className="bg-white p-5 rounded-3xl shadow-xl">
                <ShieldCheck size={40} className="text-orange-600" />
             </div>
             <div>
                <h5 className="font-black text-slate-900 text-xl mb-1">{language === 'HI' ? 'सुरक्षित प्लेटफॉर्म' : 'Safe & Secure Platform'}</h5>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {language === 'HI' 
                    ? 'आपका डेटा सुरक्षित है। धोखाधड़ी रोकने के लिए हम हर ओनर को मैन्युअली वेरिफाई करते हैं।' 
                    : 'Your data is encrypted. We verify every owner manually to prevent fraud in Kawardha.'}
                </p>
             </div>
          </motion.div>
        </div>

        {/* Right: The Premium Card */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-full lg:w-[480px] lg:sticky lg:top-32"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-[4rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-slate-100">
              <div className="bg-slate-900 p-12 text-white relative overflow-hidden">
                <div className="relative z-10">
                   <div className="flex justify-between items-start mb-8">
                      <Zap size={40} className="text-orange-500 fill-orange-500" />
                      <div className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border border-white/10">{language === 'HI' ? 'आधिकारिक सदस्य' : 'Official Member'}</div>
                   </div>
                   <h3 className="text-4xl font-black tracking-tighter mb-2">
                     {isOwner ? (language === 'HI' ? 'ओनर लिस्टिंग' : 'Owner Listing') : (language === 'HI' ? 'प्रीमियम एक्सेस' : 'Premium Access')}
                   </h3>
                   <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                     {isOwner ? (language === 'HI' ? 'वैधता: हमेशा के लिए' : 'Validity: Forever') : (language === 'HI' ? 'वैधता: 7 पूरे दिन' : 'Validity: 7 Full Days')}
                   </p>
                </div>
                <div className="absolute -right-12 -top-12 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl"></div>
              </div>

              <div className="p-12">
                <div className="flex items-baseline gap-3 mb-12">
                   <span className="text-8xl font-black text-slate-900 tracking-tighter">₹{isOwner ? '49' : '199'}</span>
                   <span className="text-slate-300 line-through text-3xl font-bold">₹{isOwner ? '199' : '499'}</span>
                </div>

                <div className="space-y-5 mb-12">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">{language === 'HI' ? 'मेंबरशिप नियम' : 'Membership Rules'}</p>
                  {[
                    { text: isOwner ? (language === 'HI' ? 'अनलिमिटेड किरायेदार पूछताछ' : 'Unlimited tenant inquiries') : (language === 'HI' ? '5000+ कमरे तुरंत अनलॉक' : '5000+ Rooms unlocked instantly'), strong: true },
                    { text: language === 'HI' ? 'सीधे मकान मालिक के नंबर' : 'Direct Owner Phone Numbers', strong: true },
                    { text: language === 'HI' ? 'लगातार 7 दिनों तक एक्सेस' : 'Access for 7 continuous days', strong: false },
                    { text: language === 'HI' ? 'कोई छुपी हुई दलाली नहीं' : 'No Hidden Brokerage (दलाली)', strong: true },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="bg-green-100 text-green-600 p-1.5 rounded-full"><Check size={16} /></div>
                      <span className={`text-base ${item.strong ? 'text-slate-900 font-black tracking-tight' : 'text-slate-500 font-medium'}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onSubscribe}
                  className="w-full bg-orange-600 text-white py-7 rounded-3xl font-black text-2xl hover:bg-orange-700 transition-all shadow-[0_25px_50px_-12px_rgba(234,88,12,0.4)] flex items-center justify-center gap-4 group"
                >
                  {isOwner ? (language === 'HI' ? 'शुरू करें' : 'Get Started') : t.payNow}
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </motion.button>

                <div className="mt-12 pt-10 border-t border-slate-50 space-y-5">
                   <div className="flex gap-4">
                      <Info size={20} className="text-orange-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wide">
                        {language === 'HI' ? 'नियम: यह पास केवल 7 दिनों के लिए है। पेमेंट के बाद कोई रिफंड नहीं होगा।' : 'Rule: This pass is valid for 7 days only. No refund after payment.'}
                      </p>
                   </div>
                   <div className="flex gap-4">
                      <ShieldAlert size={20} className="text-slate-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wide">
                        {language === 'HI' ? 'सतर्क रहें: सादे कागज़ पर रेंट एग्रीमेंट ज़रूर बनवाएं।' : 'Be careful: Always get a rent agreement on plain paper.'}
                      </p>
                   </div>
                </div>
              </div>

              <div className="bg-slate-50 p-8 flex items-center justify-center gap-8 opacity-40 grayscale">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-5" />
                 <div className="h-5 w-px bg-slate-200"></div>
                 <div className="flex items-center gap-2">
                    <Lock size={14} />
                    <span className="text-[11px] font-black tracking-[0.2em] uppercase">SSL SECURE</span>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionGate;
