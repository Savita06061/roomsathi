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
      className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 mb-10"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-orange-100 p-2 rounded-xl text-orange-600">
          <SlidersHorizontal size={22} />
        </div>
        <span className="text-xl font-black text-slate-900 tracking-tight">Smart Filters</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Room Type */}
        <div className="relative group">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Room Category</label>
          <div className="relative">
            <select 
              value={filters.roomType} 
              onChange={handleTypeChange}
              className="w-full bg-slate-50 border-2 border-slate-50 text-slate-900 text-sm font-bold rounded-2xl focus:border-orange-600 focus:bg-white block p-4 appearance-none outline-none transition-all"
            >
              <option value="ALL">All Categories</option>
              <option value={RoomType.SINGLE}>Single Room</option>
              <option value={RoomType.BACHELOR}>Bachelor Room</option>
              <option value={RoomType.GIRLS}>Girls Room</option>
              <option value={RoomType.FAMILY}>Family Room</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
          </div>
        </div>

        {/* Locality */}
        <div className="relative group">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Preferred Locality</label>
          <div className="relative">
            <select 
              value={filters.locality}
              onChange={handleLocalityChange}
              className="w-full bg-slate-50 border-2 border-slate-50 text-slate-900 text-sm font-bold rounded-2xl focus:border-orange-600 focus:bg-white block p-4 appearance-none outline-none transition-all"
            >
              <option value="ALL">All Kawardha</option>
              {LOCALITIES.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
          </div>
        </div>

        {/* Price Slider */}
        <div className="flex flex-col justify-center">
          <div className="flex justify-between items-end mb-3 px-1">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Max Budget</label>
            <span className="text-2xl font-black text-orange-600 tracking-tighter leading-none">₹{filters.maxPrice}</span>
          </div>
          <input 
            type="range" 
            min="1500" 
            max="10000" 
            step="500"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="w-full h-2.5 bg-slate-100 rounded-full appearance-none cursor-pointer accent-orange-600"
          />
          <div className="flex justify-between text-[9px] font-black text-slate-300 mt-2 px-1 uppercase tracking-widest">
            <span>₹1.5k</span>
            <span>₹10k+</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;
