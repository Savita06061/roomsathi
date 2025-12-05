import React from 'react';
import { Listing } from '../types';
import { Plus, LogOut, Home, Settings } from 'lucide-react';

interface OwnerDashboardProps {
  listings: Listing[];
  onAdd: () => void;
  onLogout: () => void;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ listings, onAdd, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Home className="text-blue-200" />
            <div>
               <h1 className="font-bold text-lg leading-none">Owner Panel</h1>
               <p className="text-xs text-blue-200">Kawardha Room Saathi</p>
            </div>
          </div>
          <button onClick={onLogout} className="flex items-center gap-1 text-sm bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome, Landlord!</h2>
            <p className="text-gray-600">List your rooms here. Admin will verify them.</p>
          </div>
          <button 
            onClick={onAdd}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2"
          >
            <Plus size={20} /> Add New Room
          </button>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Settings size={20} className="text-blue-600" /> My Listings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.length > 0 ? (
            listings.map(listing => (
              <div key={listing.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
                 <div className="h-40 bg-gray-200 relative">
                    <img src={listing.imageUrl} alt="" className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {listing.type}
                    </div>
                 </div>
                 <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-800">{listing.locality}</h4>
                      <span className="font-bold text-blue-600">₹{listing.rentPrice}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">{listing.address}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 border-t pt-2">
                       <span>Status: <span className="text-green-600 font-medium">Active</span></span>
                       <span>ID: {listing.id}</span>
                    </div>
                 </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white p-12 rounded-xl text-center border-dashed border-2 border-gray-300">
               <Home size={40} className="mx-auto text-gray-300 mb-2" />
               <p className="text-gray-500">You haven't listed any rooms yet.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default OwnerDashboard;