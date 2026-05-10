import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Listing, RoomType, Language } from '../types';
import { MapPin, Phone, CheckCircle, Wifi, Zap, Coffee, Edit, Trash2, CalendarCheck, ShieldCheck, User } from 'lucide-react';
import { translations } from '../translations';

interface ListingCardProps {
  listing: Listing;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onBook?: () => void;
  language?: Language;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, isAdmin, onEdit, onDelete, onBook, language = 'HI' }) => {
  const [showContact, setShowContact] = useState(false);
  const t = translations[language];

  const getAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi')) return <Wifi size={14} />;
    if (lower.includes('water') || lower.includes('electricity')) return <Zap size={14} />;
    if (lower.includes('food')) return <Coffee size={14} />;
    return <CheckCircle size={14} />;
  };

  const getBadgeColor = (type: RoomType) => {
    switch(type) {
        case RoomType.GIRLS: return 'bg-pink-500';
        case RoomType.FAMILY: return 'bg-orange-600';
        case RoomType.BACHELOR: return 'bg-blue-500';
        default: return 'bg-orange-500';
    }
  };

  return (
    <motion.div 
      layout
      className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative group overflow-hidden"
    >
      
      {isAdmin && (
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onEdit} className="bg-white text-blue-600 p-2.5 rounded-xl shadow-lg hover:bg-blue-600 hover:text-white transition-all"><Edit size={18} /></motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onDelete} className="bg-white text-red-600 p-2.5 rounded-xl shadow-lg hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></motion.button>
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={listing.imageUrl} 
          alt={listing.type} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-[1.5rem] shadow-xl border border-white/20 flex flex-col items-end">
          <div className="flex items-center gap-1.5 text-orange-600">
             <img src="https://cryptologos.cc/logos/aptos-apt-logo.svg?v=025" className="w-4 h-4" alt="APT" />
             <span className="text-xl font-black tracking-tighter">{(listing.rentPrice / 750).toFixed(2)} APT</span>
          </div>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">₹{listing.rentPrice}/mo</span>
        </div>
        
        <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
          <motion.span 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`w-fit px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-xl text-white ${getBadgeColor(listing.type)} shadow-lg border border-white/20`}
          >
            {listing.type}
          </motion.span>
          {listing.isVerified && (
            <motion.span 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-fit px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-xl bg-slate-900/40 backdrop-blur-md text-white flex items-center shadow-lg border border-white/10"
            >
              <ShieldCheck size={12} className="mr-1.5 text-orange-500" /> {language === 'HI' ? 'टीम द्वारा सत्यापित' : 'Verified by Team'}
            </motion.span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
             <MapPin size={16} className="flex-shrink-0" />
             <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none">{listing.locality}</h3>
          </div>
          <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-1 leading-relaxed">{listing.address}</p>

          {/* New Metadata Row */}
          <div className="grid grid-cols-2 gap-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
             <div>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Availablity</p>
                <p className="text-xs font-black text-slate-900 capitalize">Immediate</p>
             </div>
             <div className="border-l border-slate-200 pl-4">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Security</p>
                <p className="text-xs font-black text-slate-900 italic">Negotiable</p>
             </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {listing.amenities.map((amenity, index) => (
              <motion.span 
                key={index} 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center bg-white text-slate-600 text-[10px] font-black px-4 py-2 rounded-xl border border-slate-100 shadow-sm transition-all hover:border-orange-200 hover:text-orange-600 uppercase tracking-tight"
              >
                <span className="mr-2 opacity-50">{getAmenityIcon(amenity)}</span>
                {amenity}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-50 space-y-4">
           {!isAdmin && onBook && (
             <motion.button 
               whileHover={{ scale: 1.02, y: -2 }}
               whileTap={{ scale: 0.98 }}
               onClick={onBook} 
               className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-orange-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-orange-100"
             >
                <CalendarCheck size={20} /> {t.bookInterest}
             </motion.button>
           )}

          <AnimatePresence mode="wait">
            {!showContact ? (
              <motion.button 
                key="view-contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ backgroundColor: '#fff7ed' }}
                onClick={() => setShowContact(true)} 
                className="w-full bg-white text-orange-600 border-2 border-orange-100 py-4 rounded-2xl font-black flex items-center justify-center text-sm transition-all"
              >
                <Phone size={18} className="mr-2" /> {t.viewContact}
              </motion.button>
            ) : (
              <motion.div 
                key="contact-info"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-orange-600 rounded-2xl p-5 text-center shadow-xl shadow-orange-100"
              >
                <p className="text-[10px] text-orange-100 font-black uppercase tracking-[0.2em] mb-1">{listing.contactPerson}</p>
                <a href={`tel:${listing.contactNumber}`} className="text-2xl font-black text-white block hover:underline tracking-tighter">
                  {listing.contactNumber}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingCard;
