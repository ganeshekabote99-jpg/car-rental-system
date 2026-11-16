import { store } from '../data/store.js';

export const getVehicleTelematics = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const vehicle = store.getVehicleById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const baseLat = vehicle.location?.lat || 37.7749;
    const baseLng = vehicle.location?.lng || -122.4194;

    // Simulate moving trajectory based on current timestamp
    const now = Date.now();
    const cycle = (now / 4000) % (Math.PI * 2);
    const radius = 0.015; // ~1.5 km orbit simulation
    const simulatedLat = parseFloat((baseLat + Math.sin(cycle) * radius).toFixed(6));
    const simulatedLng = parseFloat((baseLng + Math.cos(cycle) * radius).toFixed(6));
    const simulatedSpeed = Math.round(45 + Math.sin(cycle * 2) * 22);

    // Simulated trail of recent positions
    const breadcrumbs = [];
    for (let i = 8; i >= 0; i--) {
      const pastCycle = ((now - i * 3000) / 4000) % (Math.PI * 2);
      breadcrumbs.push({
        lat: parseFloat((baseLat + Math.sin(pastCycle) * radius).toFixed(6)),
        lng: parseFloat((baseLng + Math.cos(pastCycle) * radius).toFixed(6)),
        timestamp: new Date(now - i * 3000).toISOString(),
      });
    }

    return res.json({
      vehicleId: vehicle._id,
      vehicleName: vehicle.name,
      licensePlate: vehicle.registrationPlate,
      telematics: {
        currentLat: simulatedLat,
        currentLng: simulatedLng,
        speed: simulatedSpeed,
        speedUnit: 'km/h',
        heading: Math.round(((cycle * 180) / Math.PI + 360) % 360),
        fuelBatteryPercent: vehicle.telematics?.fuelBatteryPercent || 88,
        powerType: vehicle.fuelType,
        status: simulatedSpeed > 5 ? 'Moving / Active Telematics' : 'Stationary',
        odometerKm: 14820,
        tirePressurePsi: { fl: 35, fr: 35, rl: 36, rr: 36 },
        cabinTempCelsius: 21.5,
        geofence: {
          status: 'Compliant (Inside Metro Zone)',
          centerLat: baseLat,
          centerLng: baseLng,
          radiusKm: 75,
        },
        breadcrumbs,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

