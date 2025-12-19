
import React, { useState } from 'react';
import { Listing, Booking, ListingStatus, Language } from '../types';
import { Plus, Edit, Trash2, LogOut, CheckCircle, XCircle, Bell, Home } from 'lucide-react';

interface AdminDashboardProps {
  listings: Listing[];
  bookings: Booking[];
  onAdd: () => void;
  onEdit: (listing: Listing) => void;
  onDelete: (id: string) => void;
  onUpdateListingStatus: (id: string, status: ListingStatus) => void;
  onUpdateBookingStatus: (id: string, status: 'APPROVED' | 'REJECTED') => void;
  onLogout: () => void;
  language: Language;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  listings, bookings, onAdd, onEdit, onDelete, onUpdateListingStatus, onUpdateBookingStatus, onLogout, language
}) => {
  const [activeTab, setActiveTab] = useState<'LISTINGS' | 'BOOKINGS' | 'REQUESTS'>('LISTINGS');

  const pendingListings = listings.filter(l => l.status === 'PENDING');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-xs text-gray-400">Master Control Panel</p>
          </div>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-red-400 font-medium hover:text-red-300 transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
        
        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-4 flex gap-6 mt-2 overflow-x-auto scrollbar-hide">
           <button 
             onClick={() => setActiveTab('LISTINGS')}
             className={`whitespace-nowrap pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'LISTINGS' ? 'border-orange-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
           >
             All Rooms ({listings.length})
           </button>
           
           <button 
             onClick={() => setActiveTab('REQUESTS')}
             className={`whitespace-nowrap pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'REQUESTS' ? 'border-orange-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
           >
             Room Requests 
             {pendingListings.length > 0 && (
                <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                   {pendingListings.length}
                </span>
             )}
           </button>

           <button 
             onClick={() => setActiveTab('BOOKINGS')}
             className={`whitespace-nowrap pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'BOOKINGS' ? 'border-orange-500 text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
           >
             Bookings 
             {bookings.filter(b => b.status === 'PENDING').length > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                   {bookings.filter(b => b.status === 'PENDING').length}
                </span>
             )}
           </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {activeTab === 'LISTINGS' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Total Rooms</p>
                <h2 className="text-3xl font-bold text-gray-800">{listings.length}</h2>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Approved & Live</p>
                <h2 className="text-3xl font-bold text-green-600">{listings.filter(l => l.status === 'APPROVED').length}</h2>
              </div>
              <div className="bg-orange-600 p-6 rounded-xl shadow-lg text-white flex flex-col justify-center items-start cursor-pointer hover:bg-orange-700 transition-colors" onClick={onAdd}>
                <div className="flex items-center gap-2 font-bold text-lg mb-1">
                  <Plus size={24} /> Add Room
                </div>
                <p className="text-orange-100 text-sm">Post a new listing manually</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b bg-gray-50">
                <h3 className="font-bold text-gray-700">Database</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Property</th>
                      <th className="px-6 py-4 font-semibold">Location</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {listings.map((listing) => (
                      <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                           <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                             listing.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                             listing.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                             'bg-red-100 text-red-700'
                           }`}>
                             {listing.status}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={listing.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-200" />
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{listing.type}</p>
                              <p className="text-xs text-orange-600 font-bold">₹{listing.rentPrice}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            <p className="font-medium">{listing.locality}</p>
                            <p className="text-xs text-gray-400 truncate max-w-[150px]">{listing.address}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => onEdit(listing)}
                              className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => onDelete(listing.id)}
                              className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'REQUESTS' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="p-6 border-b bg-gray-50">
                <h3 className="font-bold text-gray-800 text-lg">New Room Approvals</h3>
                <p className="text-sm text-gray-500">Verify details before making listings live.</p>
             </div>
             
             {pendingListings.length === 0 ? (
                <div className="p-16 text-center text-gray-400 flex flex-col items-center">
                   <CheckCircle size={48} className="mb-4 text-green-200" />
                   <p>No pending room requests. Great job!</p>
                </div>
             ) : (
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="bg-gray-50 border-b text-xs text-gray-500 uppercase">
                            <th className="px-6 py-4">Property</th>
                            <th className="px-6 py-4">Owner Contact</th>
                            <th className="px-6 py-4 text-right">Decision</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         {pendingListings.map(l => (
                            <tr key={l.id} className="hover:bg-orange-50/30 transition-colors">
                               <td className="px-6 py-4">
                                  <div className="flex items-center gap-4">
                                     <img src={l.imageUrl} className="w-16 h-12 rounded object-cover shadow-sm" alt="" />
                                     <div>
                                        <p className="font-bold text-gray-800">{l.type} @ {l.locality}</p>
                                        <p className="text-xs text-gray-500">{l.address}</p>
                                        <p className="text-xs font-bold text-orange-600">Rent: ₹{l.rentPrice}</p>
                                     </div>
                                  </div>
                               </td>
                               <td className="px-6 py-4">
                                  <p className="font-bold text-sm text-gray-800">{l.contactPerson}</p>
                                  <a href={`tel:${l.contactNumber}`} className="text-xs text-blue-600 font-medium hover:underline">{l.contactNumber}</a>
                               </td>
                               <td className="px-6 py-4 text-right">
                                  <div className="flex justify-end gap-2">
                                     <button 
                                        onClick={() => onUpdateListingStatus(l.id, 'APPROVED')}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-green-700 flex items-center gap-1.5 shadow-sm"
                                     >
                                        <CheckCircle size={14} /> Approve
                                     </button>
                                     <button 
                                        onClick={() => onUpdateListingStatus(l.id, 'REJECTED')}
                                        className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-100 flex items-center gap-1.5"
                                     >
                                        <XCircle size={14} /> Reject
                                     </button>
                                  </div>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             )}
          </div>
        )}

        {activeTab === 'BOOKINGS' && (
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b bg-gray-50 flex items-center justify-between">
                <div>
                   <h3 className="font-bold text-gray-800 text-lg">Booking Requests</h3>
                   <p className="text-sm text-gray-500">Manage customer leads.</p>
                </div>
                <Bell className="text-gray-400" />
              </div>
              
              {bookings.length === 0 ? (
                 <div className="p-12 text-center text-gray-400">
                    No booking requests yet.
                 </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                       <tr className="bg-gray-50 border-b text-xs text-gray-500 uppercase">
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Customer</th>
                          <th className="px-6 py-4">Room</th>
                          <th className="px-6 py-4 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                       {bookings.map(booking => {
                          const room = listings.find(l => l.id === booking.listingId);
                          return (
                             <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                   <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                      booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                      booking.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                      'bg-red-100 text-red-700'
                                   }`}>
                                      {booking.status}
                                   </span>
                                </td>
                                <td className="px-6 py-4">
                                   <p className="font-bold text-gray-800 text-sm">{booking.customerName}</p>
                                   <p className="text-xs text-gray-500">{booking.customerPhone}</p>
                                </td>
                                <td className="px-6 py-4">
                                   {room ? (
                                      <div className="text-sm">
                                         <p className="font-medium text-gray-700">{room.locality}</p>
                                         <p className="text-xs text-gray-500">{room.type} - ₹{room.rentPrice}</p>
                                      </div>
                                   ) : (
                                      <span className="text-red-400 text-xs">Room Deleted</span>
                                   )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                   {booking.status === 'PENDING' && (
                                      <div className="flex justify-end gap-2">
                                         <button 
                                            onClick={() => onUpdateBookingStatus(booking.id, 'APPROVED')}
                                            className="bg-green-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-green-700"
                                         >
                                            Accept
                                         </button>
                                         <button 
                                            onClick={() => onUpdateBookingStatus(booking.id, 'REJECTED')}
                                            className="bg-red-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-red-700"
                                         >
                                            Reject
                                         </button>
                                      </div>
                                   )}
                                </td>
                             </tr>
                          );
                       })}
                    </tbody>
                  </table>
                </div>
              )}
           </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
