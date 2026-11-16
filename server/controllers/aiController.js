import { recommendVehicles } from '../utils/aiEngine.js';

export const getRecommendations = async (req, res) => {
  try {
    const { tripType, passengers, luggage, budgetLevel, priority, distanceKm } = req.body;

    const recommendations = await recommendVehicles({
      tripType: tripType || 'weekend_getaway',
      passengers: Number(passengers) || 2,
      luggage: Number(luggage) || 2,
      budgetLevel: budgetLevel || 'moderate',
      priority: priority || 'maximum_comfort',
      distanceKm: Number(distanceKm) || 150,
    });

    return res.json(recommendations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

