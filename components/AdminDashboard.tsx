import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Listing, Booking, ListingStatus, Language } from '../types';
import { Plus, Edit, Trash2, LogOut, CheckCircle, XCircle, Bell, Home, Settings, Users, BarChart3, Database, ShieldCheck, MapPin, Search, Sun, Moon } from 'lucide-react';

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
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  listings, bookings, onAdd, onEdit, onDelete, onUpdateListingStatus, onUpdateBookingStatus, onLogout, language, theme, setTheme
}) => {
  const [activeTab, setActiveTab] = useState<'LISTINGS' | 'BOOKINGS' | 'REQUESTS'>('LISTINGS');
  const [searchQuery, setSearchQuery] = useState('');

  const pendingListings = listings.filter(l => l.status === 'PENDING');
  const filteredListings = listings.filter(l => 
    l.locality.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-orange-100">
      {/* Premium Admin Nav */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-slate-900 text-white shadow-2xl sticky top-0 z-50 py-8"
      >
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="bg-orange-600 p-3 rounded-2xl shadow-2xl shadow-orange-900/40"
            >
              <ShieldCheck size={28} />
            </motion.div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter leading-none">Command <span className="text-orange-500">Center</span></h1>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] mt-1">Saathi Admin Protocol</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
             <div className="hidden md:flex items-center gap-4 px-5 py-2.5 bg-white/5 rounded-2xl border border-white/5">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">System Live</span>
             </div>
             {/* Light/Dark Toggle */}
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
               className="p-3.5 bg-white/10 text-orange-400 rounded-2xl border border-white/5 flex items-center justify-center cursor-pointer transition-colors"
               title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
             >
               {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
             </motion.button>

             <motion.button 
               whileHover={{ scale: 1.05, backgroundColor: '#ef4444' }}
               whileTap={{ scale: 0.95 }}
               onClick={onLogout}
               className="p-3.5 bg-white/10 text-white rounded-2xl transition-all border border-white/5 group"
             >
               <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
             </motion.button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-8 flex gap-12 mt-10">
           {[
             { id: 'LISTINGS', label: 'Inventory', icon: <Database size={18} />, count: listings.length },
             { id: 'REQUESTS', label: 'Approvals', icon: <Bell size={18} />, count: pendingListings.length, alert: true },
             { id: 'BOOKINGS', label: 'Leads', icon: <Users size={18} />, count: bookings.length },
           ].map((tab) => (
             <button 
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`relative pb-5 flex items-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'text-orange-500' : 'text-slate-500 hover:text-slate-300'}`}
             >
               {tab.icon}
               {tab.label}
               {tab.count > 0 && (
                 <motion.span 
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   className={`px-2.5 py-1 rounded-lg text-[9px] font-black ${tab.alert && tab.count > 0 ? 'bg-orange-600 text-white animate-pulse' : 'bg-white/10 text-slate-300'}`}
                 >
                   {tab.count}
                 </motion.span>
               )}
               {activeTab === tab.id && (
                 <motion.div 
                   layoutId="activeTab"
                   className="absolute bottom-0 left-0 w-full h-1.5 bg-orange-600 rounded-t-full shadow-[0_-4px_15px_rgba(234,88,12,0.6)]"
                 ></motion.div>
               )}
             </button>
           ))}
        </div>
      </motion.nav>

      <main className="max-w-7xl mx-auto px-8 py-16 flex-1 w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'LISTINGS' && (
            <motion.div 
              key="listings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Bento Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { label: 'Total Inventory', val: listings.length, color: 'text-slate-900' },
                  { label: 'Verified Live', val: listings.filter(l => l.status === 'APPROVED').length, color: 'text-green-600' },
                  { label: 'Revenue Pulse', val: `₹${(listings.length * 199).toLocaleString()}`, color: 'text-blue-600' },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100"
                  >
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{stat.label}</p>
                    <h2 className={`text-6xl font-black tracking-tighter ${stat.color}`}>{stat.val}</h2>
                  </motion.div>
                ))}
                <motion.button 
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onAdd}
                  className="bg-orange-600 p-10 rounded-[3rem] shadow-2xl shadow-orange-200 text-white group hover:bg-orange-700 transition-all flex flex-col justify-between items-start text-left"
                >
                  <Plus size={40} className="group-hover:rotate-90 transition-transform" />
                  <div>
                     <h3 className="text-3xl font-black leading-none mb-2 tracking-tighter">New Entry</h3>
                     <p className="text-[10px] font-bold text-orange-100 uppercase tracking-widest">Manual Listing Mode</p>
                  </div>
                </motion.button>
              </div>

              {/* High-End Table */}
              <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                     <Database size={24} className="text-orange-500" /> System Database
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search locality or type..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-50 border-2 border-slate-50 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold focus:border-orange-600 focus:bg-white outline-none transition-all w-full md:w-80"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] bg-slate-50/50">
                        <th className="px-10 py-8">Status</th>
                        <th className="px-10 py-8">Listing Profile</th>
                        <th className="px-10 py-8">Location Vector</th>
                        <th className="px-10 py-8 text-right">Operations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <AnimatePresence mode="popLayout">
                        {filteredListings.map((listing) => (
                          <motion.tr 
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={listing.id} 
                            className="hover:bg-slate-50/50 transition-colors group"
                          >
                            <td className="px-10 py-8">
                               <span className={`text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest border ${
                                 listing.status === 'APPROVED' ? 'bg-green-50 text-green-600 border-green-100' :
                                 listing.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                                 'bg-red-50 text-red-600 border-red-100'
                               }`}>
                                 {listing.status}
                               </span>
                            </td>
                            <td className="px-10 py-8">
                              <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden shadow-xl border-4 border-white">
                                   <img src={listing.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div>
                                  <p className="font-black text-slate-900 text-lg leading-none mb-1.5 tracking-tight">{listing.type}</p>
                                  <p className="text-sm text-orange-600 font-black tracking-tight">₹{listing.rentPrice.toLocaleString()}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-10 py-8">
                              <div className="space-y-1.5">
                                <p className="font-black text-base text-slate-900 leading-none tracking-tight">{listing.locality}</p>
                                <p className="text-xs text-slate-400 font-medium truncate max-w-[250px]">{listing.address}</p>
                              </div>
                            </td>
                            <td className="px-10 py-8 text-right">
                              <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                <motion.button 
                                  whileHover={{ scale: 1.1, backgroundColor: '#dbeafe' }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => onEdit(listing)}
                                  className="p-3.5 text-blue-600 bg-blue-50 rounded-2xl transition-all"
                                >
                                  <Edit size={20} />
                                </motion.button>
                                <motion.button 
                                  whileHover={{ scale: 1.1, backgroundColor: '#fee2e2' }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => onDelete(listing.id)}
                                  className="p-3.5 text-red-600 bg-red-50 rounded-2xl transition-all"
                                >
                                  <Trash2 size={20} />
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'REQUESTS' && (
            <motion.div 
              key="requests"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
               <div className="text-center md:text-left">
                  <h3 className="text-5xl font-black text-slate-900 tracking-tighter mb-3">Pending Approvals</h3>
                  <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.4em]">Verification required for live status</p>
               </div>
               
               {pendingListings.length === 0 ? (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-32 rounded-[5rem] text-center shadow-2xl border border-slate-100 flex flex-col items-center"
                  >
                     <div className="bg-green-50 p-10 rounded-full text-green-500 mb-8 shadow-inner"><CheckCircle size={80} /></div>
                     <h4 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">System All Clear</h4>
                     <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">All properties have been verified.</p>
                  </motion.div>
               ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     {pendingListings.map(l => (
                        <motion.div 
                          layout
                          key={l.id} 
                          className="bg-white rounded-[4rem] p-10 shadow-2xl border border-slate-100 group"
                        >
                           <div className="flex items-center gap-8 mb-10">
                              <div className="relative">
                                <img src={l.imageUrl} className="w-40 h-40 rounded-[2.5rem] object-cover shadow-2xl group-hover:scale-105 transition-transform duration-700" alt="" />
                                <div className="absolute -top-4 -right-4 bg-orange-600 text-white p-3 rounded-2xl shadow-xl">
                                  <Bell size={20} className="animate-swing" />
                                </div>
                              </div>
                              <div>
                                 <h4 className="text-3xl font-black text-slate-900 leading-[1.1] mb-3 tracking-tighter">{l.type} <br/> <span className="text-orange-600">@ {l.locality}</span></h4>
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><MapPin size={12} /> {l.address}</p>
                                 <div className="bg-slate-50 px-5 py-2 rounded-2xl inline-block text-sm font-black text-slate-900 border border-slate-100 shadow-sm tracking-tight">₹{l.rentPrice.toLocaleString()}</div>
                              </div>
                           </div>
                           <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t border-slate-50">
                              <div className="flex-1">
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Owner Identity</p>
                                 <p className="font-black text-slate-900 text-lg tracking-tight mb-1">{l.contactPerson}</p>
                                 <a href={`tel:${l.contactNumber}`} className="text-orange-600 font-black text-sm hover:underline">{l.contactNumber}</a>
                              </div>
                              <div className="flex gap-3">
                                 <motion.button 
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onUpdateListingStatus(l.id, 'APPROVED')}
                                    className="bg-green-600 text-white px-8 py-5 rounded-2xl text-xs font-black hover:bg-green-700 shadow-xl shadow-green-100 transition-all flex items-center gap-2"
                                 >
                                    <CheckCircle size={18} /> Approve
                                 </motion.button>
                                 <motion.button 
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onUpdateListingStatus(l.id, 'REJECTED')}
                                    className="bg-slate-900 text-white px-8 py-5 rounded-2xl text-xs font-black hover:bg-red-600 transition-all flex items-center gap-2 shadow-xl"
                                 >
                                    <XCircle size={18} /> Reject
                                 </motion.button>
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               )}
            </motion.div>
          )}

          {activeTab === 'BOOKINGS' && (
             <motion.div 
               key="bookings"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="space-y-12"
             >
                <div className="flex items-center justify-between">
                  <div>
                     <h3 className="text-5xl font-black text-slate-900 tracking-tighter mb-3">Lead Hub</h3>
                     <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.4em]">Active customer booking requests</p>
                  </div>
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-100 text-orange-600"
                  >
                     <Users size={32} />
                  </motion.div>
                </div>
                
                <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                       <tr className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] bg-slate-50/50">
                          <th className="px-10 py-8">Customer Vector</th>
                          <th className="px-10 py-8">Inquiry Target</th>
                          <th className="px-10 py-8">Status</th>
                          <th className="px-10 py-8 text-right">Protocol</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {bookings.map(booking => {
                          const room = listings.find(l => l.id === booking.listingId);
                          return (
                             <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-10 py-8">
                                   <p className="font-black text-slate-900 text-lg tracking-tight mb-1">{booking.customerName}</p>
                                   <p className="text-sm text-slate-400 font-bold tracking-tight">{booking.customerPhone}</p>
                                </td>
                                <td className="px-10 py-8">
                                   {room ? (
                                      <div className="space-y-1">
                                         <p className="font-black text-slate-900 tracking-tight">{room.locality}</p>
                                         <p className="text-[10px] text-orange-600 font-black uppercase tracking-widest">{room.type} • ₹{room.rentPrice.toLocaleString()}</p>
                                      </div>
                                   ) : (
                                      <span className="text-red-500 font-black text-[10px] uppercase tracking-widest bg-red-50 px-3 py-1 rounded-lg">Property Deleted</span>
                                   )}
                                </td>
                                <td className="px-10 py-8">
                                   <span className={`px-5 py-2 text-[10px] font-black rounded-full uppercase tracking-widest border ${
                                      booking.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                                      booking.status === 'APPROVED' ? 'bg-green-50 text-green-600 border-green-100' :
                                      'bg-red-50 text-red-600 border-red-100'
                                   }`}>
                                      {booking.status}
                                   </span>
                                </td>
                                <td className="px-10 py-8 text-right">
                                   {booking.status === 'PENDING' ? (
                                      <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                         <motion.button 
                                            whileHover={{ scale: 1.1, backgroundColor: '#dcfce7' }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => onUpdateBookingStatus(booking.id, 'APPROVED')}
                                            className="p-3.5 text-green-600 bg-green-50 rounded-2xl transition-all"
                                         >
                                            <CheckCircle size={20} />
                                         </motion.button>
                                         <motion.button 
                                            whileHover={{ scale: 1.1, backgroundColor: '#fee2e2' }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => onUpdateBookingStatus(booking.id, 'REJECTED')}
                                            className="p-3.5 text-red-600 bg-red-50 rounded-2xl transition-all"
                                         >
                                            <XCircle size={20} />
                                         </motion.button>
                                      </div>
                                   ) : (
                                     <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Closed Lead</p>
                                   )}
                                </td>
                             </tr>
                          );
                       })}
                       {bookings.length === 0 && (
                         <tr>
                           <td colSpan={4} className="px-10 py-32 text-center text-slate-300 font-black uppercase tracking-[0.4em] text-xs">No active leads in database</td>
                         </tr>
                       )}
                    </tbody>
                  </table>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
