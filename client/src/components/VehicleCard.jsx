import React from 'react';
import { 
  Users, 
  Briefcase, 
  Fuel, 
  Gauge, 
  Star, 
  BatteryCharging, 
  MapPin, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const VehicleCard = ({ 
  vehicle, 
  onSelectForBooking, 
  onOpenDetails, 
  onOpenTelematics 
}) => {
  const isEV = vehicle.fuelType === 'Electric';

  return (
    <div className="group bg-slate-900/80 rounded-2xl border border-slate-800/80 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col overflow-hidden">
      
      {/* Top Image Banner */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-950">
        <img
          src={vehicle.images?.[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 pointer-events-none" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 shadow-md">
            {vehicle.category}
          </span>
        </div>

        {/* Fuel/Battery Telematics Pill */}
        <div className="absolute top-3 right-3 flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-950/85 backdrop-blur-md text-slate-200 border border-slate-700/80 shadow-md">
          {isEV ? (
            <>
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
              <span>{vehicle.telematics?.fuelBatteryPercent || 90}% Chg</span>
            </>
          ) : (
            <>
              <Fuel className="w-3.5 h-3.5 text-cyan-400" />
              <span>{vehicle.fuelType}</span>
            </>
          )}
        </div>

        {/* Location & Year */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 text-xs text-slate-300 bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-800">
          <MapPin className="w-3 h-3 text-emerald-400" />
          <span>{vehicle.location?.city} Hub</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Rating */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {vehicle.brand} • {vehicle.year}
              </span>
              <h3 className="text-lg font-extrabold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                {vehicle.name}
              </h3>
            </div>
            <div className="flex items-center space-x-1 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-lg shrink-0">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-amber-300">{vehicle.rating}</span>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 my-3 text-xs text-slate-300">
            <div className="flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>{vehicle.seats} Seats</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-500" />
              <span>{vehicle.luggageCapacity} Bags</span>
            </div>
            <div className="flex items-center space-x-1.5 truncate">
              <Gauge className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">{vehicle.transmission}</span>
            </div>
          </div>

          {/* Key Feature Highlight */}
          <p className="text-xs text-slate-400 line-clamp-1 mb-4 italic">
            "{vehicle.rangeOrMpg} — {vehicle.features?.[0]}"
          </p>
        </div>

        {/* Pricing & Actions */}
        <div>
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-black text-white">${vehicle.dailyRate}</span>
                <span className="text-xs text-slate-400 font-medium">/ day</span>
              </div>
              <span className="text-[11px] text-emerald-400 font-medium">
                ${vehicle.hourlyRate}/hr flexible
              </span>
            </div>

            {/* Live GPS quick button */}
            <button
              onClick={() => onOpenTelematics(vehicle)}
              title="Track Live Vehicle Telematics"
              className="px-2.5 py-1.5 text-xs font-medium text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-lg border border-cyan-500/30 transition-colors flex items-center space-x-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span>GPS</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenDetails(vehicle)}
              className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors text-center"
            >
              Details
            </button>
            <button
              onClick={() => onSelectForBooking(vehicle)}
              className="py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20 hover:scale-[1.02] flex items-center justify-center space-x-1"
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

