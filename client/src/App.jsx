import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { VehiclesCatalog } from './pages/VehiclesCatalog';
import { BookingCheckout } from './pages/BookingCheckout';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { AIRecommendationModal } from './components/AIRecommendationModal';
import { GPSTrackerModal } from './components/GPSTrackerModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { QRPassModal } from './components/QRPassModal';

export const App = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [currentTab, setCurrentTab] = useState('home');
  const [vehicles, setVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);

  // Selected vehicle for checkout or inspection
  const [selectedVehicleForBooking, setSelectedVehicleForBooking] = useState(null);
  const [inspectedVehicle, setInspectedVehicle] = useState(null);

  // Modals state
  const [isAiWizardOpen, setIsAiWizardOpen] = useState(false);
  const [isGpsModalOpen, setIsGpsModalOpen] = useState(false);
  const [selectedVehicleForGps, setSelectedVehicleForGps] = useState(null);
  const [confirmedBookingForPass, setConfirmedBookingForPass] = useState(null);

  const fetchVehicles = async () => {
    setLoadingVehicles(true);
    try {
      const data = await api.getVehicles();
      setVehicles(data.vehicles || []);
    } catch (err) {
      console.error('Failed to load vehicles', err);
    } finally {
      setLoadingVehicles(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleStartBooking = (vehicle) => {
    if (!isAuthenticated) {
      setSelectedVehicleForBooking(vehicle);
      setCurrentTab('login');
      return;
    }
    setSelectedVehicleForBooking(vehicle);
    setCurrentTab('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingConfirmed = (newBooking) => {
    setConfirmedBookingForPass(newBooking);
    setCurrentTab('my-bookings');
  };

  const handleOpenGpsForVehicle = (vehicle) => {
    setSelectedVehicleForGps(vehicle || vehicles[0]);
    setIsGpsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAiWizard={() => setIsAiWizardOpen(true)}
        onOpenGpsTracker={() => handleOpenGpsForVehicle(vehicles[0])}
      />

      {/* Main Content Pages */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <Home
            vehicles={vehicles}
            onSelectVehicle={handleStartBooking}
            onOpenDetails={(v) => setInspectedVehicle(v)}
            onOpenAiWizard={() => setIsAiWizardOpen(true)}
            onOpenGpsTracker={handleOpenGpsForVehicle}
            onGoToFleet={() => {
              setCurrentTab('fleet');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'fleet' && (
          <VehiclesCatalog
            vehicles={vehicles}
            onSelectVehicle={handleStartBooking}
            onOpenDetails={(v) => setInspectedVehicle(v)}
            onOpenGpsTracker={handleOpenGpsForVehicle}
            onOpenAiWizard={() => setIsAiWizardOpen(true)}
          />
        )}

        {currentTab === 'checkout' && selectedVehicleForBooking && (
          <BookingCheckout
            vehicle={selectedVehicleForBooking}
            onBookingSuccess={handleBookingConfirmed}
            onCancel={() => setCurrentTab('fleet')}
          />
        )}

        {(currentTab === 'dashboard' || currentTab === 'my-bookings') && (
          <UserDashboard
            onOpenFleet={() => setCurrentTab('fleet')}
            onOpenAiWizard={() => setIsAiWizardOpen(true)}
          />
        )}

        {currentTab === 'admin' && (
          <AdminDashboard
            allVehicles={vehicles}
            onRefreshVehicles={fetchVehicles}
          />
        )}

        {currentTab === 'login' && (
          <Login
            onSwitchToRegister={() => setCurrentTab('register')}
            onLoginSuccess={() => {
              if (selectedVehicleForBooking) {
                setCurrentTab('checkout');
              } else {
                setCurrentTab('home');
              }
            }}
          />
        )}

        {currentTab === 'register' && (
          <Register
            onSwitchToLogin={() => setCurrentTab('login')}
            onRegisterSuccess={() => {
              if (selectedVehicleForBooking) {
                setCurrentTab('checkout');
              } else {
                setCurrentTab('home');
              }
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Innovative Features */}
      
      {/* 1. Vehicle Detail Modal */}
      <VehicleDetailModal
        vehicle={inspectedVehicle}
        onClose={() => setInspectedVehicle(null)}
        onBookNow={handleStartBooking}
      />

      {/* 2. AI Vehicle Recommendations Wizard Modal */}
      <AIRecommendationModal
        isOpen={isAiWizardOpen}
        onClose={() => setIsAiWizardOpen(false)}
        onSelectVehicle={(v) => {
          setIsAiWizardOpen(false);
          handleStartBooking(v);
        }}
      />

      {/* 3. Live GPS Telematics Modal */}
      <GPSTrackerModal
        isOpen={isGpsModalOpen}
        onClose={() => setIsGpsModalOpen(false)}
        selectedVehicle={selectedVehicleForGps}
        allVehicles={vehicles}
      />

      {/* 4. Instant Confirmation Boarding Pass Modal */}
      <QRPassModal
        isOpen={!!confirmedBookingForPass}
        onClose={() => setConfirmedBookingForPass(null)}
        booking={confirmedBookingForPass}
      />

      {/* 5. Chatbot Widget (RideBot AI) */}
      <ChatbotWidget
        onSelectVehicleForBooking={handleStartBooking}
        onOpenAiWizard={() => setIsAiWizardOpen(true)}
      />

    </div>
  );
};

