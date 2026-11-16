import React from 'react';
import { Car, ShieldCheck, MapPin, Phone, Mail, Award, Zap } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950">
                <Car className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Velocity<span className="text-emerald-400">Fleet</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Next-generation autonomous & luxury vehicle rentals powered by AI fleet intelligence, live satellite telematics, dynamic pricing, and contactless 60-second QR boarding.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Insured & Telematics-Secured</span>
              </div>
            </div>
          </div>

          {/* Quick Hubs */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Premier Hubs</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2 hover:text-emerald-400 cursor-pointer transition-colors">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>San Francisco SFO & FiDi</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-emerald-400 cursor-pointer transition-colors">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Los Angeles LAX & Beverly Hills</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-emerald-400 cursor-pointer transition-colors">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>New York JFK & Manhattan West</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-emerald-400 cursor-pointer transition-colors">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Miami South Beach Concierge</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-emerald-400 cursor-pointer transition-colors">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Denver High-Altitude Hub</span>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Features</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer transition-colors">AI Fleet Match Engine</li>
              <li className="hover:text-white cursor-pointer transition-colors">Live Satellite Telematics</li>
              <li className="hover:text-white cursor-pointer transition-colors">Dynamic Demand Pricing</li>
              <li className="hover:text-white cursor-pointer transition-colors">E-Signature Digital Lease</li>
              <li className="hover:text-white cursor-pointer transition-colors">Encrypted QR Check-In Pass</li>
              <li className="hover:text-white cursor-pointer transition-colors">RideMiles™ Loyalty Perks</li>
            </ul>
          </div>

          {/* Concierge & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">24/7 Concierge</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-300 font-medium">+1 (800) 835-FLEET</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>concierge@velocityfleet.com</span>
              </li>
              <li className="pt-1">
                <span className="text-xs bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-slate-300">
                  Avg. Dispatch: &lt;14 mins
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 VelocityFleet Systems Inc. Full-Stack Vehicle Rental & Telematics Platform. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-slate-400 cursor-pointer">Rental Terms</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Certifications</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

