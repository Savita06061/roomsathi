
import React from 'react';
import { Listing, Language, User } from '../types';
import { Plus, LogOut, Home, Settings, Clock, CheckCircle, XCircle } from 'lucide-react';
import SubscriptionGate from './SubscriptionGate';

interface OwnerDashboardProps {
  listings: Listing[];
  onAdd: () => void;
  onLogout: () => void;
  isSubscribed: boolean;
  onSubscribe: () => void;
  language: Language;
  user: User | null;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ 
  listings, onAdd, onLogout, isSubscribed, onSubscribe, language, user 
}) => {
  if (!isSubscribed) {
    return (
      <div className="min-h-screen bg-white">
        <nav className="bg-blue-700 text-white shadow-lg p-4">
           <button onClick={onLogout} className="flex items-center gap-2 text-sm font-bold">
              <LogOut size={16} /> Exit Owner Panel
           </button>
        </nav>
        <SubscriptionGate language={language} onSubscribe={onSubscribe} mode="OWNER" />
      </div>
    );
  }

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
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden sm:flex items-center gap-2 bg-blue-800 px-3 py-1 rounded-full">
                <img src={user.avatar} alt="" className="w-5 h-5 rounded-full" />
                <span className="text-xs font-bold">{user.name}</span>
              </div>
            )}
            <button onClick={onLogout} className="flex items-center gap-1 text-sm bg-blue-800 hover:bg-blue-900 px-3 py-1.5 rounded-lg transition-colors">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {language === 'HI' ? `नमस्ते, ${user?.name?.split(' ')[0]}!` : `Welcome, ${user?.name?.split(' ')[0]}!`}
            </h2>
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
              <div key={listing.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col group hover:shadow-lg transition-shadow">
                 <div className="h-40 bg-gray-200 relative">
                    <img src={listing.imageUrl} alt="" className="w-full h-full object-cover" />
                    
                    {/* Status Badge Overlay */}
                    <div className="absolute top-2 right-2">
                       {listing.status === 'PENDING' && (
                          <span className="flex items-center gap-1 bg-yellow-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                             <Clock size={10} /> {language === 'HI' ? 'जाँच जारी है' : 'WAITING APPROVAL'}
                          </span>
                       )}
                       {listing.status === 'APPROVED' && (
                          <span className="flex items-center gap-1 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                             <CheckCircle size={10} /> {language === 'HI' ? 'सत्यापित' : 'LIVE & APPROVED'}
                          </span>
                       )}
                       {listing.status === 'REJECTED' && (
                          <span className="flex items-center gap-1 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                             <XCircle size={10} /> {language === 'HI' ? 'अस्वीकृत' : 'REJECTED'}
                          </span>
                       )}
                    </div>

                    <div className="absolute bottom-2 left-2 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
                      {listing.type}
                    </div>
                 </div>
                 <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-800">{listing.locality}</h4>
                      <span className="font-bold text-blue-600">₹{listing.rentPrice}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-1">{listing.address}</p>
                    
                    <div className="flex items-center justify-between text-[10px] text-gray-400 border-t pt-2 mt-auto">
                       <span>
                          Status: 
                          <span className={`ml-1 font-bold ${
                             listing.status === 'APPROVED' ? 'text-green-600' : 
                             listing.status === 'PENDING' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                             {listing.status}
                          </span>
                       </span>
                       <span className="opacity-50">ID: {listing.id}</span>
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
