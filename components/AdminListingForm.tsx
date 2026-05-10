import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Listing, RoomType, ListingStatus } from '../types';
import { LOCALITIES } from '../constants';
import { X, Save, Image as ImageIcon, MapPin, Phone, User, Info } from 'lucide-react';

interface AdminListingFormProps {
  listing?: Listing | null;
  onClose: () => void;
  onSave: (data: Listing) => void;
  language?: 'EN' | 'HI';
}

const AdminListingForm: React.FC<AdminListingFormProps> = ({ listing, onClose, onSave, language = 'HI' }) => {
  const isEditing = !!listing;
  
  const [formData, setFormData] = useState<Partial<Listing>>(listing || {
    type: RoomType.SINGLE,
    rentPrice: 2000,
    locality: LOCALITIES[0],
    address: '',
    amenities: [],
    contactPerson: '',
    contactNumber: '',
    imageUrl: 'https://picsum.photos/seed/room/800/600',
    isVerified: true,
    status: 'PENDING'
  });

  const [amenitiesString, setAmenitiesString] = useState(
    listing ? listing.amenities.join(', ') : 'Fan, Light, Water'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData: Listing = {
      id: listing?.id || Date.now().toString(),
      type: formData.type as RoomType,
      rentPrice: Number(formData.rentPrice),
      locality: formData.locality as string,
      address: formData.address || '',
      amenities: amenitiesString.split(',').map(s => s.trim()).filter(s => s),
      contactPerson: formData.contactPerson || 'Owner',
      contactNumber: formData.contactNumber || '',
      imageUrl: formData.imageUrl || '',
      isVerified: formData.isVerified || false,
      status: (formData.status as ListingStatus) || 'PENDING'
    };
    onSave(finalData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-900/60 z-[60] flex items-center justify-center p-4 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border border-white/20"
      >
        <div className="flex justify-between items-center p-8 border-b border-slate-50 sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
              {isEditing ? 'Edit Listing' : 'Add New Room'}
            </h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-1">WWW Global Database</p>
          </div>
          <motion.button 
            whileHover={{ rotate: 90, backgroundColor: '#f1f5f9' }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose} 
            className="p-3 rounded-2xl transition-all"
          >
            <X size={24} className="text-slate-400" />
          </motion.button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto scrollbar-hide">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                <Info size={12} /> Room Category
              </label>
              <select 
                value={formData.type} 
                onChange={e => setFormData({...formData, type: e.target.value as RoomType})}
                className="w-full bg-slate-50 border-2 border-slate-50 text-slate-900 text-sm font-bold rounded-2xl focus:border-orange-600 focus:bg-white block p-4 appearance-none outline-none transition-all"
              >
                {Object.values(RoomType).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                ₹ Monthly Rent
              </label>
              <input 
                type="number" 
                value={formData.rentPrice}
                onChange={e => setFormData({...formData, rentPrice: Number(e.target.value)})}
                className="w-full bg-slate-50 border-2 border-slate-50 text-slate-900 text-sm font-bold rounded-2xl focus:border-orange-600 focus:bg-white block p-4 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
             <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
               <MapPin size={12} /> Locality
             </label>
             <select 
                value={formData.locality} 
                onChange={e => setFormData({...formData, locality: e.target.value})}
                className="w-full bg-slate-50 border-2 border-slate-50 text-slate-900 text-sm font-bold rounded-2xl focus:border-orange-600 focus:bg-white block p-4 appearance-none outline-none transition-all"
              >
                {LOCALITIES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Full Address Vector
            </label>
            <input 
              type="text" 
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
              className="w-full bg-slate-50 border-2 border-slate-50 text-slate-900 text-sm font-bold rounded-2xl focus:border-orange-600 focus:bg-white block p-4 outline-none transition-all"
              placeholder="e.g. House 12, Near Temple"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              <ImageIcon size={12} /> Visual Asset URL
            </label>
            <input 
              type="text" 
              value={formData.imageUrl}
              onChange={e => setFormData({...formData, imageUrl: e.target.value})}
              className="w-full bg-slate-50 border-2 border-slate-50 text-slate-900 text-sm font-bold rounded-2xl focus:border-orange-600 focus:bg-white block p-4 outline-none transition-all"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  <User size={12} /> Point of Contact
                </label>
                <input 
                  type="text" 
                  value={formData.contactPerson}
                  onChange={e => setFormData({...formData, contactPerson: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-slate-50 text-slate-900 text-sm font-bold rounded-2xl focus:border-orange-600 focus:bg-white block p-4 outline-none transition-all"
                  required
                />
             </div>
             <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  <Phone size={12} /> Secure Mobile
                </label>
                <input 
                  type="text" 
                  value={formData.contactNumber}
                  onChange={e => setFormData({...formData, contactNumber: e.target.value})}
                  className="w-full bg-slate-50 border-2 border-slate-50 text-slate-900 text-sm font-bold rounded-2xl focus:border-orange-600 focus:bg-white block p-4 outline-none transition-all"
                  required
                />
             </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Amenities Matrix (comma separated)
            </label>
            <textarea 
              value={amenitiesString}
              onChange={e => setAmenitiesString(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-50 text-slate-900 text-sm font-bold rounded-2xl focus:border-orange-600 focus:bg-white block p-4 h-32 outline-none transition-all resize-none"
              placeholder="Fan, Cooler, Water..."
            />
          </div>

          <div className="pt-8 flex gap-4">
             <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button" 
                onClick={onClose}
                className="flex-1 bg-slate-100 text-slate-900 py-5 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all"
             >
               Cancel
             </motion.button>
             <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 bg-orange-600 text-white py-5 rounded-2xl font-black text-sm hover:bg-orange-700 flex justify-center items-center gap-3 shadow-xl shadow-orange-100 transition-all"
             >
               <Save size={20} />
               Commit Listing
             </motion.button>
          </div>

        </form>
      </motion.div>
    </motion.div>
  );
};

export default AdminListingForm;
