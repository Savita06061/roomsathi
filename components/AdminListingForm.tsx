import React, { useState } from 'react';
import { Listing, RoomType } from '../types';
import { LOCALITIES } from '../constants';
import { X, Save } from 'lucide-react';

interface AdminListingFormProps {
  listing?: Listing | null;
  onClose: () => void;
  onSubmit: (data: Listing) => void;
}

const AdminListingForm: React.FC<AdminListingFormProps> = ({ listing, onClose, onSubmit }) => {
  const isEditing = !!listing;
  
  const [formData, setFormData] = useState<Partial<Listing>>(listing || {
    type: RoomType.SINGLE,
    rentPrice: 2000,
    locality: LOCALITIES[0],
    address: '',
    amenities: [],
    contactPerson: '',
    contactNumber: '',
    imageUrl: 'https://picsum.photos/400/300',
    isVerified: true
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
      isVerified: formData.isVerified || false
    };
    onSubmit(finalData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-800">
            {isEditing ? 'Edit Listing' : 'Add New Room'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Room Type</label>
              <select 
                value={formData.type} 
                onChange={e => setFormData({...formData, type: e.target.value as RoomType})}
                className="w-full border p-2 rounded-lg"
              >
                {Object.values(RoomType).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Rent (₹)</label>
              <input 
                type="number" 
                value={formData.rentPrice}
                onChange={e => setFormData({...formData, rentPrice: Number(e.target.value)})}
                className="w-full border p-2 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
             <label className="block text-xs font-semibold text-gray-600 mb-1">Locality</label>
             <select 
                value={formData.locality} 
                onChange={e => setFormData({...formData, locality: e.target.value})}
                className="w-full border p-2 rounded-lg"
              >
                {LOCALITIES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Full Address</label>
            <input 
              type="text" 
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
              className="w-full border p-2 rounded-lg"
              placeholder="e.g. House 12, Near Temple"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Image URL</label>
            <input 
              type="text" 
              value={formData.imageUrl}
              onChange={e => setFormData({...formData, imageUrl: e.target.value})}
              className="w-full border p-2 rounded-lg"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Owner Name</label>
                <input 
                  type="text" 
                  value={formData.contactPerson}
                  onChange={e => setFormData({...formData, contactPerson: e.target.value})}
                  className="w-full border p-2 rounded-lg"
                  required
                />
             </div>
             <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Mobile Number</label>
                <input 
                  type="text" 
                  value={formData.contactNumber}
                  onChange={e => setFormData({...formData, contactNumber: e.target.value})}
                  className="w-full border p-2 rounded-lg"
                  required
                />
             </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Amenities (comma separated)</label>
            <textarea 
              value={amenitiesString}
              onChange={e => setAmenitiesString(e.target.value)}
              className="w-full border p-2 rounded-lg h-20"
              placeholder="Fan, Cooler, Water..."
            />
          </div>

          <div className="pt-4 flex gap-3">
             <button 
                type="button" 
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300"
             >
               Cancel
             </button>
             <button 
                type="submit"
                className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 flex justify-center items-center gap-2"
             >
               <Save size={20} />
               Save Room
             </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminListingForm;