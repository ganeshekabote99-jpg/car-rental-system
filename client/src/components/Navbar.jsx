import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Car, 
  Sparkles, 
  Navigation, 
  Award, 
  Calendar, 
  ShieldCheck, 
  User, 
  LogOut, 
  Menu, 
  X,
  Zap
} from 'lucide-react';

export const Navbar = ({ 
  currentTab, 
  setCurrentTab, 
  onOpenAiWizard, 
  onOpenGpsTracker 
}) => {
  const { user, isAuthenticated, isAdmin, logout, quickLogin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Platinum': return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white';
      case 'Gold': return 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 font-bold';
      case 'Silver': return 'bg-gradient-to-r from-slate-300 to-slate-400 text-slate-900 font-semibold';
      default: return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all">
              <Car className="w-6 h-6 text-slate-950 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Velocity<span className="text-emerald-400 font-black">Fleet</span>
              </span>
              <span className="block text-[10px] tracking-wider font-semibold text-emerald-400/90 uppercase">
                AI Telematics & Rentals
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setCurrentTab('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === 'home'
                  ? 'text-white bg-slate-800/90 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Explore
            </button>

            <button
              onClick={() => setCurrentTab('fleet')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === 'fleet'
                  ? 'text-white bg-slate-800/90 border border-slate-700'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Vehicles
            </button>

            {/* AI Wizard Quick Action */}
            <button
              onClick={onOpenAiWizard}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Match</span>
            </button>

            {/* Telematics Quick Action */}
            <button
              onClick={onOpenGpsTracker}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-all hover:scale-[1.02]"
            >
              <Navigation className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Live GPS</span>
            </button>

            {isAuthenticated && !isAdmin && (
              <button
                onClick={() => setCurrentTab('my-bookings')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === 'my-bookings'
                    ? 'text-white bg-slate-800/90 border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>My Trips</span>
              </button>
            )}

            {isAdmin && (
              <button
                onClick={() => setCurrentTab('admin')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-bold transition-all ${
                  currentTab === 'admin'
                    ? 'text-amber-400 bg-amber-500/20 border border-amber-500/40 shadow-sm shadow-amber-500/10'
                    : 'text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 border border-amber-500/20'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Hub</span>
              </button>
            )}
          </div>

          {/* Right Section: User & Auth */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-3 p-1.5 pl-3 rounded-full bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all"
                >
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-semibold text-slate-200 leading-tight">
                      {user?.name}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium">
                      {user?.loyaltyPoints || 0} pts • {user?.loyaltyTier || 'Bronze'}
                    </span>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${getTierColor(user?.loyaltyTier)}`}>
                    {user?.loyaltyTier || 'Member'}
                  </span>

                  <img
                    src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || 'User')}`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-slate-700 object-cover"
                  />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 glass-dropdown rounded-2xl shadow-2xl p-2 border border-slate-800 z-50">
                    <div className="p-3 border-b border-slate-800/80 mb-1">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-white truncate">{user?.email}</p>
                      <div className="mt-2 flex items-center justify-between text-xs bg-slate-800/60 p-2 rounded-xl">
                        <span className="text-slate-400">RideMiles™:</span>
                        <span className="font-bold text-emerald-400">{user?.loyaltyPoints} points</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentTab('dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Member Profile</span>
                    </button>

                    {isAdmin ? (
                      <button
                        onClick={() => {
                          setCurrentTab('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-2.5 px-3 py-2 text-sm text-amber-400 hover:bg-amber-500/10 rounded-xl transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Admin Dashboard</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setCurrentTab('my-bookings');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center space-x-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors"
                      >
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>My Reservations</span>
                      </button>
                    )}

                    <div className="border-t border-slate-800/80 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center space-x-2.5 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentTab('login')}
                  className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setCurrentTab('register')}
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20 hover:scale-[1.02]"
                >
                  Get Started
                </button>
                
                {/* 1-Click Demo Logins */}
                <div className="flex items-center space-x-1 ml-2 pl-2 border-l border-slate-800">
                  <button
                    onClick={() => quickLogin('customer')}
                    title="1-Click Login as Demo Customer"
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    Demo User
                  </button>
                  <button
                    onClick={() => quickLogin('admin')}
                    title="1-Click Login as Demo Admin"
                    className="text-xs px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-colors"
                  >
                    Demo Admin
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <button
            onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-slate-300 hover:text-white font-medium"
          >
            Explore
          </button>
          <button
            onClick={() => { setCurrentTab('fleet'); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-slate-300 hover:text-white font-medium"
          >
            Vehicles
          </button>
          <button
            onClick={() => { onOpenAiWizard(); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-emerald-400 font-semibold flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Match Wizard</span>
          </button>
          <button
            onClick={() => { onOpenGpsTracker(); setMobileMenuOpen(false); }}
            className="w-full text-left py-2 text-cyan-400 font-semibold flex items-center space-x-2"
          >
            <Navigation className="w-4 h-4" />
            <span>Live Telematics</span>
          </button>

          {isAuthenticated ? (
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">
                Logged in as <span className="font-bold text-white">{user?.name}</span> ({user?.loyaltyTier})
              </div>
              <button
                onClick={() => { setCurrentTab('my-bookings'); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 text-slate-300"
              >
                My Reservations
              </button>
              {isAdmin && (
                <button
                  onClick={() => { setCurrentTab('admin'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-2 text-amber-400 font-bold"
                >
                  Admin Hub
                </button>
              )}
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="w-full text-left py-2 text-rose-400 font-semibold"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-slate-800 flex flex-col space-y-2">
              <button
                onClick={() => { setCurrentTab('login'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl text-center bg-slate-900 text-white font-semibold"
              >
                Sign In
              </button>
              <button
                onClick={() => { quickLogin('customer'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl text-center bg-emerald-500 text-slate-950 font-bold"
              >
                Instant Demo Customer
              </button>
              <button
                onClick={() => { quickLogin('admin'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl text-center bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
              >
                Instant Demo Admin
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

