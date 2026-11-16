import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { QRPassModal } from '../components/QRPassModal';
import { GPSTrackerModal } from '../components/GPSTrackerModal';
import { 
  User, 
  Calendar, 
  Award, 
  Navigation, 
  QrCode, 
  FileText, 
  Clock, 
  ShieldCheck, 
  AlertCircle,
  XCircle,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react';

export const UserDashboard = ({ onOpenFleet, onOpenAiWizard }) => {
  const { user, refreshUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookingForQr, setSelectedBookingForQr] = useState(null);
  const [selectedVehicleForGps, setSelectedVehicleForGps] = useState(null);
  const [activeTab, setActiveTab] = useState('active');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await api.getMyBookings();
      setBookings(data);
    } catch (err) {
      console.error('Failed to load user bookings', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this reservation? Full refund will be initiated.')) return;
    try {
      await api.cancelBooking(bookingId);
      alert('Reservation cancelled and refund processed successfully.');
      fetchBookings();
      refreshUser();
    } catch (err) {
      alert(err.message || 'Failed to cancel reservation');
    }
  };

  const activeOrUpcoming = bookings.filter((b) => b.status === 'confirmed' || b.status === 'active');
  const pastOrCancelled = bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');

  const getTierBadge = (tier) => {
    switch (tier) {
      case 'Platinum':
        return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-extrabold';
      case 'Gold':
        return 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black';
      case 'Silver':
        return 'bg-slate-300 text-slate-900 font-bold';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* User Profile Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center space-x-5">
          <img
            src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'Guest')}`}
            alt="avatar"
            className="w-20 h-20 rounded-2xl border-2 border-emerald-500/40 object-cover shadow-xl"
          />
          <div>
            <div className="flex items-center space-x-2.5">
              <h2 className="text-2xl font-extrabold text-white">{user?.name}</h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs ${getTierBadge(user?.loyaltyTier)}`}>
                {user?.loyaltyTier || 'Bronze'} Member
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{user?.email} • {user?.phone || '+1 (555) 019-2831'}</p>
            <div className="flex items-center space-x-3 mt-2 text-xs">
              <span className="flex items-center space-x-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>DL Verified: {user?.drivingLicense?.number || 'DL-98241029'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Loyalty Reward Metric Block */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center space-x-5 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">RideMiles™ Balance</span>
            <span className="text-2xl font-black text-emerald-400">{user?.loyaltyPoints || 0} pts</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Value: ~${((user?.loyaltyPoints || 0) * 0.05).toFixed(2)} on next booking
            </span>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'active'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          Active & Upcoming Reservations ({activeOrUpcoming.length})
        </button>

        <button
          onClick={() => setActiveTab('past')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'past'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          Trip History & Past Invoices ({pastOrCancelled.length})
        </button>

        <button
          onClick={() => setActiveTab('perks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'perks'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          Loyalty Tier Status & Perks
        </button>
      </div>

      {/* Tab 1: Active & Upcoming Trips */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-400">Loading your reservations...</div>
          ) : activeOrUpcoming.length === 0 ? (
            <div className="py-16 text-center bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
              <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No active or upcoming reservations</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Ready for your next journey? Choose from our curated electric and luxury fleet.
              </p>
              <button
                onClick={onOpenFleet}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                Browse Fleet
              </button>
            </div>
          ) : (
            activeOrUpcoming.map((booking) => (
              <div
                key={booking._id}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl"
              >
                {/* Vehicle info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={booking.vehicle?.images?.[0]}
                    alt={booking.vehicle?.name}
                    className="w-28 h-20 object-cover rounded-2xl shrink-0"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        {booking.bookingId}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        booking.status === 'active'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 animate-pulse'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}>
                        {booking.status === 'active' ? '● In Trip / Active' : 'Confirmed'}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-white mt-1">
                      {booking.vehicle?.name}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center space-x-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{booking.pickupLocation}</span>
                    </p>
                  </div>
                </div>

                {/* Schedule & Price */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Pickup Date</span>
                    <span className="font-semibold text-white">{new Date(booking.pickupDate).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Return Date</span>
                    <span className="font-semibold text-white">{new Date(booking.returnDate).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Total Paid</span>
                    <span className="font-bold text-emerald-400 text-sm">${booking.pricing?.totalAmount}</span>
                  </div>
                </div>

                {/* Innovative Actions: QR Pass, GPS, Cancellation */}
                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                  
                  {/* Digital QR Pass */}
                  <button
                    onClick={() => setSelectedBookingForQr(booking)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 transition-all flex items-center space-x-1.5"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Digital QR Pass</span>
                  </button>

                  {/* Live GPS Telematics */}
                  <button
                    onClick={() => setSelectedVehicleForGps(booking.vehicle)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition-all flex items-center space-x-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5 animate-pulse" />
                    <span>Live GPS Telematics</span>
                  </button>

                  {/* Cancel Booking */}
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Past Trip History */}
      {activeTab === 'past' && (
        <div className="space-y-4">
          {pastOrCancelled.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">No past rental history recorded yet.</div>
          ) : (
            pastOrCancelled.map((booking) => (
              <div
                key={booking._id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-mono font-bold text-slate-300 block">{booking.bookingId}</span>
                  <span className="font-bold text-white text-sm">{booking.vehicle?.name}</span>
                  <span className="text-slate-400 block text-[11px]">
                    {new Date(booking.pickupDate).toLocaleDateString()} to {new Date(booking.returnDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    booking.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {booking.status}
                  </span>
                  <span className="block font-bold text-white text-sm mt-1">${booking.pricing?.totalAmount}</span>
                  <span className="text-[10px] text-slate-500">Invoice: {booking.payment?.invoiceNumber}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Loyalty Perks */}
      {activeTab === 'perks' && (
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-white">RideMiles™ Loyalty Status</h3>
              <p className="text-xs text-slate-400">Current tier: <strong className="text-emerald-400">{user?.loyaltyTier}</strong></p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-white">{user?.loyaltyPoints}</span>
              <span className="text-xs text-slate-400 block">Total Points</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="font-bold text-white text-sm mb-1">Bronze (0+ pts)</div>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• Instant digital pass pickup</li>
                <li>• Standard roadside support</li>
                <li>• Earn 10 pts per $10</li>
              </ul>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="font-bold text-slate-300 text-sm mb-1">Silver (500+ pts)</div>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• 5% instant discount</li>
                <li>• Free FastTrak toll waiver</li>
                <li>• Priority customer line</li>
              </ul>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30">
              <div className="font-bold text-amber-400 text-sm mb-1">Gold (1,000+ pts)</div>
              <ul className="text-xs text-amber-300/80 space-y-1">
                <li>• 10% instant discount</li>
                <li>• Complimentary vehicle class upgrade</li>
                <li>• Under-25 driver fee waived</li>
              </ul>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/30">
              <div className="font-bold text-purple-400 text-sm mb-1">Platinum (2,000+ pts)</div>
              <ul className="text-xs text-purple-300/80 space-y-1">
                <li>• 15% VIP discount</li>
                <li>• Zero cancellation fees anytime</li>
                <li>• 24/7 dedicated fleet concierge</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* QR Pass Modal */}
      <QRPassModal
        isOpen={!!selectedBookingForQr}
        onClose={() => setSelectedBookingForQr(null)}
        booking={selectedBookingForQr}
      />

      {/* GPS Telematics Modal */}
      <GPSTrackerModal
        isOpen={!!selectedVehicleForGps}
        onClose={() => setSelectedVehicleForGps(null)}
        selectedVehicle={selectedVehicleForGps}
      />

    </div>
  );
};

