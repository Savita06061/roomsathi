import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import FilterBar from './components/FilterBar';
import ListingCard from './components/ListingCard';
import AIAssistant from './components/AIAssistant';
import SubscriptionGate from './components/SubscriptionGate';
import AdminListingForm from './components/AdminListingForm';
import AdminDashboard from './components/AdminDashboard';
import OwnerDashboard from './components/OwnerDashboard';
import LandingPage from './components/LandingPage';
import BookingModal from './components/BookingModal';
import AuthModal from './components/AuthModal';
import CompareDrawer from './components/CompareDrawer';
import RentBudgetPlanner from './components/RentBudgetPlanner';
import ReviewsModal from './components/ReviewsModal';
import AgreementGenerator from './components/AgreementGenerator';
import Web3EscrowVault from './components/Web3EscrowVault';
import Web3Passport from './components/Web3Passport';
import Web3StreamPay from './components/Web3StreamPay';
import { MOCK_LISTINGS } from './constants';
import { FilterState, Listing, ViewState, Booking, Language, ListingStatus, User, UserRole, Review } from './types';
import { translations } from './translations';
import { SearchX, Lock, Award, Zap, Home } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [currentView, setCurrentView] = useState<ViewState>('LANDING');
  const [language, setLanguage] = useState<Language>('HI');
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<UserRole | null>(null);
  const t = translations[language];

  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS || []);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    maxPrice: 8000,
    roomType: 'ALL',
    locality: 'ALL'
  });
  
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isOwnerSubscribed, setIsOwnerSubscribed] = useState(false);
  const [customerTab, setCustomerTab] = useState<'EXPLORE' | 'ESCROW' | 'PASSPORT' | 'STREAM'>('EXPLORE');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [bookingListing, setBookingListing] = useState<Listing | null>(null);
  const [comparedListingIds, setComparedListingIds] = useState<string[]>([]);
  const [activeReviewListing, setActiveReviewListing] = useState<Listing | null>(null);

  const comparedListings = useMemo(() => {
    return listings.filter(l => comparedListingIds.includes(l.id));
  }, [listings, comparedListingIds]);

  const handleToggleCompare = (id: string) => {
    setComparedListingIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleClearCompare = () => {
    setComparedListingIds([]);
  };

  const handleApplyBudgetFilter = (maxRent: number) => {
    setFilters(prev => ({ ...prev, maxPrice: maxRent }));
    setTimeout(() => {
      document.getElementById('search-filter-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAddReview = (listingId: string, newReview: Review) => {
    setListings(prev => prev.map(l => {
      if (l.id === listingId) {
        const updatedReviews = l.reviews ? [...l.reviews, newReview] : [newReview];
        const totalRating = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
        const avgRating = Number((totalRating / updatedReviews.length).toFixed(1));
        return {
          ...l,
          reviews: updatedReviews,
          rating: avgRating
        };
      }
      return l;
    }));
    
    setActiveReviewListing(prev => {
      if (prev && prev.id === listingId) {
        const updatedReviews = prev.reviews ? [...prev.reviews, newReview] : [newReview];
        const totalRating = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
        const avgRating = Number((totalRating / updatedReviews.length).toFixed(1));
        return {
          ...prev,
          reviews: updatedReviews,
          rating: avgRating
        };
      }
      return prev;
    });
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    // Strict Routing based on USER ROLE, not just the clicked button
    if (loggedInUser.role === 'ADMIN') {
      setCurrentView('ADMIN');
    } else if (loggedInUser.role === 'OWNER') {
      setCurrentView('OWNER');
    } else {
      setCurrentView('CUSTOMER');
    }
    setAuthMode(null);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('LANDING');
    setIsSubscribed(false);
    setIsOwnerSubscribed(false);
    setAuthMode(null);
  };

  const handleAddListing = (newListing: Listing) => {
    const entry: Listing = { 
      ...newListing, 
      status: (currentView === 'OWNER' ? 'PENDING' : 'APPROVED') as ListingStatus 
    };
    setListings(prev => [entry, ...prev]);
    setShowAddForm(false);
  };

  const handleUpdateListing = (updatedListing: Listing) => {
    setListings(prev => prev.map(l => l.id === updatedListing.id ? updatedListing : l));
    setEditingListing(null);
  };

  const handleUpdateListingStatus = (id: string, status: ListingStatus) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const handleDeleteListing = (id: string) => {
    if (confirm(language === 'HI' ? 'क्या आप वाकई इस कमरे को हटाना चाहते हैं?' : 'Are you sure you want to delete this room?')) {
      setListings(prev => prev.filter(l => l.id !== id));
    }
  };

  const handleCreateBooking = (customerName: string, customerPhone: string) => {
    if (!bookingListing) return;
    const newBooking: Booking = {
      id: Date.now().toString(),
      listingId: bookingListing.id,
      customerName,
      customerPhone,
      status: 'PENDING',
      date: new Date().toISOString()
    };
    setBookings(prev => [newBooking, ...prev]);
    setBookingListing(null);
    alert(language === 'HI' ? 'बुकिंग अनुरोध भेज दिया गया है! एडमिन आपसे संपर्क करेंगे।' : 'Booking Request Sent! Admin will contact you.');
  };

  const handleUpdateBookingStatus = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const filteredListings = useMemo(() => {
    if (!listings) return [];
    return listings.filter(listing => {
      if (listing.status !== 'APPROVED') return false;
      if (listing.rentPrice > filters.maxPrice) return false;
      if (filters.roomType !== 'ALL' && listing.type !== filters.roomType) return false;
      if (filters.locality !== 'ALL' && listing.locality !== filters.locality) return false;
      return true;
    });
  }, [filters, listings]);

  const renderView = () => {
    if (currentView === 'LANDING') {
      return (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage 
            onNavigate={setCurrentView} 
            onLoginCustomer={() => setAuthMode('CUSTOMER')} 
            onLoginOwner={() => setAuthMode('OWNER')}
            onLoginAdmin={() => setAuthMode('ADMIN')}
            user={user} 
            language={language}
            setLanguage={setLanguage}
            theme={theme}
            setTheme={setTheme}
          />
        </motion.div>
      );
    }

    if (currentView === 'ADMIN') {
      if (user?.role !== 'ADMIN') {
        setCurrentView('LANDING');
        return null;
      }
      return (
        <motion.div
          key="admin"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          <AdminDashboard 
            listings={listings} bookings={bookings}
            onAdd={() => setShowAddForm(true)}
            onEdit={(l) => setEditingListing(l)}
            onDelete={handleDeleteListing}
            onUpdateListingStatus={handleUpdateListingStatus}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onLogout={handleLogout}
            language={language}
            theme={theme}
            setTheme={setTheme}
          />
        </motion.div>
      );
    }

    if (currentView === 'OWNER') {
      if (user?.role !== 'OWNER' && user?.role !== 'ADMIN') {
        setCurrentView('LANDING');
        return null;
      }
      return (
        <motion.div
          key="owner"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          <OwnerDashboard 
            listings={listings}
            onAdd={() => setShowAddForm(true)}
            onLogout={handleLogout}
            isSubscribed={isOwnerSubscribed}
            onSubscribe={() => setIsOwnerSubscribed(true)}
            language={language}
            user={user}
            theme={theme}
            setTheme={setTheme}
          />
        </motion.div>
      );
    }

    // Default: CUSTOMER View
    return (
      <motion.div 
        key="customer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300"
      >
        <Header onLogout={handleLogout} user={user} language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} />
        <AnimatePresence mode="wait">
          {!isSubscribed ? (
            <motion.div
              key="subscription"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SubscriptionGate onSubscribe={() => setIsSubscribed(true)} language={language} mode="CUSTOMER" />
            </motion.div>
          ) : (
            <motion.main 
              key="customer-main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-6xl mx-auto px-4 pt-6 pb-12 flex-grow w-full"
            >
              {/* Web3 Navigation Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-200 dark:border-slate-800 no-scrollbar">
                <button
                  onClick={() => setCustomerTab('EXPLORE')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    customerTab === 'EXPLORE'
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850'
                  }`}
                >
                  <Home size={16} /> {language === 'HI' ? 'कमरे खोजें' : 'Explore Rooms'}
                </button>

                <button
                  onClick={() => setCustomerTab('ESCROW')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    customerTab === 'ESCROW'
                      ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-600/30'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850'
                  }`}
                >
                  <Lock size={16} /> {language === 'HI' ? 'स्मार्ट एस्क्रो' : 'Move Escrow Vault'}
                  <span className="bg-amber-500/20 text-amber-500 dark:text-amber-400 text-[9px] font-black px-1.5 py-0.5 rounded">NEW</span>
                </button>

                <button
                  onClick={() => setCustomerTab('PASSPORT')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    customerTab === 'PASSPORT'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850'
                  }`}
                >
                  <Award size={16} /> {language === 'HI' ? 'SBT पासपोर्ट' : 'SBT Tenant Passport'}
                  <span className="bg-indigo-500/20 text-indigo-500 dark:text-indigo-400 text-[9px] font-black px-1.5 py-0.5 rounded">SBT</span>
                </button>

                <button
                  onClick={() => setCustomerTab('STREAM')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    customerTab === 'STREAM'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-600/30'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850'
                  }`}
                >
                  <Zap size={16} /> {language === 'HI' ? 'रेंट स्ट्रीमिंग' : 'Crypto Rent Stream'}
                </button>
              </div>

              {/* Sub-View Content */}
              {customerTab === 'EXPLORE' && (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-2">
                      {language === 'HI' ? 'विश्व भर में कमरे खोजें' : 'Find Rooms Globally'}
                    </h2>
                    <p className="text-gray-500 dark:text-slate-400">
                      {language === 'HI' ? 'वेरिफाइड पीजी, फ्लैट और कमरे देखें।' : 'Browse verified rooms on Web3 & Aptos Move Network.'}
                    </p>
                  </div>

                  {/* Interactive Rent budget planning helper */}
                  <div className="mb-8">
                    <RentBudgetPlanner onApplyBudget={handleApplyBudgetFilter} language={language} />
                  </div>

                  <div id="search-filter-section" className="mb-4">
                    <FilterBar filters={filters} setFilters={setFilters} />
                  </div>

                  <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
                  >
                    <AnimatePresence mode="popLayout">
                      {filteredListings.length > 0 ? (
                        filteredListings.map(listing => (
                          <motion.div
                            key={listing.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ListingCard 
                              listing={listing} 
                              onBook={() => setBookingListing(listing)} 
                              language={language}
                              onViewReviews={() => setActiveReviewListing(listing)}
                              onToggleCompare={() => handleToggleCompare(listing.id)}
                              isCompared={comparedListingIds.includes(listing.id)}
                            />
                          </motion.div>
                        ))
                      ) : (
                        <motion.div 
                          key="no-results"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="col-span-full py-20 text-center"
                        >
                          <SearchX className="mx-auto text-gray-300 mb-2" size={48} />
                          <h3 className="font-bold">No rooms found.</h3>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Seamlessly Integrated Dual-Language Rental Agreement Generator */}
                  <AgreementGenerator language={language} />
                </>
              )}

              {customerTab === 'ESCROW' && (
                <Web3EscrowVault language={language} user={user} />
              )}

              {customerTab === 'PASSPORT' && (
                <Web3Passport language={language} user={user} />
              )}

              {customerTab === 'STREAM' && (
                <Web3StreamPay language={language} user={user} />
              )}
            </motion.main>
          )}
        </AnimatePresence>
        <Footer />
        {isSubscribed && <AIAssistant />}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300">
      <AnimatePresence mode="wait">
        {renderView()}
      </AnimatePresence>

      {/* Modals - Moved to top level to be accessible from any view */}
      <AnimatePresence>
        {authMode && (
          <AuthModal 
            mode={authMode} 
            onClose={() => setAuthMode(null)} 
            onLoginSuccess={handleLoginSuccess}
            language={language}
          />
        )}
         {bookingListing && (
          <BookingModal 
            listing={bookingListing} 
            onClose={() => setBookingListing(null)} 
            onConfirm={handleCreateBooking}
            language={language}
          />
        )}
        {activeReviewListing && (
          <ReviewsModal 
            isOpen={true}
            listing={activeReviewListing}
            onClose={() => setActiveReviewListing(null)}
            onAddReview={handleAddReview}
            language={language}
          />
        )}
        {(showAddForm || editingListing) && (
          <AdminListingForm 
            listing={editingListing || undefined}
            onClose={() => { setShowAddForm(false); setEditingListing(null); }}
            onSave={editingListing ? handleUpdateListing : handleAddListing}
            language={language}
          />
        )}
      </AnimatePresence>

      {/* Floating compare container for selected rooms */}
      {isSubscribed && comparedListings.length > 0 && (
         <CompareDrawer 
           comparedListings={comparedListings}
           onRemove={handleToggleCompare}
           onClearAll={handleClearCompare}
           onBook={(l) => setBookingListing(l)}
           language={language}
         />
      )}
    </div>
  );
}

export default App;
