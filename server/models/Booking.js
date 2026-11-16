import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    user: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, default: '' },
    },
    vehicle: { type: Object, required: true },
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    pickupLocation: { type: String, required: true },
    returnLocation: { type: String, required: true },
    durationDays: { type: Number, required: true },
    pricing: {
      baseDailyRate: Number,
      baseSubtotal: Number,
      durationDiscountPercent: Number,
      durationDiscount: Number,
      surgeMultiplier: Number,
      peakSurcharge: Number,
      insurancePlan: String,
      insuranceDailyRate: Number,
      insuranceCost: Number,
      addOnsCost: Number,
      loyaltyDiscount: Number,
      pointsRedeemed: Number,
      tax: Number,
      totalAmount: Number,
      savingsTotal: Number,
    },
    insurance: {
      plan: { type: String, default: 'None' },
      dailyFee: { type: Number, default: 0 },
    },
    addOns: [
      {
        id: String,
        name: String,
        price: Number,
      },
    ],
    status: {
      type: String,
      enum: ['confirmed', 'active', 'completed', 'cancelled'],
      default: 'confirmed',
    },
    payment: {
      status: { type: String, enum: ['paid', 'pending', 'refunded'], default: 'paid' },
      method: { type: String, default: 'credit_card' },
      transactionId: { type: String, required: true },
      paidAt: { type: Date, default: Date.now },
      invoiceNumber: { type: String, required: true },
      last4: { type: String, default: '4242' },
    },
    agreement: {
      signed: { type: Boolean, default: true },
      signatureDataUrl: { type: String, required: true },
      signedAt: { type: Date, default: Date.now },
      termsAccepted: { type: Boolean, default: true },
    },
    qrCode: { type: String, required: true },
    telematics: {
      currentLat: Number,
      currentLng: Number,
      speed: Number,
      fuelBatteryPercent: Number,
      status: String,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

