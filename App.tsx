
import React, { useState, useMemo } from 'react';
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
import { MOCK_LISTINGS } from './constants';
import { FilterState, Listing, ViewState, Booking, Language, ListingStatus } from './types';
import { translations } from './translations';
import { SearchX } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('LANDING');
  const [language, setLanguage] = useState<Language>('HI');
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
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [bookingListing, setBookingListing] = useState<Listing | null>(null);

  const handleAddListing = (newListing: Listing) => {
    // New rooms added by owners are PENDING by default
    const entry = { ...newListing, status: currentView === 'OWNER' ? 'PENDING' : 'APPROVED' };
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
      // ONLY SHOW APPROVED LISTINGS TO CUSTOMERS
      if (listing.status !== 'APPROVED') return false;
      
      if (listing.rentPrice > filters.maxPrice) return false;
      if (filters.roomType !== 'ALL' && listing.type !== filters.roomType) return false;
      if (filters.locality !== 'ALL' && listing.locality !== filters.locality) return false;
      return true;
    });
  }, [filters, listings]);

  if (currentView === 'LANDING') {
    return <LandingPage onNavigate={setCurrentView} />;
  }

  if (currentView === 'ADMIN') {
    return (
      <>
        <AdminDashboard 
          listings={listings}
          bookings={bookings}
          onAdd={() => setShowAddForm(true)}
          onEdit={(l) => setEditingListing(l)}
          onDelete={handleDeleteListing}
          onUpdateListingStatus={handleUpdateListingStatus}
          onUpdateBookingStatus={handleUpdateBookingStatus}
          onLogout={() => setCurrentView('LANDING')}
          language={language}
        />
        {(showAddForm || editingListing) && (
           <AdminListingForm 
            listing={editingListing}
            onClose={() => { setShowAddForm(false); setEditingListing(null); }} 
            onSubmit={editingListing ? handleUpdateListing : handleAddListing} 
           />
        )}
      </>
    );
  }

  if (currentView === 'OWNER') {
    return (
      <>
        <OwnerDashboard 
          listings={listings}
          onAdd={() => setShowAddForm(true)}
          onLogout={() => setCurrentView('LANDING')}
          isSubscribed={isOwnerSubscribed}
          onSubscribe={() => setIsOwnerSubscribed(true)}
          language={language}
        />
        {showAddForm && (
           <AdminListingForm 
            onClose={() => setShowAddForm(false)} 
            onSubmit={handleAddListing} 
           />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onLogout={() => setCurrentView('LANDING')} 
        isSubscribed={isSubscribed}
        language={language}
        setLanguage={setLanguage}
      />
      
      {!isSubscribed ? (
        <SubscriptionGate onSubscribe={() => setIsSubscribed(true)} language={language} mode="CUSTOMER" />
      ) : (
        <main className="max-w-6xl mx-auto px-4 pt-8 pb-12 flex-grow w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {language === 'HI' ? 'कवर्धा में कमरे खोजें' : 'Find Rooms in Kawardha'}
            </h2>
            <p className="text-gray-500">
              {language === 'HI' ? 'वेरिफाइड पीजी, फ्लैट और कमरे देखें। विश्वास के साथ सीधे बुकिंग करें।' : 'Browse verified PGs, flats, and rooms. Book directly with confidence.'}
            </p>
          </div>

          <FilterBar filters={filters} setFilters={setFilters} />

          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {language === 'HI' ? 'कुल ' : 'Showing '} 
              <span className="font-bold text-gray-900">{filteredListings.length}</span> 
              {language === 'HI' ? ' परिणाम मिले' : ' premium results'}
            </p>
          </div>

          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings.map(listing => (
                <ListingCard 
                  key={listing.id} 
                  listing={listing} 
                  isAdmin={false} 
                  onBook={() => setBookingListing(listing)}
                  language={language}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-16 text-center flex flex-col items-center">
              <div className="bg-gray-50 p-6 rounded-full mb-6">
                <SearchX size={48} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{t.noRooms}</h3>
              <button 
                onClick={() => setFilters({ maxPrice: 10000, roomType: 'ALL', locality: 'ALL' })}
                className="text-orange-600 font-bold hover:underline"
              >
                {t.clearFilters}
              </button>
            </div>
          )}
        </main>
      )}

      <Footer />

      {bookingListing && (
        <BookingModal 
          listing={bookingListing} 
          onClose={() => setBookingListing(null)} 
          onConfirm={handleCreateBooking}
        />
      )}

      {isSubscribed && <AIAssistant />}
    </div>
  );
}

export default App;
