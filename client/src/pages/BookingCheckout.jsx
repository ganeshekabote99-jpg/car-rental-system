import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { DigitalRentalAgreementModal } from '../components/DigitalRentalAgreementModal';
import { 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  Check, 
  ArrowRight, 
  Award, 
  Sparkles, 
  FileText, 
  Lock, 
  Info,
  Car,
  ChevronRight,
  TrendingDown
} from 'lucide-react';

export const BookingCheckout = ({ 
  vehicle, 
  onBookingSuccess, 
  onCancel 
}) => {
  const { user, refreshUser } = useAuth();

  // Dates state (Default: today + 1 day to today + 4 days => 3 days)
  const defaultStart = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const defaultEnd = new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0];

  const [pickupDate, setPickupDate] = useState(defaultStart);
  const [returnDate, setReturnDate] = useState(defaultEnd);
  const [pickupLocation, setPickupLocation] = useState(vehicle?.location?.address || 'San Francisco Downtown Hub');
  const [returnLocation, setReturnLocation] = useState(vehicle?.location?.address || 'San Francisco Downtown Hub');

  // Protection Plan state
  const [insurancePlan, setInsurancePlan] = useState('Standard Protection');

  // Add-ons state
  const [selectedAddOns, setSelectedAddOns] = useState([
    { id: 'gps', name: 'Satellite In-Cabin GPS', price: 20 },
  ]);

  // Loyalty Points to Redeem
  const [pointsToRedeem, setPointsToRedeem] = useState(0);

  // Smart Pricing Calculation State
  const [pricing, setPricing] = useState(null);
  const [loadingPricing, setLoadingPricing] = useState(true);

  // Agreement & Signature
  const [signatureDataUrl, setSignatureDataUrl] = useState(null);
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState(false);

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [submitting, setSubmitting] = useState(false);

  // Fetch smart price preview whenever parameters change
  useEffect(() => {
    if (!vehicle?._id) return;

    const fetchPrice = async () => {
      setLoadingPricing(true);
      try {
        const preview = await api.previewPrice({
          vehicleId: vehicle._id,
          pickupDate,
          returnDate,
          insurancePlan,
          addOns: selectedAddOns,
          pointsToRedeem,
        });
        setPricing(preview);
      } catch (err) {
        console.error('Pricing preview error', err);
      } finally {
        setLoadingPricing(false);
      }
    };

    fetchPrice();
  }, [vehicle, pickupDate, returnDate, insurancePlan, selectedAddOns, pointsToRedeem]);

  const toggleAddOn = (addon) => {
    if (selectedAddOns.some((a) => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const handleCompleteBooking = async (e) => {
    e.preventDefault();

    if (!signatureDataUrl) {
      setIsAgreementModalOpen(true);
      return;
    }

    setSubmitting(true);
    try {
      const response = await api.createBooking({
        vehicleId: vehicle._id,
        pickupDate,
        returnDate,
        pickupLocation,
        returnLocation,
        insurancePlan,
        addOns: selectedAddOns,
        paymentMethod,
        cardNumber,
        signatureDataUrl,
        pointsToRedeem,
      });

      // Trigger Confetti Celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      await refreshUser();
      onBookingSuccess(response.booking);
    } catch (err) {
      alert(err.message || 'Booking failed to process. Please check details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center space-x-2 text-xs text-slate-400">
        <span className="hover:text-white cursor-pointer" onClick={onCancel}>Fleet Catalog</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white font-bold">{vehicle.name}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-emerald-400 font-bold">Secure Reservation Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Booking Form Steps */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Step 1: Trip Schedule & Locations */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-800">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs flex items-center justify-center">1</span>
              <h3 className="text-base font-extrabold text-white">Trip Schedule & Hub Locations</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pickup Date</span>
                </label>
                <input
                  type="date"
                  value={pickupDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1 flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Return Date</span>
                </label>
                <input
                  type="date"
                  value={returnDate}
                  min={pickupDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1 flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pickup Hub Location</span>
                </label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1 flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Return Hub Location</span>
                </label>
                <input
                  type="text"
                  value={returnLocation}
                  onChange={(e) => setReturnLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Protection Plans */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-800">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs flex items-center justify-center">2</span>
              <h3 className="text-base font-extrabold text-white">Choose Protection Coverage</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'None', title: 'Basic State Liability', rate: 0, desc: 'Statutory minimum coverage. Renter liable for vehicle damage excess.' },
                { id: 'Standard Protection', title: 'Standard Protection', rate: 19, desc: 'Collision Damage Waiver (CDW) with $500 deductible and 24/7 Roadside Assistance.' },
                { id: 'Premium Full Coverage', title: 'Premium Zero Deductible', rate: 29, desc: '$0 deductible, tire & windshield protection, personal effects, and priority concierge dispatch.' },
              ].map((p) => (
                <div
                  key={p.id}
                  onClick={() => setInsurancePlan(p.id)}
                  className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                    insurancePlan === p.id
                      ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-white text-xs">{p.title}</span>
                      <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        insurancePlan === p.id ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'
                      }`}>
                        {insurancePlan === p.id && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{p.desc}</p>
                  </div>
                  <div className="font-extrabold text-emerald-400 text-sm">
                    {p.rate === 0 ? 'Included' : `+$${p.rate}/day`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Add-on Equipment */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-800">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs flex items-center justify-center">3</span>
              <h3 className="text-base font-extrabold text-white">Select Travel Add-ons</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'gps', name: 'Satellite In-Cabin GPS Navigation', price: 20, desc: 'Offline topo maps & live traffic' },
                { id: 'toll_pass', name: 'FastTrak Electronic Toll Pass', price: 20, desc: 'Express lane access & cashless billing' },
                { id: 'child_seat', name: 'Child Safety Booster Seat', price: 15, desc: 'ISOFIX pre-installed & certified' },
                { id: 'additional_driver', name: 'Additional Certified Driver', price: 15, desc: 'Insure second registered driver' },
              ].map((addon) => {
                const isSelected = selectedAddOns.some((a) => a.id === addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddOn(addon)}
                    className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-white">{addon.name}</div>
                      <div className="text-[11px] text-slate-400">{addon.desc}</div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <span className="font-bold text-cyan-400 block">+${addon.price}</span>
                      <span className="text-[10px] text-slate-500">flat fee</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 4: Loyalty Points Redemption */}
          {user && (user.loyaltyPoints > 0) && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <h4 className="text-sm font-extrabold text-white">RideMiles™ Points Redemption</h4>
                </div>
                <span className="text-xs font-bold text-emerald-400">
                  Balance: {user.loyaltyPoints} pts ({user.loyaltyTier})
                </span>
              </div>

              <p className="text-xs text-slate-400">
                Redeem your points for instant cash savings. Every 100 points = $5.00 off your trip.
              </p>

              <div className="pt-2">
                <input
                  type="range"
                  min="0"
                  max={Math.min(user.loyaltyPoints, 2000)}
                  step="50"
                  value={pointsToRedeem}
                  onChange={(e) => setPointsToRedeem(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0 pts ($0)</span>
                  <span className="text-emerald-400 font-bold">
                    Redeeming: {pointsToRedeem} pts (-${(pointsToRedeem * 0.05).toFixed(2)})
                  </span>
                  <span>Max: {Math.min(user.loyaltyPoints, 2000)} pts</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Digital Rental Agreement Verification */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs flex items-center justify-center">4</span>
                <h3 className="text-base font-extrabold text-white">Digital Master Rental Agreement</h3>
              </div>
              {signatureDataUrl && (
                <span className="flex items-center space-x-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <Check className="w-3.5 h-3.5" />
                  <span>E-Signed & Attached</span>
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400">
              VelocityFleet operates a 100% paperless rental flow. Before payment can be processed, you must digitally sign the electronic vehicle lease contract.
            </p>

            <button
              type="button"
              onClick={() => setIsAgreementModalOpen(true)}
              className={`w-full py-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                signatureDataUrl
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{signatureDataUrl ? 'View or Re-Sign Digital Agreement' : 'Open Agreement & Draw E-Signature'}</span>
            </button>
          </div>

          {/* Step 6: Payment Details */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-800">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs flex items-center justify-center">5</span>
              <h3 className="text-base font-extrabold text-white">Payment Method</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 ${
                  paymentMethod === 'credit_card'
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Credit / Debit Card</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 ${
                  paymentMethod === 'apple_pay'
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <span> Apple Pay / Google Pay</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Expiry Date</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">CVC / CVV</label>
                  <input
                    type="text"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary & Smart Pricing Breakdown */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 sticky top-28 space-y-5 shadow-2xl">
            
            {/* Vehicle mini card */}
            <div className="flex items-center space-x-3.5 pb-4 border-b border-slate-800">
              <img
                src={vehicle.images?.[0]}
                alt={vehicle.name}
                className="w-20 h-16 object-cover rounded-xl shrink-0"
              />
              <div className="truncate">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block">{vehicle.category}</span>
                <h4 className="text-sm font-extrabold text-white truncate">{vehicle.name}</h4>
                <span className="text-xs text-slate-400 font-mono">{vehicle.registrationPlate}</span>
              </div>
            </div>

            {/* Smart Pricing Line Items */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Base Rate (${vehicle.dailyRate}/day × {pricing?.durationDays || 3} days)</span>
                <span className="font-semibold text-white">${pricing?.baseSubtotal}</span>
              </div>

              {/* Duration Discount Line */}
              {pricing?.durationDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span className="flex items-center space-x-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>Duration Discount ({pricing.durationDiscountPercent}% Off)</span>
                  </span>
                  <span className="font-bold">-${pricing.durationDiscount}</span>
                </div>
              )}

              {/* Weekend / Demand Surcharge */}
              {pricing?.peakSurcharge > 0 && (
                <div className="flex justify-between text-amber-400">
                  <span>Dynamic Demand Surcharge ({Math.round((pricing.surgeMultiplier - 1) * 100)}%)</span>
                  <span>+${pricing.peakSurcharge}</span>
                </div>
              )}

              {/* Insurance */}
              <div className="flex justify-between text-slate-300">
                <span>Coverage ({insurancePlan})</span>
                <span className="font-semibold text-white">+${pricing?.insuranceCost || 0}</span>
              </div>

              {/* Add-ons */}
              {pricing?.addOnsCost > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Selected Add-ons ({selectedAddOns.length})</span>
                  <span className="font-semibold text-white">+${pricing.addOnsCost}</span>
                </div>
              )}

              {/* Loyalty Discount */}
              {pricing?.loyaltyDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>RideMiles Points Redemption</span>
                  <span className="font-bold">-${pricing.loyaltyDiscount}</span>
                </div>
              )}

              {/* Tax */}
              <div className="flex justify-between text-slate-400 border-t border-slate-800 pt-2">
                <span>Taxes & Hub Surcharges (8.875%)</span>
                <span>${pricing?.tax || 0}</span>
              </div>
            </div>

            {/* Final Total */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Amount</span>
                <span className="text-2xl font-black text-white">${pricing?.totalAmount || '...'}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-400 block font-semibold">
                  Earns +{Math.round((pricing?.totalAmount || 100) * 0.1)} RideMiles
                </span>
                <span className="text-[10px] text-slate-500">Zero booking fee</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="button"
              disabled={submitting || loadingPricing}
              onClick={handleCompleteBooking}
              className="w-full py-3.5 rounded-2xl text-sm font-extrabold bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 transition-all shadow-xl shadow-emerald-500/25 hover:scale-[1.02] flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4 stroke-[2.5]" />
              <span>{submitting ? 'Processing Telematics Authorization...' : `Confirm & Pay $${pricing?.totalAmount || ''}`}</span>
            </button>

            <p className="text-[10px] text-center text-slate-500">
              Encrypted 256-bit SSL transaction. 100% refund available up to 24h prior to pickup.
            </p>

          </div>
        </div>

      </div>

      {/* Digital Rental Agreement Modal */}
      <DigitalRentalAgreementModal
        isOpen={isAgreementModalOpen}
        onClose={() => setIsAgreementModalOpen(false)}
        user={user}
        vehicle={vehicle}
        pricing={pricing}
        pickupDate={pickupDate}
        returnDate={returnDate}
        pickupLocation={pickupLocation}
        returnLocation={returnLocation}
        onSignComplete={(signatureUrl) => setSignatureDataUrl(signatureUrl)}
      />

    </div>
  );
};

