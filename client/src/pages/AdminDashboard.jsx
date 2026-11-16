import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { AdminQRScannerModal } from '../components/AdminQRScannerModal';
import { 
  ShieldCheck, 
  Car, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Users, 
  Wrench, 
  Plus, 
  Trash2, 
  Sliders, 
  QrCode, 
  Check, 
  X,
  AlertCircle,
  Eye,
  RefreshCw
} from 'lucide-react';

export const AdminDashboard = ({ allVehicles = [], onRefreshVehicles }) => {
  const [analytics, setAnalytics] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [pricingConfig, setPricingConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('fleet');

  // Scanner modal state
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // New vehicle form modal
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    brand: '',
    category: 'Electric EV',
    dailyRate: 150,
    fuelType: 'Electric',
    transmission: 'Automatic',
    seats: 5,
    rangeOrMpg: '300 miles',
    city: 'San Francisco',
    registrationPlate: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [analyticsData, bookingsData, pricingData] = await Promise.all([
        api.getAdminAnalytics(),
        api.getAllAdminBookings(),
        api.getPricingConfig(),
      ]);
      setAnalytics(analyticsData);
      setBookings(bookingsData.bookings || []);
      setPricingConfig(pricingData);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      await api.updateBookingStatus(bookingId, newStatus);
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleToggleMaintenance = async (vehicleId) => {
    try {
      await api.toggleMaintenance(vehicleId);
      onRefreshVehicles();
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to toggle maintenance status');
    }
  };

  const handleDeleteVehicle = async (vehicleId) => {
    if (!window.confirm('Are you sure you want to remove this vehicle from fleet?')) return;
    try {
      await api.deleteVehicle(vehicleId);
      onRefreshVehicles();
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to delete vehicle');
    }
  };

  const handleCreateVehicle = async (e) => {
    e.preventDefault();
    try {
      await api.createVehicle({
        ...newVehicle,
        location: {
          city: newVehicle.city,
          address: `${newVehicle.city} Central Hub`,
          lat: 37.7749,
          lng: -122.4194,
        },
      });
      setIsAddVehicleOpen(false);
      onRefreshVehicles();
      loadData();
      alert('Vehicle successfully registered into fleet telematics!');
    } catch (err) {
      alert(err.message || 'Failed to create vehicle');
    }
  };

  const handleSavePricingConfig = async (e) => {
    e.preventDefault();
    try {
      await api.updatePricingConfig(pricingConfig);
      alert('Smart Dynamic Pricing rules updated and applied to fleet checkout!');
    } catch (err) {
      alert(err.message || 'Failed to update pricing rules');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Admin Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-white">Fleet Director Command Hub</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                ADMIN ACCESS
              </span>
            </div>
            <p className="text-xs text-slate-400">Manage vehicles, live telemetry dispatch, dynamic pricing, and guest check-ins</p>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsScannerOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center space-x-1.5 transition-colors"
          >
            <QrCode className="w-4 h-4" />
            <span>Counter QR Scanner</span>
          </button>

          <button
            onClick={() => setIsAddVehicleOpen(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center space-x-1.5 transition-colors shadow-md shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Vehicle</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        
        {/* Total Revenue */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-black text-white">
            ${analytics?.metrics?.totalRevenue?.toLocaleString() || '...'}
          </span>
          <span className="text-[10px] text-emerald-400 block mt-1">Paid bookings</span>
        </div>

        {/* Total Fleet */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Total Fleet</span>
            <Car className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-2xl font-black text-white">
            {analytics?.metrics?.totalFleet || allVehicles.length}
          </span>
          <span className="text-[10px] text-cyan-400 block mt-1">
            {analytics?.metrics?.availableVehicles || 0} Ready for dispatch
          </span>
        </div>

        {/* Active Rentals */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Active On Road</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-2xl font-black text-purple-400">
            {analytics?.metrics?.activeRentals || 0}
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">In customer custody</span>
        </div>

        {/* Fleet Utilization Rate */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Utilization Rate</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-black text-amber-400">
            {analytics?.metrics?.fleetUtilization || 0}%
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">Fleet efficiency</span>
        </div>

        {/* In Maintenance */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Maintenance</span>
            <Wrench className="w-4 h-4 text-rose-400" />
          </div>
          <span className="text-2xl font-black text-rose-400">
            {analytics?.metrics?.underMaintenance || 0}
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">In service bay</span>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('fleet')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'fleet'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          Fleet Management ({allVehicles.length})
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'bookings'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          Customer Reservations ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'pricing'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          Smart Dynamic Pricing Engine
        </button>
      </div>

      {/* Tab 1: Fleet Management */}
      {activeTab === 'fleet' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Plate / VIN</th>
                  <th className="p-4">Daily Rate</th>
                  <th className="p-4">Hub Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {allVehicles.map((v) => (
                  <tr key={v._id} className="hover:bg-slate-850/50">
                    <td className="p-4 flex items-center space-x-3">
                      <img
                        src={v.images?.[0]}
                        alt={v.name}
                        className="w-12 h-9 object-cover rounded-lg shrink-0"
                      />
                      <div>
                        <span className="font-bold text-white block">{v.name}</span>
                        <span className="text-[11px] text-slate-400">{v.fuelType} • {v.transmission}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-300">{v.category}</td>
                    <td className="p-4 font-mono text-slate-300">
                      <div>{v.registrationPlate}</div>
                      <div className="text-[10px] text-slate-500">{v.vin?.slice(-6)}</div>
                    </td>
                    <td className="p-4 font-bold text-emerald-400">${v.dailyRate}/day</td>
                    <td className="p-4 text-slate-300">{v.location?.city}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        v.maintenanceStatus === 'Normal'
                          ? (v.isAvailable ? 'bg-emerald-500/20 text-emerald-400' : 'bg-purple-500/20 text-purple-400')
                          : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {v.maintenanceStatus === 'Normal' ? (v.isAvailable ? 'Available' : 'Rented') : 'In Maintenance'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleToggleMaintenance(v._id)}
                        title="Toggle Maintenance Mode"
                        className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      >
                        {v.maintenanceStatus === 'Normal' ? 'Service Bay' : 'Clear Bay'}
                      </button>
                      <button
                        onClick={() => handleDeleteVehicle(v._id)}
                        className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete vehicle"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Reservations */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Reservation ID</th>
                  <th className="p-4">Guest</th>
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Dates</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Dispatch Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-850/50">
                    <td className="p-4 font-mono font-bold text-emerald-400">{b.bookingId}</td>
                    <td className="p-4">
                      <span className="font-bold text-white block">{b.user?.name}</span>
                      <span className="text-[10px] text-slate-500">{b.user?.email}</span>
                    </td>
                    <td className="p-4 text-slate-200">
                      <div>{b.vehicle?.name}</div>
                      <div className="text-[10px] font-mono text-slate-500">{b.vehicle?.registrationPlate}</div>
                    </td>
                    <td className="p-4 text-slate-300">
                      <div>{new Date(b.pickupDate).toLocaleDateString()}</div>
                      <div className="text-[10px] text-slate-500">to {new Date(b.returnDate).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4 font-bold text-white">${b.pricing?.totalAmount}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        b.status === 'active'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 animate-pulse'
                          : b.status === 'confirmed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : b.status === 'completed'
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <select
                        value={b.status}
                        onChange={(e) => handleUpdateBookingStatus(b._id, e.target.value)}
                        className="bg-slate-950 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-500"
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="active">Active / Picked Up</option>
                        <option value="completed">Returned / Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Dynamic Pricing Configuration */}
      {activeTab === 'pricing' && pricingConfig && (
        <form onSubmit={handleSavePricingConfig} className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 max-w-2xl">
          <div>
            <h3 className="text-lg font-extrabold text-white">Dynamic Smart Pricing Engine</h3>
            <p className="text-xs text-slate-400">Configure real-time multipliers, weekend demand index, and duration discount brackets.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1">Base Surge Multiplier (Default: 1.0)</label>
              <input
                type="number"
                step="0.05"
                min="0.8"
                max="2.5"
                value={pricingConfig.baseSurgeMultiplier}
                onChange={(e) => setPricingConfig({ ...pricingConfig, baseSurgeMultiplier: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Weekend Surge Multiplier (Fri-Sun, Default: 1.15 = 15% boost)</label>
              <input
                type="number"
                step="0.05"
                min="1.0"
                max="2.0"
                value={pricingConfig.weekendMultiplier}
                onChange={(e) => setPricingConfig({ ...pricingConfig, weekendMultiplier: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-300 block mb-1">3+ Days Discount</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="0.5"
                  value={pricingConfig.discounts.threeDaysPlus}
                  onChange={(e) => setPricingConfig({
                    ...pricingConfig,
                    discounts: { ...pricingConfig.discounts, threeDaysPlus: Number(e.target.value) }
                  })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
                />
                <span className="text-[10px] text-slate-500">e.g. 0.05 = 5%</span>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">7+ Days Discount</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="0.5"
                  value={pricingConfig.discounts.sevenDaysPlus}
                  onChange={(e) => setPricingConfig({
                    ...pricingConfig,
                    discounts: { ...pricingConfig.discounts, sevenDaysPlus: Number(e.target.value) }
                  })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
                />
                <span className="text-[10px] text-slate-500">e.g. 0.12 = 12%</span>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">14+ Days Discount</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="0.5"
                  value={pricingConfig.discounts.fourteenDaysPlus}
                  onChange={(e) => setPricingConfig({
                    ...pricingConfig,
                    discounts: { ...pricingConfig.discounts, fourteenDaysPlus: Number(e.target.value) }
                  })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-white"
                />
                <span className="text-[10px] text-slate-500">e.g. 0.20 = 20%</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="holidaySurge"
                checked={pricingConfig.holidaySurgeActive}
                onChange={(e) => setPricingConfig({ ...pricingConfig, holidaySurgeActive: e.target.checked })}
                className="rounded border-slate-700 bg-slate-950 text-amber-500"
              />
              <label htmlFor="holidaySurge" className="text-xs text-white font-medium cursor-pointer">
                Activate Holiday / Peak Season Surcharge (+15% across all bookings)
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20"
          >
            Save Pricing Rules
          </button>
        </form>
      )}

      {/* Add Vehicle Modal */}
      {isAddVehicleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-base font-extrabold text-white">Register Vehicle to Fleet</h3>
              <button onClick={() => setIsAddVehicleOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVehicle} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Make & Model</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lucid Air Pure"
                  value={newVehicle.name}
                  onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lucid"
                    value={newVehicle.brand}
                    onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Category</label>
                  <select
                    value={newVehicle.category}
                    onChange={(e) => setNewVehicle({ ...newVehicle, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Electric EV">Electric EV</option>
                    <option value="Luxury SUV">Luxury SUV</option>
                    <option value="Sports Car">Sports Car</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Convertible">Convertible</option>
                    <option value="Minivan">Minivan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Daily Rate ($)</label>
                  <input
                    type="number"
                    required
                    value={newVehicle.dailyRate}
                    onChange={(e) => setNewVehicle({ ...newVehicle, dailyRate: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Powertrain</label>
                  <select
                    value={newVehicle.fuelType}
                    onChange={(e) => setNewVehicle({ ...newVehicle, fuelType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Electric">Electric</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Petrol">Petrol</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">Seats</label>
                  <input
                    type="number"
                    value={newVehicle.seats}
                    onChange={(e) => setNewVehicle({ ...newVehicle, seats: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Hub City</label>
                  <input
                    type="text"
                    value={newVehicle.city}
                    onChange={(e) => setNewVehicle({ ...newVehicle, city: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">License Plate</label>
                  <input
                    type="text"
                    placeholder="e.g. 7EV8821"
                    value={newVehicle.registrationPlate}
                    onChange={(e) => setNewVehicle({ ...newVehicle, registrationPlate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddVehicleOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Counter QR Scanner Modal */}
      <AdminQRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />

    </div>
  );
};

