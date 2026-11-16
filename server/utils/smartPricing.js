import { store } from '../data/store.js';

export const calculateSmartPrice = ({
  vehicle,
  pickupDate,
  returnDate,
  insurancePlan = 'None',
  addOns = [],
  pointsToRedeem = 0,
}) => {
  const start = new Date(pickupDate);
  const end = new Date(returnDate);

  const diffTime = Math.max(1, end.getTime() - start.getTime());
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const config = store.getPricingConfig();
  const baseDailyRate = vehicle.dailyRate;
  const baseSubtotal = baseDailyRate * diffDays;

  // Duration Discount
  let durationDiscountPercent = 0;
  if (diffDays >= 14) {
    durationDiscountPercent = config.discounts.fourteenDaysPlus;
  } else if (diffDays >= 7) {
    durationDiscountPercent = config.discounts.sevenDaysPlus;
  } else if (diffDays >= 3) {
    durationDiscountPercent = config.discounts.threeDaysPlus;
  }
  const durationDiscount = parseFloat((baseSubtotal * durationDiscountPercent).toFixed(2));

  // Weekend / Peak Demand Surge Multiplier
  // Check if trip covers weekend (Friday, Saturday, or Sunday)
  let hasWeekend = false;
  const cur = new Date(start);
  for (let i = 0; i < diffDays; i++) {
    const day = cur.getDay();
    if (day === 0 || day === 5 || day === 6) {
      hasWeekend = true;
      break;
    }
    cur.setDate(cur.getDate() + 1);
  }

  let surgeMultiplier = config.baseSurgeMultiplier;
  if (hasWeekend) {
    surgeMultiplier = Math.max(surgeMultiplier, config.weekendMultiplier);
  }
  if (config.holidaySurgeActive) {
    surgeMultiplier += 0.15;
  }

  const peakSurcharge = parseFloat(
    (baseSubtotal * (surgeMultiplier - 1.0)).toFixed(2)
  );

  // Insurance calculation
  let insuranceDailyRate = 0;
  if (insurancePlan === 'Standard' || insurancePlan === 'Standard Protection') {
    insuranceDailyRate = 19;
  } else if (insurancePlan === 'Premium' || insurancePlan === 'Premium Full Coverage') {
    insuranceDailyRate = 29;
  }
  const insuranceCost = insuranceDailyRate * diffDays;

  // Add-ons calculation
  const addOnsCost = addOns.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  // Subtotal before tax and discount
  const subtotalBeforeDiscounts =
    baseSubtotal + peakSurcharge + insuranceCost + addOnsCost - durationDiscount;

  // Loyalty Points Discount (100 pts = $5 => $0.05 / pt)
  // Max redemption: 35% of subtotal
  const maxRedeemableDollars = subtotalBeforeDiscounts * 0.35;
  const requestedDollarDiscount = (pointsToRedeem || 0) * (config.loyaltyRedemptionRate || 0.05);
  const loyaltyDiscount = parseFloat(
    Math.min(requestedDollarDiscount, maxRedeemableDollars).toFixed(2)
  );

  // Taxes (8.875% tax on taxable subtotal)
  const taxableAmount = Math.max(0, subtotalBeforeDiscounts - loyaltyDiscount);
  const tax = parseFloat((taxableAmount * 0.08875).toFixed(2));

  const totalAmount = parseFloat((taxableAmount + tax).toFixed(2));

  return {
    durationDays: diffDays,
    baseDailyRate,
    baseSubtotal: parseFloat(baseSubtotal.toFixed(2)),
    durationDiscountPercent: Math.round(durationDiscountPercent * 100),
    durationDiscount,
    surgeMultiplier: parseFloat(surgeMultiplier.toFixed(2)),
    hasWeekendSurge: hasWeekend,
    peakSurcharge,
    insurancePlan,
    insuranceDailyRate,
    insuranceCost,
    addOnsCost,
    loyaltyDiscount,
    pointsRedeemed: pointsToRedeem,
    tax,
    totalAmount,
    savingsTotal: parseFloat((durationDiscount + loyaltyDiscount).toFixed(2)),
  };
};

