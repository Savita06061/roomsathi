import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Printer, Copy, RefreshCw, CheckCircle2, ChevronRight, Sliders, Scroll } from 'lucide-react';
import { Language } from '../types';

interface AgreementGeneratorProps {
  language: Language;
}

const AgreementGenerator: React.FC<AgreementGeneratorProps> = ({ language }) => {
  const [tenantName, setTenantName] = useState('Rahul Patel');
  const [ownerName, setOwnerName] = useState('Vinay Chandrakar');
  const [stampNo, setStampNo] = useState('IN-CG134898190348J');
  const [rentPrice, setRentPrice] = useState(3500);
  const [securityDeposit, setSecurityDeposit] = useState(5000);
  const [noticePeriod, setNoticePeriod] = useState(1); // months
  const [duration, setDuration] = useState(11); // standard rent agreement duration in months
  const [premisesAddress, setPremisesAddress] = useState('House No. 42, Silicon Valley Colony, Wardha Road, Kawardha, Chhattisgarh');
  
  const [isCopied, setIsCopied] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  const draftRef = useRef<HTMLDivElement>(null);

  const isHindi = language === 'HI';

  const handleCopy = () => {
    if (draftRef.current) {
      navigator.clipboard.writeText(draftRef.current.innerText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setTenantName('Rahul Patel');
    setOwnerName('Vinay Chandrakar');
    setRentPrice(3500);
    setSecurityDeposit(5000);
    setPremisesAddress('House No. 42, Silicon Valley Colony, Wardha Road, Kawardha, Chhattisgarh');
  };

  const stampDate = new Date().toLocaleDateString(isHindi ? 'hi-IN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-850 shadow-sm transition-all duration-300 p-8 mt-12">
      {/* Header with toggle */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-orange-600 p-3 rounded-2xl text-white shadow-lg shadow-orange-100 dark:shadow-none">
            <Scroll className="animate-pulse" size={24} />
          </div>
          <div>
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-orange-600 block mb-1">
              {isHindi ? 'मुफ़्त काग़जी एग्रीमेंट ड्राफ्ट' : 'Free Rental Agreement Maker'}
            </span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              {isHindi ? 'किराया अनुबंध पत्र प्रारूपक (सादा काग़ज ड्राफ्ट)' : 'Rent Deed Draft & Legal Format Generator'}
            </h3>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMinimized(!isMinimized)}
          className="px-5 py-2.5 bg-slate-50 dark:bg-slate-1050 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-100 dark:border-slate-800 cursor-pointer"
        >
          {isMinimized ? (isHindi ? 'एग्रीमेंट तैयार करें' : 'Create Draft') : (isHindi ? 'छोटा करें' : 'Collapse')}
        </motion.button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isMinimized ? 0 : 'auto', opacity: isMinimized ? 0 : 1 }}
        style={{ overflow: 'hidden' }}
        transition={{ duration: 0.3 }}
        className="mt-6 space-y-6"
      >
        <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed border-t border-slate-100 dark:border-slate-850 pt-4">
          {isHindi 
            ? 'सुरक्षा नियम के अनुसार, एडवांस पैसे देने से पहले सादे कागज़ पर नियम और शर्तों का लिखित अनुबंध ज़रूर तैयार करें। नीचे दी गई जानकारियों को भरकर तुरंत एक लीगल प्रारूप ड्राफ्ट तैयार कर सकते हैं।' 
            : 'As per security protocol, always frame a written agreement on physical paper before transferring advances. Configure the details below to generate a professional bilingual rental deed format instantly.'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Section (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-4 bg-slate-50 dark:bg-slate-950/30 p-6 rounded-3xl border border-slate-100 dark:border-slate-850">
              <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-4 flex items-center gap-1.5">
                <Sliders size={14} className="text-orange-600" />
                {isHindi ? 'समझौता विवरण भरें' : 'Configure Parameters'}
              </h4>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                  {isHindi ? 'मकान मालिक का नाम (LANDLORD / OWNER)' : 'Landlord / Host Name'}
                </label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white font-semibold focus:border-orange-600 outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                  {isHindi ? 'किरायेदार का नाम (TENANT)' : 'Tenant / Seeker Name'}
                </label>
                <input
                  type="text"
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white font-semibold focus:border-orange-600 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                    {isHindi ? 'मासिक किराया (₹)' : 'Monthly Rent'}
                  </label>
                  <input
                    type="number"
                    value={rentPrice}
                    onChange={(e) => setRentPrice(Number(e.target.value))}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white font-semibold focus:border-orange-600 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                    {isHindi ? 'सिक्योरिटी डिपॉजिट (₹)' : 'Security Deposit'}
                  </label>
                  <input
                    type="number"
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white font-semibold focus:border-orange-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                    {isHindi ? 'अवधि (महीने)' : 'Duration (Months)'}
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white font-semibold focus:border-orange-600 outline-none transition-all cursor-pointer"
                  >
                    <option value={11}>11 Months</option>
                    <option value={6}>6 Months</option>
                    <option value={3}>3 Months</option>
                    <option value={12}>12 Months</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                    {isHindi ? 'नोटिस पीरियड (महीने)' : 'Notice Period'}
                  </label>
                  <select
                    value={noticePeriod}
                    onChange={(e) => setNoticePeriod(Number(e.target.value))}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white font-semibold focus:border-orange-600 outline-none transition-all cursor-pointer"
                  >
                    <option value={1}>1 Month</option>
                    <option value={2}>2 Months</option>
                    <option value={3}>3 Months</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                  {isHindi ? 'कमरे / परिसर का पूरा पता' : 'Premises Landmark Address'}
                </label>
                <textarea
                  rows={2}
                  value={premisesAddress}
                  onChange={(e) => setPremisesAddress(e.target.value)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white font-semibold focus:border-orange-600 outline-none transition-all resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 bg-white hover:bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <RefreshCw size={12} />
                  {isHindi ? 'रीसेट करें' : 'Reset'}
                </button>
              </div>
            </div>

            {/* Quick Warning badge */}
            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-850 p-5 rounded-3xl flex gap-4">
              <span className="text-xl">📜</span>
              <div>
                <h5 className="text-xs font-black text-orange-600 uppercase tracking-wider">
                  {isHindi ? 'महत्वपूर्ण जानकारी' : 'Landlord-Tenant Act'}
                </h5>
                <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-1">
                  {isHindi 
                    ? '11 महीने का एग्रीमेंट भारत में मानक ड्राफ्ट माना जाता है। इस ड्राफ्ट को कॉपी करके आप सीधे ₹100 या ₹50 के स्टांप पेपर पर प्रिंट कर सकते हैं।'
                    : '11-month tenure is standard in India to prevent restrictive tenancy rules. You can print this layout directly on standard non-judicial stamp papers.'}
                </p>
              </div>
            </div>
          </div>

          {/* Stamp Preview Area (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Action Bar */}
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-150 dark:border-slate-850">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                {isHindi ? 'ऑनलाइन सहमति प्रारूप तैयार' : 'Online Draft Live Rendering'}
              </span>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="bg-slate-900 border border-slate-850 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  {isCopied ? <CheckCircle2 size={12} className="text-green-400" /> : <Copy size={12} />}
                  {isCopied ? (isHindi ? 'कॉपी हुआ' : 'Copied!') : (isHindi ? 'कॉपी करें' : 'Copy Draft')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrint}
                  className="bg-white border border-slate-200 text-slate-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 cursor-pointer hover:border-orange-600 transition-all shadow-sm"
                >
                  <Printer size={12} className="text-orange-600" />
                  {isHindi ? 'प्रिंट लें' : 'Print Draft'}
                </motion.button>
              </div>
            </div>

            {/* Simulated Stamp Paper Sheet */}
            <div 
              ref={draftRef}
              className="bg-amber-50/10 dark:bg-slate-950 border-4 border-double border-orange-200/40 rounded-3xl p-8 shadow-inner font-serif select-all select-text overflow-y-auto max-h-[500px] text-slate-800 dark:text-slate-350"
            >
              {/* Top Stamp Header Block (Govt Emblem simulation) */}
              <div className="border-4 border-orange-900/60 p-4 text-center space-y-2 mb-8 select-none">
                <p className="text-xs font-bold text-orange-900 tracking-[0.4em] uppercase">₹ 100 NON JUDICIAL</p>
                <div className="w-16 h-16 mx-auto border-2 border-dashed border-orange-900/40 rounded-full flex items-center justify-center text-[10px] text-orange-950 font-black">
                  GOVT SEAL
                </div>
                <h5 className="text-lg font-black text-orange-950 tracking-wider">सत्यमेव जयते • भारत सरकार</h5>
                <div className="flex justify-between items-center text-[10px] font-black text-orange-900 px-4">
                  <span>CG DEED REG-NO: {stampNo}</span>
                  <span>DATE: {stampDate}</span>
                </div>
              </div>

              {/* Deed Content */}
              <div className="space-y-6 text-xs md:text-sm leading-relaxed text-justify px-2">
                <h3 className="text-center text-lg font-bold text-slate-900 dark:text-white uppercase underline decoration-double tracking-wider">
                  RENT AGREEMENT / किराया अनुबंध पत्र
                </h3>

                <p>
                  This Rent Agreement is made and executed on this <strong>{stampDate}</strong> at Chhattisgarh, between:
                  <br />
                  यह किराया अनुबंध दिनांक <strong>{stampDate}</strong> को छत्तीसगढ़ में निम्नलिखित पक्षों के मध्य निष्पादित किया गया:
                </p>

                <p>
                  <strong>LANDLORD / ओनर (First Party):</strong>
                  <br />
                  <strong>Shri/Smt/Ms. {ownerName}</strong>, hereinafter referred to as the "FIRST PARTY" / "Landlord", (which expression shall unless repugnant to the context mean and include heirs, legal representatives and assigns).
                  <br />
                  <strong>श्री/श्रीमती {ownerName}</strong> (जिन्हें आगे "प्रथम पक्ष" या "मकान मालिक" कहा गया है)।
                </p>

                <p>
                  <strong>AND / और:</strong>
                </p>

                <p>
                  <strong>TENANT / किरायेदार (Second Party):</strong>
                  <br />
                  <strong>Shri/Smt/Ms. {tenantName}</strong>, hereinafter referred to as the "SECOND PARTY" / "Tenant", (which expression shall unless repugnant to the context mean and include heirs, legal representatives and assigns).
                  <br />
                  <strong>श्री/श्रीमती {tenantName}</strong> (जिन्हें आगे "द्वितीय पक्ष" या "किरायेदार" कहा गया है)।
                </p>

                <p>
                  <strong>PREMISES / किराये का परिसर:</strong>
                  <br />
                  WHEREAS the First Party is the lawful owner of the residential unit/room situated at: <strong>{premisesAddress}</strong>, which is let out to the Second Party for tenancy duration.
                  <br />
                  चूंकि प्रथम पक्ष निम्नलिखित स्थान पर स्थित कमरे/मकान का पूर्णतः स्वामी है: <strong>{premisesAddress}</strong>, जिसे द्वितीय पक्ष को किराए पर दिया गया है।
                </p>

                <div className="border-t border-b border-dashed border-slate-350 dark:border-slate-800 py-4 my-4 space-y-3">
                  <p className="font-bold text-slate-900 dark:text-white">TERMS AND CONDITIONS / नियम एवं शर्तें:</p>
                  
                  <ol className="list-decimal pl-5 space-y-3">
                    <li>
                      The monthly rent agreed belongs of <strong>₹{rentPrice}/- (Rupees {rentPrice} Only)</strong>, payable on or before the 10th of every calendar month.
                      <br />
                      <span className="text-slate-500 italic">मासिक किराया <strong>₹{rentPrice}/-</strong> निर्धारित है, जो प्रत्येक महीने की 10 तारीख से पहले देय होगा।</span>
                    </li>
                    <li>
                      The Second Party has deposited a sum of <strong>₹{securityDeposit}/-</strong> as refundable security deposit to the First Party.
                      <br />
                      <span className="text-slate-500 italic">द्वितीय पक्ष ने प्रथम पक्ष के पास <strong>₹{securityDeposit}/-</strong> सुरक्षा निधि के रूप में जमा किए हैं जो किरायेदारी समाप्ति के पश्चात रिफंडेबल होगा।</span>
                    </li>
                    <li>
                      This Agreement is signed block for a fixed period of <strong>{duration} months</strong>, starting with full validity from today.
                      <br />
                      <span className="text-slate-500 italic">यह समझौता कुल <strong>{duration} महीनों</strong> की अवधि के लिए वैध होगा।</span>
                    </li>
                    <li>
                      Either party can terminate this contract by giving <strong>{noticePeriod} month(s)</strong> prior written notice to the other.
                      <br />
                      <span className="text-slate-500 italic">कोई भी पक्ष <strong>{noticePeriod} महीने</strong> की पूर्व लिखित सूचना देकर इस अनुबंध को समाप्त कर सकता है।</span>
                    </li>
                    <li>
                      Second Party shall use the rooms strictly for residential purposes only and shall not sublet or commit structural changes.
                      <br />
                      <span className="text-slate-500 italic">किरायेदार केवल आवासीय कार्यों हेतु कमरे का उपयोग करेगा, किसी अन्य को सबलेट नहीं करेगा।</span>
                    </li>
                  </ol>
                </div>

                {/* Signatures */}
                <div className="pt-8 grid grid-cols-2 gap-12 text-center select-none">
                  <div>
                    <div className="h-10"></div>
                    <p className="border-t border-slate-300 dark:border-slate-800 pt-2 font-bold text-slate-900 dark:text-white">
                      {ownerName}
                    </p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">
                      FIRST PARTY (LANDLORD)
                    </p>
                  </div>
                  <div>
                    <div className="h-10"></div>
                    <p className="border-t border-slate-300 dark:border-slate-800 pt-2 font-bold text-slate-900 dark:text-white">
                      {tenantName}
                    </p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">
                      SECOND PARTY (TENANT)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AgreementGenerator;
