
import React, { useState } from 'react';
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
        case RoomType.GIRLS: return 'bg-pink-600';
        case RoomType.FAMILY: return 'bg-indigo-600';
        case RoomType.BACHELOR: return 'bg-blue-600';
        default: return 'bg-orange-600';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full relative group overflow-hidden transform hover:-translate-y-1">
      
      {isAdmin && (
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <button onClick={onEdit} className="bg-white/90 backdrop-blur text-blue-600 p-2.5 rounded-xl shadow-lg hover:bg-blue-600 hover:text-white transition-all"><Edit size={18} /></button>
          <button onClick={onDelete} className="bg-white/90 backdrop-blur text-red-600 p-2.5 rounded-xl shadow-lg hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img src={listing.imageUrl} alt={listing.type} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-2xl text-lg font-black text-slate-900 shadow-xl border border-white/20">
          ₹{listing.rentPrice}<span className="text-[10px] text-slate-500 font-bold ml-1 uppercase">/month</span>
        </div>
        
        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          <span className={`w-fit px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg text-white shadow-lg ${getBadgeColor(listing.type)}`}>
            {listing.type}
          </span>
          {listing.isVerified && (
            <span className="w-fit px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg bg-green-500 text-white flex items-center shadow-lg">
              <ShieldCheck size={12} className="mr-1.5" /> {t.verified}
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-orange-600 mb-1">
             <MapPin size={14} className="flex-shrink-0" />
             <h3 className="text-xl font-black text-slate-900 leading-none">{listing.locality}</h3>
          </div>
          <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-2 min-h-[40px]">{listing.address}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {listing.amenities.map((amenity, index) => (
              <span key={index} className="inline-flex items-center bg-slate-50 text-slate-600 text-[11px] font-bold px-3 py-1.5 rounded-xl border border-slate-100 transition-colors hover:bg-orange-50 hover:border-orange-100">
                <span className="mr-1.5 text-orange-500">{getAmenityIcon(amenity)}</span>
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 mt-auto border-t border-slate-50 space-y-3">
           {!isAdmin && onBook && (
             <button onClick={onBook} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-100 group">
                <CalendarCheck size={18} className="group-hover:scale-110 transition-transform" /> {t.bookInterest}
             </button>
           )}

          {!showContact ? (
            <button onClick={() => setShowContact(true)} className="w-full bg-white text-slate-600 border border-slate-200 py-3.5 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center text-sm">
              <Phone size={16} className="mr-2" /> {t.viewContact}
            </button>
          ) : (
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 text-center animate-fade-in">
              <div className="flex items-center justify-center gap-2 mb-1 text-slate-400">
                 <User size={12} />
                 <p className="text-[10px] font-black uppercase tracking-wider">Property Owner</p>
              </div>
              <p className="text-sm text-slate-800 font-black mb-1">{listing.contactPerson}</p>
              <a href={`tel:${listing.contactNumber}`} className="text-xl font-black text-orange-600 block hover:underline tracking-tight">
                {listing.contactNumber}
              </a>
              <div className="mt-2 bg-white/50 py-1 rounded-lg text-[10px] text-slate-500 font-bold px-2">
                 {language === 'HI' ? 'कॉल करते समय "रूम साथी" का नाम लें।' : 'Mention "Room Saathi" when calling.'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
