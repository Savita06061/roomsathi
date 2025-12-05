import React from 'react';
import { FilterState, RoomType } from '../types';
import { LOCALITIES } from '../constants';
import { Filter, SlidersHorizontal } from 'lucide-react';

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
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center gap-2 mb-3 text-gray-700 font-semibold">
        <SlidersHorizontal size={20} className="text-orange-600" />
        <span>Find your room</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Room Type */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
          <select 
            value={filters.roomType} 
            onChange={handleTypeChange}
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5"
          >
            <option value="ALL">All Types</option>
            <option value={RoomType.SINGLE}>Single Room</option>
            <option value={RoomType.BACHELOR}>Bachelor Room</option>
            <option value={RoomType.GIRLS}>Girls Room</option>
            <option value={RoomType.FAMILY}>Family Room</option>
          </select>
        </div>

        {/* Locality */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-500 mb-1">Locality</label>
          <select 
            value={filters.locality}
            onChange={handleLocalityChange}
            className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5"
          >
            <option value="ALL">All Kawardha</option>
            {LOCALITIES.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Price Slider */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Max Rent: <span className="text-orange-600 font-bold">₹{filters.maxPrice}</span>
          </label>
          <input 
            type="range" 
            min="1500" 
            max="10000" 
            step="500"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>₹1.5k</span>
            <span>₹10k+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;