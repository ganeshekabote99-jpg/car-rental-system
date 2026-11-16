import React, { useRef, useState, useEffect } from 'react';
import { 
  FileText, 
  X, 
  Check, 
  RotateCcw, 
  ShieldCheck, 
  PenTool, 
  Lock,
  Calendar,
  Car
} from 'lucide-react';

export const DigitalRentalAgreementModal = ({ 
  isOpen, 
  onClose, 
  user, 
  vehicle, 
  pricing, 
  pickupDate, 
  returnDate, 
  pickupLocation, 
  returnLocation, 
  onSignComplete 
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleConfirmSignature = () => {
    if (!hasSignature) {
      alert('Please provide your digital e-signature on the pad below.');
      return;
    }
    if (!termsAgreed) {
      alert('Please check the terms and conditions agreement box.');
      return;
    }
    const signatureDataUrl = canvasRef.current.toDataURL('image/png');
    onSignComplete(signatureDataUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950">
              <FileText className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Digital Master Rental Lease</h3>
              <p className="text-xs text-emerald-400 font-medium">Legally binding electronic signature & terms</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Agreement Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-5 text-xs text-slate-300 pr-3">
          
          {/* Summary Box */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Parties to the Agreement</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                E-Sign Compliant
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Lessor / Fleet Operator:</span>
                <span className="font-bold text-white">VelocityFleet Systems International, Inc.</span>
                <span className="text-slate-400 block text-[11px]">Licensed Fleet Telematics Carrier</span>
              </div>
              <div>
                <span className="text-slate-500 block">Lessee / Primary Driver:</span>
                <span className="font-bold text-emerald-400">{user?.name}</span>
                <span className="text-slate-400 block text-[11px]">DL: {user?.drivingLicense?.number || 'DL-VERIFIED'} • {user?.email}</span>
              </div>
            </div>
          </div>

          {/* Vehicle & Reservation Specifics */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Vehicle & Schedule Specifics</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div>
                <span className="text-slate-500 block">Vehicle:</span>
                <span className="font-bold text-white">{vehicle?.year} {vehicle?.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Plate & VIN:</span>
                <span className="font-mono text-slate-200">{vehicle?.registrationPlate} / {vehicle?.vin?.slice(-6)}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Pickup Date:</span>
                <span className="text-white font-medium">{new Date(pickupDate).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Return Date:</span>
                <span className="text-white font-medium">{new Date(returnDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Legal Clauses */}
          <div className="space-y-3 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80 leading-relaxed text-slate-400">
            <div>
              <h5 className="font-bold text-white mb-1">1. Condition of Vehicle & Return Standards</h5>
              <p>
                The Renter acknowledges receiving the Vehicle in good condition with telematics pre-check complete. The Renter agrees to return the vehicle to the designated Hub ({returnLocation || 'Designated Hub'}) on the return date and time in identical clean condition.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white mb-1">2. Satellite Telematics & Geofencing Consent</h5>
              <p>
                The vehicle is equipped with automated GPS telemetry tracking speed, operational vitals, geofence boundary limits, and collision impact notification. Renter explicitly consents to automated telemetry monitoring strictly for safety and insurance dispatch.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white mb-1">3. Coverage Plan ({pricing?.insurancePlan || 'Standard Protection'})</h5>
              <p>
                Comprehensive third-party liability is provided up to statutory limits. Excess deductible and roadside dispatch apply according to the selected tier package.
              </p>
            </div>
          </div>

          {/* Interactive Signature Canvas */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-white flex items-center space-x-1.5">
                <PenTool className="w-4 h-4 text-emerald-400" />
                <span>Draw Your Digital E-Signature Below:</span>
              </label>

              <button
                type="button"
                onClick={clearSignature}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            </div>

            <div className="border-2 border-dashed border-emerald-500/40 rounded-2xl p-2 bg-slate-950 relative">
              <canvas
                ref={canvasRef}
                width={650}
                height={130}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-28 bg-slate-950 rounded-xl cursor-crosshair touch-none"
              />
              {!hasSignature && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-slate-600 text-xs font-medium">
                  Use your finger or mouse cursor to sign here
                </div>
              )}
            </div>
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start space-x-2.5 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-800"
            />
            <span className="text-xs text-slate-300">
              I have read, understood, and voluntarily agree to the VelocityFleet Digital Master Rental Lease, vehicle return terms, and authorized driver warranty.
            </span>
          </label>

        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmSignature}
            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center space-x-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Confirm & Attach E-Signature</span>
          </button>
        </div>

      </div>
    </div>
  );
};

