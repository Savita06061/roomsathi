
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
        case RoomType.GIRLS: return 'bg-pink-500';
        case RoomType.FAMILY: return 'bg-orange-600';
        case RoomType.BACHELOR: return 'bg-blue-500';
        default: return 'bg-orange-500';
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full relative group overflow-hidden">
      
      {isAdmin && (
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <button onClick={onEdit} className="bg-white text-blue-600 p-2 rounded-xl shadow-lg hover:bg-blue-600 hover:text-white transition-all"><Edit size={18} /></button>
          <button onClick={onDelete} className="bg-white text-red-600 p-2 rounded-xl shadow-lg hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-56">
        <img src={listing.imageUrl} alt={listing.type} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-xl text-lg font-black text-orange-600 shadow-lg">
          ₹{listing.rentPrice}<span className="text-[10px] text-gray-400 font-bold ml-1">/mo</span>
        </div>
        
        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          <span className={`w-fit px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg text-white ${getBadgeColor(listing.type)} shadow-lg`}>
            {listing.type}
          </span>
          {listing.isVerified && (
            <span className="w-fit px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg bg-green-500 text-white flex items-center shadow-lg">
              <ShieldCheck size={12} className="mr-1" /> {t.verified}
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
          <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-2">{listing.address}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {listing.amenities.map((amenity, index) => (
              <span key={index} className="inline-flex items-center bg-orange-50 text-orange-700 text-[11px] font-bold px-3 py-1 rounded-full border border-orange-100">
                <span className="mr-1.5">{getAmenityIcon(amenity)}</span>
                {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-50 space-y-3">
           {!isAdmin && onBook && (
             <button onClick={onBook} className="w-full bg-orange-600 text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-orange-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-100">
                <CalendarCheck size={18} /> {t.bookInterest}
             </button>
           )}

          {!showContact ? (
            <button onClick={() => setShowContact(true)} className="w-full bg-white text-orange-600 border border-orange-200 py-3.5 rounded-2xl font-bold hover:bg-orange-50 transition-all flex items-center justify-center text-sm">
              <Phone size={16} className="mr-2" /> {t.viewContact}
            </button>
          ) : (
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 text-center animate-fade-in">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">{listing.contactPerson}</p>
              <a href={`tel:${listing.contactNumber}`} className="text-xl font-black text-orange-600 block hover:underline">
                {listing.contactNumber}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
