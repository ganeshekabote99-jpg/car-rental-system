import { store } from '../data/store.js';

export const recommendVehicles = async ({
  tripType = 'weekend_getaway',
  passengers = 2,
  luggage = 2,
  budgetLevel = 'moderate',
  priority = 'maximum_comfort',
  distanceKm = 150,
}) => {
  const allVehicles = store.getAllVehicles();

  // Score each vehicle based on trip criteria
  const scored = allVehicles.map((vehicle) => {
    let score = 50; // base score
    const pros = [];

    // Passenger constraint
    if (vehicle.seats >= passengers) {
      score += 20;
      if (vehicle.seats === passengers || vehicle.seats === passengers + 1) {
        pros.push(`Perfect seating capacity (${vehicle.seats} seats for ${passengers} guests)`);
      } else {
        pros.push(`Spacious ${vehicle.seats}-passenger cabin with extra room`);
      }
    } else {
      score -= 40; // Cannot fit passengers
    }

    // Luggage constraint
    if (vehicle.luggageCapacity >= luggage) {
      score += 15;
      pros.push(`Ample cargo space (${vehicle.luggageCapacity} large bags capacity)`);
    } else {
      score -= 20;
    }

    // Priority matching
    if (priority === 'eco_green') {
      if (vehicle.fuelType === 'Electric') {
        score += 35;
        pros.push(`Zero-emission 100% Electric powertrain with ultra-fast charging`);
      } else if (vehicle.fuelType === 'Hybrid') {
        score += 20;
        pros.push(`Eco-conscious hybrid efficiency with low carbon footprint`);
      }
    } else if (priority === 'speed_performance') {
      if (vehicle.category === 'Sports Car' || vehicle.name.includes('Plaid') || vehicle.name.includes('AMG')) {
        score += 35;
        pros.push(`High-output performance chassis & instant thrill acceleration`);
      }
    } else if (priority === 'offroad_rugged') {
      if (vehicle.features.some(f => f.toLowerCase().includes('terrain') || f.toLowerCase().includes('tires') || f.toLowerCase().includes('awd') || f.toLowerCase().includes('trail'))) {
        score += 35;
        pros.push(`Trail-ready all-terrain capability with heavy-duty suspension`);
      }
    } else if (priority === 'maximum_comfort') {
      if (vehicle.category === 'Sedan' || vehicle.category === 'Luxury SUV') {
        score += 25;
        pros.push(`Whisper-quiet acoustic glass & ergonomic massage seating`);
      }
    } else if (priority === 'best_value') {
      if (vehicle.dailyRate <= 150) {
        score += 30;
        pros.push(`Exceptional daily rate value at only $${vehicle.dailyRate}/day`);
      }
    }

    // Trip type matching
    if (tripType === 'family_vacation') {
      if (vehicle.category === 'Minivan' || (vehicle.category === 'Luxury SUV' && vehicle.seats >= 7)) {
        score += 25;
        pros.push('Family-first interior with child-safe features and entertainment');
      }
    } else if (tripType === 'business') {
      if (vehicle.category === 'Sedan' || vehicle.brand === 'Mercedes-Benz' || vehicle.brand === 'Audi' || vehicle.brand === 'Lucid') {
        score += 25;
        pros.push('Executive presentation and sleek corporate presence');
      }
    } else if (tripType === 'luxury_event') {
      if (vehicle.dailyRate >= 220 || vehicle.brand === 'Porsche' || vehicle.brand === 'Land Rover') {
        score += 30;
        pros.push('Red-carpet prestige and pinnacle luxury craftsmanship');
      }
    } else if (tripType === 'adventure') {
      if (vehicle.name.includes('Bronco') || vehicle.name.includes('G 63') || vehicle.name.includes('Rover')) {
        score += 30;
        pros.push('Rugged clearance & outdoor adventure capability');
      }
    }

    // Budget matching
    if (budgetLevel === 'budget' && vehicle.dailyRate < 130) score += 20;
    if (budgetLevel === 'moderate' && vehicle.dailyRate >= 130 && vehicle.dailyRate <= 250) score += 20;
    if (budgetLevel === 'luxury' && vehicle.dailyRate > 220) score += 20;

    // Cap between 60 and 99
    const matchPercent = Math.min(99, Math.max(62, score));

    return {
      vehicle,
      matchScore: matchPercent,
      pros: pros.slice(0, 3),
      aiSummary: `Recommended for your ${tripType.replace('_', ' ')} based on ${passengers} passengers, ${luggage} bags, and ${priority.replace('_', ' ')} priority.`,
    };
  });

  // Sort by highest matchScore
  scored.sort((a, b) => b.matchScore - a.matchScore);

  const topPick = scored[0];
  const valuePick = [...scored].sort((a, b) => a.vehicle.dailyRate - b.vehicle.dailyRate)[0];
  const luxuryPick = [...scored].sort((a, b) => b.vehicle.dailyRate - a.vehicle.dailyRate)[0];

  return {
    criteria: { tripType, passengers, luggage, budgetLevel, priority, distanceKm },
    topRecommendations: scored.slice(0, 4),
    featuredBadges: {
      bestOverall: topPick?.vehicle._id,
      bestValue: valuePick?.vehicle._id,
      ultraLuxury: luxuryPick?.vehicle._id,
    },
    aiInsights: `Our AI fleet intelligence analyzed ${allVehicles.length} vehicles. The ${topPick?.vehicle.name} emerged as your top match (${topPick?.matchScore}%) for this trip.`,
  };
};

