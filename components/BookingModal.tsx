import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Listing } from '../types';

interface BookingModalProps {
  listing: Listing;
  onClose: () => void;
  onConfirm: (name: string, phone: string) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ listing, onClose, onConfirm }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      onConfirm(name, phone);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
        <div className="bg-orange-600 p-4 flex justify-between items-center text-white">
          <h3 className="font-bold text-lg">Book this Room</h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6 bg-orange-50 p-3 rounded-lg border border-orange-100">
             <img src={listing.imageUrl} className="w-12 h-12 rounded object-cover" alt="" />
             <div>
                <p className="font-bold text-gray-800 text-sm">{listing.type}</p>
                <p className="text-orange-600 text-xs font-bold">₹{listing.rentPrice}/mo</p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
             <div>
               <label className="block text-xs font-bold text-gray-600 mb-1">Your Name</label>
               <input 
                 type="text" 
                 value={name}
                 onChange={e => setName(e.target.value)}
                 className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-orange-500 focus:ring-0 outline-none transition-colors"
                 placeholder="Enter your full name"
                 required
               />
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-600 mb-1">Phone Number</label>
               <input 
                 type="tel" 
                 value={phone}
                 onChange={e => setPhone(e.target.value)}
                 className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-orange-500 focus:ring-0 outline-none transition-colors"
                 placeholder="10 digit mobile number"
                 required
               />
             </div>
             
             <p className="text-[10px] text-gray-400 text-center px-4">
                Your request will be sent to the Admin. You will receive a call once approved.
             </p>

             <button 
               type="submit"
               className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
             >
               <CheckCircle size={18} /> Send Request
             </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;