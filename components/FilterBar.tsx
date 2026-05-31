import React from 'react';
import { motion } from 'motion/react';
import { FilterState, RoomType } from '../types';
import { LOCALITIES } from '../constants';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, roomType: e.target.value as RoomType | 'ALL' }));
  };

  const handleLocalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, locality: e.target.value }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) || 10000 }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] shadow-2xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-850 mb-12"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        
        {/* Left Side: Chips Selection */}
        <div className="flex-1">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 ml-2">Room Category Network</label>
          <div className="flex flex-wrap gap-3">
             {['ALL', ...Object.values(RoomType)].map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilters(prev => ({ ...prev, roomType: type as any }))}
                  className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                    filters.roomType === type 
                    ? 'bg-orange-600 text-white shadow-xl shadow-orange-100 dark:shadow-none border-transparent' 
                    : 'bg-white dark:bg-slate-900 text-slate-500 border-2 border-slate-50 dark:border-slate-800 hover:border-orange-100 dark:hover:border-orange-500 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {type === 'ALL' ? 'All Units' : type.replace('_', ' ')}
                </motion.button>
             ))}
          </div>
        </div>

        {/* Right Side: Locality & Budget */}
        <div className="flex flex-col md:flex-row gap-8 items-end">
           <div className="w-full md:w-64 space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Locality Vector</label>
              <div className="relative">
                <select 
                  value={filters.locality}
                  onChange={handleLocalityChange}
                  className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-50 dark:border-slate-850 text-slate-900 dark:text-slate-100 text-[11px] font-black uppercase tracking-widest rounded-2xl focus:border-orange-600 focus:bg-white dark:focus:bg-slate-900 block p-4 appearance-none outline-none transition-all"
                >
                  <option value="ALL" className="dark:bg-slate-900">World Wide Web</option>
                  {LOCALITIES.map(loc => (
                    <option key={loc} value={loc} className="dark:bg-slate-900">{loc}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
           </div>

           <div className="w-full md:w-64 space-y-4">
              <div className="flex justify-between items-end px-2">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Budget Limit</label>
                <span className="text-xl font-black text-orange-600 tracking-tighter leading-none">₹{filters.maxPrice}</span>
              </div>
              <input 
                type="range" 
                min="1500" 
                max="10000" 
                step="500"
                value={filters.maxPrice}
                onChange={handlePriceChange}
                className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-orange-600"
              />
           </div>
        </div>

      </div>
    </motion.div>
  );
};

export default FilterBar;
