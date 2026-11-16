import React from 'react';
import { 
  X, 
  Users, 
  Briefcase, 
  Fuel, 
  Gauge, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Calendar, 
  Check, 
  ArrowRight,
  BatteryCharging
} from 'lucide-react';

export const VehicleDetailModal = ({ vehicle, onClose, onBookNow }) => {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Hero Image Banner */}
        <div className="relative h-72 w-full bg-slate-950">
          <img
            src={vehicle.images?.[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                {vehicle.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {vehicle.name}
              </h2>
              <p className="text-xs text-slate-300 flex items-center space-x-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{vehicle.location?.address}, {vehicle.location?.city}</span>
              </p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-black text-white">${vehicle.dailyRate}</div>
              <div className="text-xs text-slate-400">/ day + tax</div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Specs Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 text-sm">
            <div>
              <span className="text-xs text-slate-500 block">Powertrain</span>
              <span className="font-bold text-white flex items-center space-x-1">
                <Fuel className="w-4 h-4 text-emerald-400" />
                <span>{vehicle.fuelType}</span>
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Transmission</span>
              <span className="font-bold text-white flex items-center space-x-1">
                <Gauge className="w-4 h-4 text-cyan-400" />
                <span>{vehicle.transmission}</span>
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Capacity</span>
              <span className="font-bold text-white flex items-center space-x-1">
                <Users className="w-4 h-4 text-amber-400" />
                <span>{vehicle.seats} Seats / {vehicle.luggageCapacity} Bags</span>
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Performance</span>
              <span className="font-bold text-white text-xs truncate block">
                {vehicle.rangeOrMpg}
              </span>
            </div>
          </div>

          {/* Registration & Telematics Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-800/40 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center space-x-4">
              <div>
                <span className="text-slate-500">License Plate: </span>
                <span className="font-mono font-bold text-slate-200">{vehicle.registrationPlate}</span>
              </div>
              <div>
                <span className="text-slate-500">VIN: </span>
                <span className="font-mono text-slate-400">{vehicle.vin}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-400 font-semibold">{vehicle.telematics?.status || 'Parked / Ready'}</span>
              <span className="text-slate-400">({vehicle.telematics?.fuelBatteryPercent}% Charge/Fuel)</span>
            </div>
          </div>

          {/* Premium Features List */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
              Included Premium Equipment & Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {vehicle.features?.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance & Rental Guarantee */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-cyan-950/20 border border-emerald-500/20 flex items-center space-x-3 text-xs text-slate-300">
            <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Full Digital Concierge Guarantee</p>
              <p className="text-slate-400">
                Contactless 60-second QR pickup, live satellite telematics, 24/7 complimentary roadside dispatch, and transparent zero-hidden-fee pricing.
              </p>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(vehicle);
              }}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02] flex items-center space-x-2"
            >
              <span>Proceed to Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

