import React, { useState } from 'react';
import { Listing, RoomType } from '../types';
import { MapPin, Phone, CheckCircle, Wifi, Zap, Coffee, Edit, Trash2, CalendarCheck } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onBook?: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, isAdmin, onEdit, onDelete, onBook }) => {
  const [showContact, setShowContact] = useState(false);

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
        case RoomType.FAMILY: return 'bg-purple-600';
        case RoomType.BACHELOR: return 'bg-blue-500';
        default: return 'bg-orange-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 flex flex-col h-full relative group">
      
      {/* Admin Action Buttons */}
      {isAdmin && (
        <div className="absolute top-2 left-2 z-10 flex gap-2">
          <button 
            onClick={onEdit}
            className="bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition-colors"
            title="Edit Listing"
          >
            <Edit size={16} />
          </button>
          <button 
            onClick={onDelete}
            className="bg-red-600 text-white p-2 rounded-full shadow hover:bg-red-700 transition-colors"
            title="Delete Listing"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      <div className="relative h-48">
        <img 
          src={listing.imageUrl} 
          alt={listing.type} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm">
          ₹{listing.rentPrice}/mo
        </div>
        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded text-white ${getBadgeColor(listing.type)}`}>
            {listing.type}
          </span>
          {listing.isVerified && (
            <span className="ml-2 px-2 py-1 text-xs font-semibold rounded bg-green-500 text-white flex items-center inline-flex">
              <CheckCircle size={12} className="mr-1" /> Verified
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{listing.locality}</h3>
          <div className="flex items-start text-gray-500 text-sm mb-3">
            <MapPin size={16} className="mr-1 mt-0.5 flex-shrink-0" />
            <p>{listing.address}</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {listing.amenities.map((amenity, index) => (
              <span key={index} className="inline-flex items-center bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded border border-gray-200">
                <span className="mr-1.5 text-orange-500">{getAmenityIcon(amenity)}</span>
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t pt-3 mt-2 space-y-2">
           {/* Booking Button (For Customer) */}
           {!isAdmin && onBook && (
             <button 
                onClick={onBook}
                className="w-full bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 shadow-orange-200 shadow-md"
             >
                <CalendarCheck size={18} />
                Book Interest
             </button>
           )}

          {/* Contact Toggle */}
          {!showContact ? (
            <button 
              onClick={() => setShowContact(true)}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center text-sm"
            >
              <Phone size={16} className="mr-2" />
              View Contact
            </button>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center animate-fade-in">
              <p className="text-xs text-green-800 font-medium mb-1">Owner: {listing.contactPerson}</p>
              <a href={`tel:${listing.contactNumber}`} className="text-lg font-bold text-green-700 block hover:underline">
                {listing.contactNumber}
              </a>
              <p className="text-[10px] text-gray-500 mt-1">Mention "Room Saathi" when calling.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;