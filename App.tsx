
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
import { FilterState, Listing, ViewState, Booking } from './types';
import { SearchX } from 'lucide-react';

function App() {
  // App Navigation State
  const [currentView, setCurrentView] = useState<ViewState>('LANDING');

  // Application Data State
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS || []);
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  // Filtering
  const [filters, setFilters] = useState<FilterState>({
    maxPrice: 8000,
    roomType: 'ALL',
    locality: 'ALL'
  });
  
  // Customer Subscription State
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Forms & Modals State
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [bookingListing, setBookingListing] = useState<Listing | null>(null); // Room user is trying to book

  // --- LOGIC: LISTINGS ---
  const handleAddListing = (newListing: Listing) => {
    setListings(prev => [newListing, ...prev]);
    setShowAddForm(false);
  };

  const handleUpdateListing = (updatedListing: Listing) => {
    setListings(prev => prev.map(l => l.id === updatedListing.id ? updatedListing : l));
    setEditingListing(null);
  };

  const handleDeleteListing = (id: string) => {
    if (confirm('Are you sure you want to delete this room?')) {
      setListings(prev => prev.filter(l => l.id !== id));
    }
  };

  // --- LOGIC: BOOKINGS ---
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
    alert('Booking Request Sent! Admin will contact you.');
  };

  const handleUpdateBookingStatus = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const filteredListings = useMemo(() => {
    if (!listings) return [];
    return listings.filter(listing => {
      if (listing.rentPrice > filters.maxPrice) return false;
      if (filters.roomType !== 'ALL' && listing.type !== filters.roomType) return false;
      if (filters.locality !== 'ALL' && listing.locality !== filters.locality) return false;
      return true;
    });
  }, [filters, listings]);

  // --- RENDER: LANDING PAGE ---
  if (currentView === 'LANDING') {
    return <LandingPage onNavigate={setCurrentView} />;
  }

  // --- RENDER: ADMIN INTERFACE ---
  if (currentView === 'ADMIN') {
    return (
      <>
        <AdminDashboard 
          listings={listings}
          bookings={bookings}
          onAdd={() => setShowAddForm(true)}
          onEdit={(l) => setEditingListing(l)}
          onDelete={handleDeleteListing}
          onUpdateBookingStatus={handleUpdateBookingStatus}
          onLogout={() => setCurrentView('LANDING')}
        />
        {/* Shared Form for Admin */}
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

  // --- RENDER: OWNER INTERFACE ---
  if (currentView === 'OWNER') {
    return (
      <>
        <OwnerDashboard 
          listings={listings} // In real app, filter by owner ID
          onAdd={() => setShowAddForm(true)}
          onLogout={() => setCurrentView('LANDING')}
        />
         {/* Shared Form for Owner (reusing admin form for simplicity) */}
        {showAddForm && (
           <AdminListingForm 
            onClose={() => setShowAddForm(false)} 
            onSubmit={handleAddListing} 
           />
        )}
      </>
    );
  }

  // --- RENDER: CUSTOMER INTERFACE ---
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onLogout={() => setCurrentView('LANDING')} 
        isSubscribed={isSubscribed}
      />
      
      {!isSubscribed ? (
        <SubscriptionGate onSubscribe={() => setIsSubscribed(true)} />
      ) : (
        <main className="max-w-6xl mx-auto px-4 pt-8 pb-12 flex-grow w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Find Rooms in Kawardha</h2>
            <p className="text-gray-500">
              Browse verified PGs, flats, and rooms. Book directly with confidence.
            </p>
          </div>

          <FilterBar filters={filters} setFilters={setFilters} />

          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-bold text-gray-900">{filteredListings.length}</span> premium results
            </p>
          </div>

          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings.map(listing => (
                <ListingCard 
                  key={listing.id} 
                  listing={listing} 
                  isAdmin={false} 
                  onBook={() => setBookingListing(listing)} // Trigger Modal
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-16 text-center flex flex-col items-center">
              <div className="bg-gray-50 p-6 rounded-full mb-6">
                <SearchX size={48} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No rooms found</h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">
                We couldn't find any listings matching your specific criteria.
              </p>
              <button 
                onClick={() => setFilters({ maxPrice: 10000, roomType: 'ALL', locality: 'ALL' })}
                className="text-orange-600 font-bold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      )}

      <Footer />

      {/* Booking Modal */}
      {bookingListing && (
        <BookingModal 
          listing={bookingListing} 
          onClose={() => setBookingListing(null)} 
          onConfirm={handleCreateBooking}
        />
      )}

      {/* AI Assistant (Only for subscribed customers) */}
      {isSubscribed && <AIAssistant />}
    </div>
  );
}

export default App;
