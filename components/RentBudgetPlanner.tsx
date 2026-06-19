import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Zap, Coffee, Wifi, ArrowRight, ShieldCheck, Sparkles, Sliders } from 'lucide-react';
import { Language } from '../types';

interface RentBudgetPlannerProps {
  onApplyBudget: (maxRent: number) => void;
  language: Language;
}

const RentBudgetPlanner: React.FC<RentBudgetPlannerProps> = ({ onApplyBudget, language }) => {
  const [rent, setRent] = useState(5000);
  const [food, setFood] = useState(2500);
  const [utilities, setUtilities] = useState(1000);
  const [isMinimized, setIsMinimized] = useState(true);

  const isHindi = language === 'HI';

  const totalCost = rent + food + utilities;
  const aptCost = (totalCost / 750).toFixed(2);
  const susdCost = (totalCost / 75).toFixed(1);

  // percentage breakdown
  const totalInBreakdown = Math.max(1, totalCost);
  const rentPct = Math.round((rent / totalInBreakdown) * 100);
  const foodPct = Math.round((food / totalInBreakdown) * 100);
  const utilPct = Math.round((utilities / totalInBreakdown) * 100);

  const handleApply = () => {
    onApplyBudget(rent);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-850 shadow-sm transition-all duration-300 p-8">
      {/* Header with expand/minimize toggle */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-orange-600 p-3 rounded-2xl text-white shadow-lg shadow-orange-100 dark:shadow-none">
            <Calculator size={22} className="animate-spin-slow" />
          </div>
          <div>
            <span className="text-[9px] font-black tracking-[0.3em] uppercase text-orange-600 block mb-1">
              {isHindi ? 'बजट कैलकुलेटर' : 'Smart Rent Estimator'}
            </span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              {isHindi ? 'किराया और कुल मासिक खर्च नियोजक' : 'Rent Budget & True Outflow Planner'}
            </h3>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMinimized(!isMinimized)}
          className="px-5 py-2.5 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-100 dark:border-slate-800 cursor-pointer"
        >
          {isMinimized ? (isHindi ? 'कैलकुलेटर खोलें' : 'Open Planner') : (isHindi ? 'छोटा करें' : 'Hide Planner')}
        </motion.button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isMinimized ? 0 : 'auto', opacity: isMinimized ? 0 : 1 }}
        style={{ overflow: 'hidden' }}
        transition={{ duration: 0.3 }}
        className="mt-6 space-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 pt-4 border-t border-slate-50 dark:border-slate-850">
          {/* Sliders Area (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              {/* Rent Slider */}
              <div className="space-y-2 bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-850">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <div className="bg-orange-600 w-2.5 h-2.5 rounded-full"></div>
                    {isHindi ? 'अनुमानित कमरा किराया' : 'Target Room Rent'}
                  </span>
                  <span className="font-black text-orange-600">₹{rent}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="200"
                  value={rent}
                  onChange={(e) => setRent(Number(e.target.value))}
                  className="w-full accent-orange-600 h-2 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>Min: ₹1000</span>
                  <span>Max: ₹10000</span>
                </div>
              </div>

              {/* Food / Mess Expense Slider */}
              <div className="space-y-2 bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-850">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Coffee size={16} className="text-orange-600" />
                    {isHindi ? 'भोजन / मेस का खर्च' : 'Food / Mess Expense'}
                  </span>
                  <span className="font-black text-orange-600">₹{food}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={food}
                  onChange={(e) => setFood(Number(e.target.value))}
                  className="w-full accent-orange-600 h-2 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>Self / Mess: ₹0</span>
                  <span>Premium Food: ₹5000</span>
                </div>
              </div>

              {/* Wi-Fi & Utilities Slider */}
              <div className="space-y-2 bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-850">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <Wifi size={16} className="text-orange-600" />
                    {isHindi ? 'वाईफाई और बिजली / अन्या खर्च' : 'WiFi, Electricity / Bills'}
                  </span>
                  <span className="font-black text-orange-600">₹{utilities}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="100"
                  value={utilities}
                  onChange={(e) => setUtilities(Number(e.target.value))}
                  className="w-full accent-orange-600 h-2 bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span>Free Utilities: ₹0</span>
                  <span>Heavy usage: ₹3000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calculations Area (2 cols) */}
          <div className="lg:col-span-2 bg-slate-950 text-white rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <div className="relative z-10 space-y-4">
              <div>
                <span className="text-[9px] font-black text-slate-450 uppercase tracking-[0.25em] block mb-1">
                  {isHindi ? 'कुल मासिक बाहरी प्रवाह' : 'Estimated Monthly Total'}
                </span>
                <p className="text-4xl font-black text-white tracking-tighter leading-none mb-1">
                  ₹{totalCost}
                </p>
                <p className="text-xs text-orange-400 font-black flex items-center gap-1.5 uppercase tracking-widest leading-none mt-2">
                  <Sparkles size={12} /> Around {aptCost} APT per month
                </p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                  ~ {susdCost} ShelbyUSD / Month
                </p>
              </div>

              {/* Progress stack */}
              <div className="space-y-2">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Cost Allocation</p>
                <div className="h-3 rounded-full flex overflow-hidden bg-slate-800">
                  <div style={{ width: `${rentPct}%` }} className="bg-orange-600 transition-all duration-350" title={`Room: ${rentPct}%`}></div>
                  <div style={{ width: `${foodPct}%` }} className="bg-yellow-500 transition-all duration-350" title={`Food: ${foodPct}%`}></div>
                  <div style={{ width: `${utilPct}%` }} className="bg-teal-500 transition-all duration-350" title={`Bills: ${utilPct}%`}></div>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-600"></div> Room ({rentPct}%)</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Food ({foodPct}%)</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-teal-500"></div> Bills ({utilPct}%)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-850 relative z-10">
              <motion.button
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleApply}
                className="w-full bg-white hover:bg-orange-50 text-slate-900 py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                {isHindi ? 'कमरे बजट से खोजें' : 'Filter by This Budget'}
                <ArrowRight size={14} className="text-orange-600" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RentBudgetPlanner;
