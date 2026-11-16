import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Car, 
  Sparkles, 
  RotateCcw,
  Users,
  Fuel,
  ArrowUpDown
} from 'lucide-react';
import { VehicleCard } from '../components/VehicleCard';

export const VehiclesCatalog = ({ 
  vehicles = [], 
  onSelectVehicle, 
  onOpenDetails, 
  onOpenGpsTracker, 
  onOpenAiWizard 
}) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [fuelType, setFuelType] = useState('All');
  const [transmission, setTransmission] = useState('All');
  const [minSeats, setMinSeats] = useState('All');
  const [maxPrice, setMaxPrice] = useState(400);
  const [sortBy, setSortBy] = useState('recommended');

  const categories = ['All', 'Electric EV', 'Luxury SUV', 'Sports Car', 'Sedan', 'Convertible', 'Minivan', 'Compact'];
  const fuelTypes = ['All', 'Electric', 'Hybrid', 'Petrol'];

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((v) => {
        if (category !== 'All' && v.category !== category) return false;
        if (fuelType !== 'All' && v.fuelType !== fuelType) return false;
        if (transmission !== 'All' && v.transmission !== transmission) return false;
        if (minSeats !== 'All' && v.seats < Number(minSeats)) return false;
        if (v.dailyRate > maxPrice) return false;
        if (search) {
          const q = search.toLowerCase();
          const matchName = v.name.toLowerCase().includes(q);
          const matchBrand = v.brand.toLowerCase().includes(q);
          const matchCity = v.location?.city?.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchCity) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.dailyRate - b.dailyRate;
        if (sortBy === 'price_desc') return b.dailyRate - a.dailyRate;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'year') return b.year - a.year;
        return 0; // recommended
      });
  }, [vehicles, category, fuelType, transmission, minSeats, maxPrice, search, sortBy]);

  const handleResetFilters = () => {
    setSearch('');
    setCategory('All');
    setFuelType('All');
    setTransmission('All');
    setMinSeats('All');
    setMaxPrice(400);
    setSortBy('recommended');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Title & AI Match CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            Available Vehicle Fleet
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse {vehicles.length} high-performance, electric, and luxury vehicles equipped with live telematics
          </p>
        </div>

        <button
          onClick={onOpenAiWizard}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 flex items-center space-x-2 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all w-fit"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Launch AI Trip Match Wizard</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4">
        
        {/* Top row: Search and Sort */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by brand, model, city hub (e.g. Tesla, Miami, SUV)..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated (4.9+)</option>
              <option value="year">Newest Year</option>
            </select>
          </div>
        </div>

        {/* Filter Pills and Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
          
          {/* Category */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 block uppercase mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Fuel Type */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 block uppercase mb-1">Powertrain</label>
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              {fuelTypes.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Min Seats */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 block uppercase mb-1">Min Seats</label>
            <select
              value={minSeats}
              onChange={(e) => setMinSeats(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="All">Any Seating</option>
              <option value="2">2+ Passengers</option>
              <option value="4">4+ Passengers</option>
              <option value="5">5+ Passengers</option>
              <option value="7">7+ Passengers</option>
            </select>
          </div>

          {/* Max Daily Rate Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Max Daily Rate</label>
              <span className="text-xs font-bold text-emerald-400">${maxPrice}/day</span>
            </div>
            <input
              type="range"
              min="80"
              max="400"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

        </div>

        {/* Status Count & Reset */}
        <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80">
          <span>Showing <strong className="text-white">{filteredVehicles.length}</strong> matching vehicles</span>
          
          <button
            onClick={handleResetFilters}
            className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>

      </div>

      {/* Vehicle Grid */}
      {filteredVehicles.length === 0 ? (
        <div className="py-20 text-center bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
          <Car className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No vehicles found matching these criteria</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your maximum price slider, category selection, or passenger count filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 text-white hover:bg-slate-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
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

    </div>
  );
};

