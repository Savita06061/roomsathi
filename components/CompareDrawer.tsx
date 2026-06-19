import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle, ShieldCheck, Phone, Zap, Coffee, Wifi, CalendarCheck, Scaling } from 'lucide-react';
import { Listing, Language } from '../types';

interface CompareDrawerProps {
  comparedListings: Listing[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onBook: (listing: Listing) => void;
  language: Language;
}

const CompareDrawer: React.FC<CompareDrawerProps> = ({ 
  comparedListings, 
  onRemove, 
  onClearAll, 
  onBook, 
  language 
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (comparedListings.length === 0) return null;

  const isHindi = language === 'HI';

  return (
    <div className="fixed bottom-0 inset-x-0 z-[90] p-4 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <AnimatePresence>
          {!isExpanded ? (
            /* Compact Floating pill */
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 text-white rounded-[2rem] p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-xl"></div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="bg-orange-600 p-3 rounded-full text-white animate-pulse">
                  <Scaling size={20} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm tracking-tight">
                    {isHindi ? 'कमरों की तुलना' : 'Room Comparison'}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                    {comparedListings.length} {isHindi ? 'कमरे चुने गए हैं' : 'rooms selected'}
                  </p>
                </div>
              </div>

              {/* Thumbnails of selected */}
              <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-hide max-w-xs md:max-w-md">
                {comparedListings.map(listing => (
                  <div key={listing.id} className="relative flex-shrink-0 group">
                    <img 
                      src={listing.imageUrl} 
                      alt={listing.locality} 
                      className="w-10 h-10 object-cover rounded-xl border border-slate-700 shadow-sm"
                    />
                    <button 
                      onClick={() => onRemove(listing.id)}
                      className="absolute -top-1.5 -right-1.5 bg-red-650 hover:bg-red-700 text-white bg-red-600 rounded-full p-0.5 shadow-md cursor-pointer"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 relative z-10 w-full sm:w-auto">
                <button
                  onClick={onClearAll}
                  className="bg-slate-800 hover:bg-slate-750 text-slate-300 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-700 cursor-pointer"
                >
                  {isHindi ? 'साफ़ करें' : 'Clear All'}
                </button>
                <button
                  onClick={() => setIsExpanded(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-2 cursor-pointer transition-all"
                >
                  {isHindi ? 'अभी तुलना करें' : 'Compare Now'}
                  <ArrowRight size={14} className="animate-pulse" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* Full comparison Grid Overlay modal-like experience */
            <motion.div 
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="bg-slate-900 text-white p-6 flex justify-between items-center flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-600 p-2.5 rounded-xl text-white">
                    <Scaling size={20} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg tracking-tight">
                      {isHindi ? 'तुलनात्मक समीक्षा' : 'Side-by-Side Comparison'}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      {isHindi ? 'चुने गए बेहतरीन कमरे की तुलना करें' : 'Compare chosen rooms for a perfect match'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={onClearAll}
                    className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider cursor-pointer"
                  >
                    {isHindi ? 'सभी हटाएं' : 'Reset All'}
                  </button>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-2.5 bg-slate-800 hover:bg-slate-755 rounded-full border border-slate-700 transition-all text-white cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Comparison table block */}
              <div className="overflow-x-auto p-6 flex-1 scrollbar-hide">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <th className="py-4 text-xs font-black text-slate-400 uppercase tracking-widest w-1/4">
                        {isHindi ? 'विशेषताएं' : 'Specifications'}
                      </th>
                      {comparedListings.map(listing => (
                        <th key={listing.id} className="py-4 px-4 w-1/4 relative">
                          <div className="flex flex-col gap-2">
                            <div className="relative h-24 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
                              <img src={listing.imageUrl} alt={listing.locality} className="w-full h-full object-cover" />
                              <button 
                                onClick={() => onRemove(listing.id)}
                                className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 p-1.5 rounded-full text-white cursor-pointer transition-all"
                              >
                                <X size={12} />
                              </button>
                            </div>
                            <span className="text-sm font-black text-slate-900 dark:text-white leading-tight">
                              {listing.locality}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold leading-none capitalize">
                              {listing.type}
                            </span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-50 dark:border-slate-850">
                      <td className="py-4 text-xs font-black text-slate-400 uppercase tracking-widest">{isHindi ? 'मासिक किराया' : 'Monthly Rent'}</td>
                      {comparedListings.map(l => (
                        <td key={l.id} className="py-4 px-4 font-black text-slate-900 dark:text-white">
                          <p className="text-xl">₹{l.rentPrice}</p>
                          <p className="text-[10px] text-orange-600 font-black">{(l.rentPrice / 750).toFixed(2)} APT</p>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-slate-50 dark:border-slate-850">
                      <td className="py-4 text-xs font-black text-slate-400 uppercase tracking-widest">{isHindi ? 'सत्यापन स्थिति' : 'Verification'}</td>
                      {comparedListings.map(l => (
                        <td key={l.id} className="py-4 px-4">
                          {l.isVerified ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-black text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-3 py-1.5 rounded-xl border border-green-150">
                              <ShieldCheck size={14} /> {isHindi ? 'वेरिफाइड' : 'Verified'}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-black text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-950/40 px-3 py-1.5 rounded-xl">
                              {isHindi ? 'जांच जारी' : 'Pending Review'}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-slate-50 dark:border-slate-850">
                      <td className="py-4 text-xs font-black text-slate-400 uppercase tracking-widest">{isHindi ? 'पता' : 'Address'}</td>
                      {comparedListings.map(l => (
                        <td key={l.id} className="py-4 px-4 text-xs text-slate-600 dark:text-slate-350 font-bold leading-relaxed">
                          {l.address}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-slate-50 dark:border-slate-850">
                      <td className="py-4 text-xs font-black text-slate-400 uppercase tracking-widest">{isHindi ? 'रेटिंग स्कोर' : 'Rating'}</td>
                      {comparedListings.map(l => (
                        <td key={l.id} className="py-4 px-4">
                          <p className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1">
                            ⭐ <span className="text-orange-600 dark:text-orange-500">{l.rating || '4.0'}</span>
                            <span className="text-xs text-slate-400 font-bold">({l.reviews?.length || 0})</span>
                          </p>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-slate-50 dark:border-slate-850">
                      <td className="py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Amenities</td>
                      {comparedListings.map(l => (
                        <td key={l.id} className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {l.amenities.map((amenity, idx) => (
                              <span key={idx} className="bg-slate-50 dark:bg-slate-950/50 text-[9px] font-black tracking-tight px-2 py-1 rounded-md text-slate-500 dark:text-slate-450 border border-slate-100 dark:border-slate-800">
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="py-4"></td>
                      {comparedListings.map(l => (
                        <td key={l.id} className="py-4 px-4">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onBook(l)}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 w-full cursor-pointer shadow-lg shadow-orange-100 dark:shadow-none"
                          >
                            <CalendarCheck size={14} />
                            {isHindi ? 'बुक करें' : 'Book Now'}
                          </motion.button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CompareDrawer;
