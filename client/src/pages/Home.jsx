import React, { useState } from 'react';
import { 
  Sparkles, 
  Navigation, 
  ShieldCheck, 
  QrCode, 
  Award, 
  Zap, 
  ArrowRight, 
  Search, 
  MapPin, 
  Calendar, 
  Star,
  CheckCircle2,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { VehicleCard } from '../components/VehicleCard';

export const Home = ({ 
  vehicles = [], 
  onSelectVehicle, 
  onOpenDetails, 
  onOpenAiWizard, 
  onOpenGpsTracker, 
  onGoToFleet 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [pickupCity, setPickupCity] = useState('All Hubs');

  const categories = ['All', 'Electric EV', 'Luxury SUV', 'Sports Car', 'Sedan', 'Convertible'];

  const filtered = vehicles.filter((v) => {
    if (selectedCategory !== 'All' && v.category !== selectedCategory) return false;
    if (pickupCity !== 'All Hubs' && !v.location?.city?.toLowerCase().includes(pickupCity.toLowerCase())) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        v.name.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        v.location?.city?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Glow background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-6 shadow-lg shadow-emerald-500/10">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Next-Gen Fleet Intelligence • 2026 Fleet Lineup</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Autonomous Luxury & <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Smart AI Vehicle Rentals
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Experience the future of mobility with instant AI vehicle matching, 10Hz live satellite telematics, dynamic demand pricing, and contactless 60-second QR express checkout.
          </p>

          {/* Quick Search Card Bar */}
          <div className="mt-10 max-w-4xl mx-auto glass-panel p-4 rounded-3xl shadow-2xl border border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              
              {/* Hub Location */}
              <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
                <label className="text-[10px] uppercase font-bold text-slate-400 flex items-center space-x-1 mb-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>Pickup Hub</span>
                </label>
                <select
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                >
                  <option value="All Hubs" className="bg-slate-900">All Premier Hubs</option>
                  <option value="San Francisco" className="bg-slate-900">San Francisco (SFO / FiDi)</option>
                  <option value="Los Angeles" className="bg-slate-900">Los Angeles (LAX / Beverly Hills)</option>
                  <option value="New York" className="bg-slate-900">New York (JFK / Manhattan)</option>
                  <option value="Miami" className="bg-slate-900">Miami (South Beach)</option>
                  <option value="Denver" className="bg-slate-900">Denver (Airport Hub)</option>
                </select>
              </div>

              {/* Category */}
              <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
                <label className="text-[10px] uppercase font-bold text-slate-400 flex items-center space-x-1 mb-1">
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  <span>Vehicle Tier</span>
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-slate-900">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Keyword Search */}
              <div className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800 flex items-center">
                <div className="flex-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 flex items-center space-x-1 mb-1">
                    <Search className="w-3 h-3 text-amber-400" />
                    <span>Search Model</span>
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Tesla, Porsche, Bronco..."
                    className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none placeholder-slate-600"
                  />
                </div>
              </div>

            </div>

            {/* Quick CTAs under search */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-4 text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Instant Confirmation</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Zero Cancellation Fees (24h)</span>
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={onOpenAiWizard}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-all flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Trip Match</span>
                </button>
                <button
                  onClick={onGoToFleet}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center space-x-1.5 shadow-md shadow-emerald-500/20"
                >
                  <span>Browse Full Fleet ({vehicles.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-white mb-1.5">AI Fleet Match</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our neural matching engine analyzes passenger load, luggage, route terrain, and budget to pinpoint your dream vehicle in seconds.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <Navigation className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-base font-extrabold text-white mb-1.5">Live GPS Telematics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Track real-time speed, battery/fuel levels, route trajectories, and geofencing boundaries directly from your dashboard.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-white mb-1.5">Smart Dynamic Pricing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transparent real-time rates with duration discounts up to 20%, weekend surge balancing, and zero hidden add-on costs.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-white mb-1.5">60s QR Express Boarding</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sign your digital agreement on our HTML5 pad, receive an encrypted QR pass, and scan to drive away in under 60 seconds.
            </p>
          </div>

        </div>
      </section>

      {/* Featured Fleet Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <span>Curated Fleet</span>
              <span>•</span>
              <span>Available for Immediate Dispatch</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Featured Luxury & Performance Cars
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicles Grid */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center bg-slate-900/40 rounded-3xl border border-slate-800">
            <p className="text-base text-slate-400">No vehicles match your selected filter.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setPickupCity('All Hubs'); }}
              className="mt-3 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(0, 6).map((vehicle) => (
              <VehicleCard
                key={vehicle._id}
                vehicle={vehicle}
                onSelectForBooking={onSelectVehicle}
                onOpenDetails={onOpenDetails}
                onOpenTelematics={onOpenGpsTracker}
              />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <button
            onClick={onGoToFleet}
            className="px-8 py-3 rounded-2xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white border border-slate-700/80 transition-all hover:scale-105 inline-flex items-center space-x-2 shadow-xl"
          >
            <span>View All {vehicles.length} Vehicles in Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* RideMiles Loyalty Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              <Award className="w-3.5 h-3.5" />
              <span>RideMiles™ Rewards Program</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Earn Points on Every Mile. Unlock VIP Upgrades.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every $10 spent earns 10 RideMiles points. Progress through Bronze, Silver, Gold, and Platinum tiers to unlock complimentary vehicle upgrades, zero cancellation fees, and instant discounts applied at checkout.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="font-bold text-slate-300 block">Bronze</span>
                <span className="text-[11px] text-slate-500">Welcome bonus</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span className="font-bold text-slate-200 block">Silver</span>
                <span className="text-[11px] text-slate-400">5% Discount</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-amber-500/30">
                <span className="font-bold text-amber-400 block">Gold</span>
                <span className="text-[11px] text-amber-300/80">10% + Free Upgrade</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-purple-500/30">
                <span className="font-bold text-purple-400 block">Platinum</span>
                <span className="text-[11px] text-purple-300/80">15% + Concierge</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

