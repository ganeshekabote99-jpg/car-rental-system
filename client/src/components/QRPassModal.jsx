import React from 'react';
import { 
  QrCode, 
  X, 
  Printer, 
  Download, 
  MapPin, 
  Calendar, 
  Car, 
  ShieldCheck, 
  CheckCircle2,
  Clock
} from 'lucide-react';

export const QRPassModal = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl shadow-emerald-500/10 overflow-hidden my-6">
        
        {/* Top Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
              <QrCode className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Digital Boarding Pass</h3>
              <p className="text-[11px] text-emerald-400">Contactless 60s Express Pickup</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Boarding Pass Body */}
        <div className="p-6 space-y-5 text-center">
          
          {/* Reservation Badge */}
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>CONFIRMED • {booking.bookingId}</span>
          </div>

          {/* QR Code Container */}
          <div className="p-4 bg-white rounded-2xl inline-block shadow-xl mx-auto">
            {booking.qrCode?.startsWith('data:image') ? (
              <img
                src={booking.qrCode}
                alt="Booking Verification QR"
                className="w-48 h-48 mx-auto"
              />
            ) : (
              <div className="w-48 h-48 bg-slate-100 flex flex-col items-center justify-center p-2 text-slate-800">
                <QrCode className="w-32 h-32 text-slate-900" />
                <span className="text-[10px] font-mono mt-1 font-bold">{booking.bookingId}</span>
              </div>
            )}
            <p className="text-[10px] font-mono text-slate-700 tracking-wider font-bold mt-2">
              SCAN AT VALET OR DOOR SENSOR
            </p>
          </div>

          {/* Vehicle & Guest Specifics */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left space-y-2.5 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Vehicle</span>
              <span className="font-bold text-white text-right">
                {booking.vehicle?.year} {booking.vehicle?.name}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">License Plate</span>
              <span className="font-mono font-bold text-emerald-400">
                {booking.vehicle?.registrationPlate}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Primary Guest</span>
              <span className="font-semibold text-white">
                {booking.user?.name}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Pickup Date</span>
              <span className="text-slate-200">
                {new Date(booking.pickupDate).toLocaleDateString()} ({booking.durationDays} Days)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Pickup Hub</span>
              <span className="text-slate-200 text-right truncate max-w-[180px]">
                {booking.pickupLocation}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center space-x-2 text-left">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Present this pass or scan at the VelocityFleet kiosk. The vehicle doors will auto-unlock upon telemetry verification.</span>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={handlePrint}
              className="py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Pass</span>
            </button>
            <button
              onClick={onClose}
              className="py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
            >
              Done
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

