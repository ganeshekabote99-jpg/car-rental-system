import React, { useState } from 'react';
import { api } from '../services/api';
import { 
  Sparkles, 
  X, 
  Check, 
  ArrowRight, 
  Users, 
  Briefcase, 
  Zap, 
  Compass, 
  Star,
  Fuel,
  RefreshCw
} from 'lucide-react';

export const AIRecommendationModal = ({ isOpen, onClose, onSelectVehicle }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  // Form State
  const [tripType, setTripType] = useState('weekend_getaway');
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(2);
  const [priority, setPriority] = useState('maximum_comfort');
  const [budgetLevel, setBudgetLevel] = useState('moderate');
  const [distanceKm, setDistanceKm] = useState(200);

  if (!isOpen) return null;

  const handleRunAiRecommendation = async () => {
    setLoading(true);
    try {
      const data = await api.getAiRecommendations({
        tripType,
        passengers,
        luggage,
        priority,
        budgetLevel,
        distanceKm,
      });
      setResults(data);
      setStep(3); // Result step
    } catch (err) {
      console.error('AI Recommendation failed', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setResults(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl shadow-emerald-500/10 overflow-hidden my-8">
        
        {/* Glow Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">AI Fleet Concierge</h3>
              <p className="text-xs text-emerald-400 font-medium">Smart trip-matching recommendation engine</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-950/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          
          {loading ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin mx-auto" />
              <p className="text-base font-bold text-white">Analyzing Fleet Telematics & Engine Profiles...</p>
              <p className="text-xs text-slate-400">Comparing passenger cabin space, fuel efficiency, terrain capability, and daily rates</p>
            </div>
          ) : step === 1 ? (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-white block mb-2">1. What is the occasion for your trip?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'weekend_getaway', label: 'Weekend Getaway', icon: '🏖️' },
                    { id: 'business', label: 'Executive / Business', icon: '💼' },
                    { id: 'family_vacation', label: 'Family Vacation', icon: '👨‍👩‍👧‍👦' },
                    { id: 'adventure', label: 'Outdoor Adventure', icon: '🏕️' },
                    { id: 'luxury_event', label: 'Luxury Gala / Wedding', icon: '✨' },
                    { id: 'eco_commute', label: 'Eco Highway Trip', icon: '⚡' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTripType(t.id)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        tripType === t.id
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold shadow-md shadow-emerald-500/10'
                          : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-lg block mb-1">{t.icon}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Passengers & Bags */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center space-x-1.5">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Passengers: {passengers}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>1 solo</span>
                    <span>4 mid</span>
                    <span>8 max</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center space-x-1.5">
                    <Briefcase className="w-4 h-4 text-cyan-400" />
                    <span>Luggage Bags: {luggage}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={luggage}
                    onChange={(e) => setLuggage(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>1 bag</span>
                    <span>3 bags</span>
                    <span>6 large</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center space-x-2"
                >
                  <span>Next: Driving Priorities</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-6">
              <div>
                <label className="text-sm font-bold text-white block mb-2">2. What is your top priority for the vehicle?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'maximum_comfort', title: 'Maximum Luxury & Comfort', desc: 'Whisper-quiet acoustic cabin & premium massage seating' },
                    { id: 'eco_green', title: 'Zero Emissions / 100% EV', desc: 'Clean electric propulsion with ultra-fast highway supercharging' },
                    { id: 'speed_performance', title: 'Exhilaration & Speed', desc: 'Twin-turbo performance & razor-sharp sport steering' },
                    { id: 'offroad_rugged', title: 'All-Terrain & Trail Ready', desc: 'High ground clearance, 4WD, and trail cameras' },
                    { id: 'best_value', title: 'Maximum Daily Value', desc: 'Best daily rate and optimal fuel economy for long trips' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPriority(p.id)}
                      className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                        priority === p.id
                          ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                          : 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-bold text-emerald-400 mb-0.5">{p.title}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Bracket */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">3. Preferred Daily Rate Bracket</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'budget', label: 'Economy', range: '< $130/day' },
                    { id: 'moderate', label: 'Executive', range: '$130 - $240/day' },
                    { id: 'luxury', label: 'Ultra Luxury', range: '$240+/day' },
                  ].map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBudgetLevel(b.id)}
                      className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                        budgetLevel === b.id
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold'
                          : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-bold text-white">{b.label}</div>
                      <div className="text-[10px] text-slate-400">{b.range}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleRunAiRecommendation}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 transition-all flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Recommendations</span>
                </button>
              </div>
            </div>
          ) : (
            /* Results Step */
            <div className="space-y-5">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                <span>{results?.aiInsights}</span>
                <button
                  onClick={handleReset}
                  className="p-1 rounded-lg hover:bg-emerald-500/20 text-emerald-400 flex items-center space-x-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Adjust</span>
                </button>
              </div>

              {/* Recommendations Cards */}
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {results?.topRecommendations?.map((item, idx) => (
                  <div
                    key={item.vehicle._id}
                    className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row items-center gap-4"
                  >
                    <img
                      src={item.vehicle.images?.[0]}
                      alt={item.vehicle.name}
                      className="w-full sm:w-36 h-24 object-cover rounded-xl"
                    />

                    <div className="flex-1 w-full text-left">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-extrabold text-white">
                          {item.vehicle.name}
                        </h4>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          {item.matchScore}% Match
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 mt-1 flex items-center space-x-3">
                        <span>${item.vehicle.dailyRate}/day</span>
                        <span>•</span>
                        <span>{item.vehicle.seats} Seats</span>
                        <span>•</span>
                        <span>{item.vehicle.fuelType}</span>
                      </div>

                      <ul className="mt-2 space-y-1">
                        {item.pros.map((pro, pIdx) => (
                          <li key={pIdx} className="text-[11px] text-emerald-300/90 flex items-center space-x-1.5">
                            <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onSelectVehicle(item.vehicle);
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shrink-0 transition-all hover:scale-105"
                    >
                      Select Vehicle
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Close Wizard
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

