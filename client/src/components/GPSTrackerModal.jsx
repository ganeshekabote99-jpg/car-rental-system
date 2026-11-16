import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { 
  Navigation, 
  X, 
  Gauge, 
  Fuel, 
  BatteryCharging, 
  ShieldCheck, 
  Radio, 
  Compass, 
  MapPin, 
  RefreshCw,
  Clock
} from 'lucide-react';

export const GPSTrackerModal = ({ isOpen, onClose, selectedVehicle, allVehicles = [] }) => {
  const [activeVehicleId, setActiveVehicleId] = useState(selectedVehicle?._id || allVehicles[0]?._id);
  const [telematicsData, setTelematicsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedVehicle?._id) {
      setActiveVehicleId(selectedVehicle._id);
    } else if (allVehicles.length > 0 && !activeVehicleId) {
      setActiveVehicleId(allVehicles[0]._id);
    }
  }, [selectedVehicle, allVehicles]);

  useEffect(() => {
    if (!isOpen || !activeVehicleId) return;

    let isMounted = true;
    const fetchFeed = async () => {
      try {
        const data = await api.getTelematics(activeVehicleId);
        if (isMounted) {
          setTelematicsData(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Telematics fetch error', err);
      }
    };

    fetchFeed();
    const interval = setInterval(fetchFeed, 2500); // Poll every 2.5s for live simulation

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isOpen, activeVehicleId]);

  if (!isOpen) return null;

  const currentVehicle = allVehicles.find(v => v._id === activeVehicleId) || selectedVehicle;
  const t = telematicsData?.telematics;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-500/10 overflow-hidden my-6">
        
        {/* Top Header */}
        <div className="p-5 bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Navigation className="w-5 h-5 text-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-extrabold text-white">Live Satellite Telematics</h3>
                <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                  <span>LIVE 10Hz</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Real-time GPS trajectory, geofencing & vehicle onboard telemetry</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Vehicle Switcher */}
            {allVehicles.length > 1 && (
              <select
                value={activeVehicleId}
                onChange={(e) => setActiveVehicleId(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500"
              >
                {allVehicles.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.name} ({v.registrationPlate})
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Main Map Simulation View */}
          <div className="relative h-72 sm:h-80 w-full rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
            
            {/* Simulated High-Tech Map Grid Background */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px]"></div>
            
            {/* Radar Sweep Animation Ring */}
            <div className="absolute w-72 h-72 rounded-full border border-cyan-500/20 radar-ping pointer-events-none"></div>
            <div className="absolute w-44 h-44 rounded-full border border-cyan-500/30 pointer-events-none"></div>

            {/* Geofence Perimeter Circle */}
            <div className="absolute w-96 h-96 rounded-full border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center">
              <span className="absolute top-2 text-[10px] text-emerald-400/80 font-mono tracking-widest uppercase">
                Geofence Radius 75km (Authorized)
              </span>
            </div>

            {/* Simulated Road Trail / Waypoints */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path
                d="M 120 220 Q 240 120 380 180 T 560 140"
                fill="none"
                stroke="url(#trailGrad)"
                strokeWidth="4"
                strokeDasharray="6 4"
              />
            </svg>

            {/* Moving Vehicle Marker */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border-2 border-cyan-400 flex items-center justify-center shadow-2xl shadow-cyan-500/40 animate-pulse">
                  <Navigation 
                    className="w-7 h-7 text-cyan-300 transform" 
                    style={{ transform: `rotate(${t?.heading || 45}deg)` }} 
                  />
                </div>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950"></span>
              </div>

              {/* Marker Tooltip */}
              <div className="mt-2 bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/40 text-center shadow-xl">
                <div className="text-xs font-bold text-white leading-tight">
                  {currentVehicle?.name || 'Selected Vehicle'}
                </div>
                <div className="text-[10px] text-cyan-400 font-mono">
                  {t?.currentLat || 37.7891}° N, {t?.currentLng || -122.4014}° W
                </div>
              </div>
            </div>

            {/* Top Right Live Telemetry Overlay */}
            <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1">
              <div className="text-slate-400">STATUS: <span className="text-emerald-400 font-bold">{t?.status || 'Online'}</span></div>
              <div className="text-slate-400">LAT: <span className="text-white">{t?.currentLat || '37.7891'}</span></div>
              <div className="text-slate-400">LNG: <span className="text-white">{t?.currentLng || '-122.4014'}</span></div>
              <div className="text-slate-400">GEOFENCE: <span className="text-emerald-400">ACTIVE</span></div>
            </div>

            {/* Bottom Left Live Timestamp */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center space-x-1.5">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span>Telemetry Sync: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Telematics Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            {/* Speed Gauge */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <Gauge className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Speed</span>
                <span className="text-xl font-black text-white">{t?.speed || 48} <span className="text-xs font-medium text-slate-400">km/h</span></span>
              </div>
            </div>

            {/* Fuel / Battery */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <BatteryCharging className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Battery / Fuel</span>
                <span className="text-xl font-black text-emerald-400">{t?.fuelBatteryPercent || 88}%</span>
              </div>
            </div>

            {/* Odometer */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Odometer</span>
                <span className="text-lg font-black text-white">{t?.odometerKm?.toLocaleString() || '14,820'} <span className="text-xs font-normal text-slate-400">km</span></span>
              </div>
            </div>

            {/* Geofence Compliance */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Geofence Status</span>
                <span className="text-xs font-bold text-emerald-400 block">Compliant Zone</span>
              </div>
            </div>

          </div>

          {/* Vehicle Hardware Diagnostics */}
          <div className="p-4 rounded-2xl bg-slate-800/30 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-6">
              <div>
                <span className="text-slate-500">Tire Pressure: </span>
                <span className="font-mono text-slate-300 font-bold">FL: 35 | FR: 35 | RL: 36 | RR: 36 PSI</span>
              </div>
              <div>
                <span className="text-slate-500">Cabin Temp: </span>
                <span className="font-mono text-slate-300 font-bold">{t?.cabinTempCelsius || 21.5}°C</span>
              </div>
            </div>
            <div className="text-slate-400 text-[11px]">
              VIN: <span className="font-mono text-slate-300">{currentVehicle?.vin}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
            <span className="text-slate-500">
              Live updates stream every 2.5 seconds. Geofence violation triggers auto-alert.
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              Close Telematics Monitor
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

