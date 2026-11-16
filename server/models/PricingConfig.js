import mongoose from 'mongoose';

const pricingConfigSchema = new mongoose.Schema(
  {
    baseSurgeMultiplier: { type: Number, default: 1.0 },
    weekendMultiplier: { type: Number, default: 1.15 },
    holidaySurgeActive: { type: Boolean, default: false },
    loyaltyRedemptionRate: { type: Number, default: 0.05 },
    discounts: {
      threeDaysPlus: { type: Number, default: 0.05 },
      sevenDaysPlus: { type: Number, default: 0.12 },
      fourteenDaysPlus: { type: Number, default: 0.20 },
    },
  },
  { timestamps: true }
);

export const PricingConfig = mongoose.models.PricingConfig || mongoose.model('PricingConfig', pricingConfigSchema);

