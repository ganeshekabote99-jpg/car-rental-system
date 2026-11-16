import React, { useState } from 'react';
import { api } from '../services/api';
import { 
  QrCode, 
  X, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Car, 
  User, 
  Calendar, 
  ShieldCheck,
  Key
} from 'lucide-react';

export const AdminQRScannerModal = ({ isOpen, onClose, onVerifiedStatusChange }) => {
  const [tokenInput, setTokenInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleVerify = async (e) => {
    e?.preventDefault();
    if (!tokenInput.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setVerificationResult(null);

    try {
      const data = await api.verifyQr(tokenInput.trim());
      setVerificationResult(data);
    } catch (err) {
      setErrorMsg(err.message || 'Verification failed. Reservation not found.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl shadow-amber-500/10 overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <QrCode className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Counter Check-In & QR Scanner</h3>
              <p className="text-xs text-amber-400 font-medium">Verify guest passes & dispatch telematics access</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          
          {/* Quick Demo Paste Buttons */}
          <div>
            <span className="text-xs text-slate-400 block mb-1.5 font-medium">Quick Demo Barcode Codes:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setTokenInput('VR-88210')}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono"
              >
                VR-88210 (Sarah Connor - Tesla)
              </button>
              <button
                type="button"
                onClick={() => setTokenInput('VR-77192')}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono"
              >
                VR-77192 (Sarah Connor - Range Rover)
              </button>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleVerify} className="flex space-x-2">
            <input
              type="text"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Paste QR Pass Token or Booking ID (e.g. VR-88210)..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
            />
            <button
              type="submit"
              disabled={loading || !tokenInput.trim()}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 flex items-center space-x-1.5 shadow-md shadow-amber-500/20"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Verify</span>
            </button>
          </form>

          {/* Loading state */}
          {loading && (
            <div className="py-6 text-center text-xs text-slate-400">
              Querying reservation records...
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center space-x-2 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Verification Result Card */}
          {verificationResult && (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>PASS AUTHENTIC & VALIDATED</span>
                </span>
                <span className="font-mono text-xs font-bold text-white bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  {verificationResult.bookingId}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between border-b border-emerald-500/20 pb-1.5">
                  <span className="text-slate-400">Guest Name:</span>
                  <span className="font-bold text-white">{verificationResult.customer}</span>
                </div>
                <div className="flex justify-between border-b border-emerald-500/20 pb-1.5">
                  <span className="text-slate-400">Vehicle Assigned:</span>
                  <span className="font-bold text-white">{verificationResult.vehicle}</span>
                </div>
                <div className="flex justify-between border-b border-emerald-500/20 pb-1.5">
                  <span className="text-slate-400">Registration Plate:</span>
                  <span className="font-mono font-bold text-emerald-400">{verificationResult.licensePlate}</span>
                </div>
                <div className="flex justify-between border-b border-emerald-500/20 pb-1.5">
                  <span className="text-slate-400">Current Status:</span>
                  <span className="uppercase font-bold text-emerald-400">{verificationResult.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment Status:</span>
                  <span className="uppercase font-bold text-emerald-400">{verificationResult.paymentStatus}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  alert(`Vehicle ${verificationResult.vehicle} unlocked for ${verificationResult.customer}. Express pickup completed!`);
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
              >
                <Key className="w-4 h-4" />
                <span>Complete Check-In & Unlock Vehicle</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

