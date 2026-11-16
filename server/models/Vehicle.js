import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, default: 2024 },
    category: {
      type: String,
      enum: ['Electric EV', 'Luxury SUV', 'Sports Car', 'Sedan', 'Convertible', 'Minivan', 'Compact'],
      required: true,
    },
    images: [{ type: String }],
    dailyRate: { type: Number, required: true },
    hourlyRate: { type: Number, default: 25 },
    transmission: { type: String, enum: ['Automatic', 'Manual'], default: 'Automatic' },
    fuelType: { type: String, enum: ['Electric', 'Hybrid', 'Petrol', 'Diesel'], default: 'Petrol' },
    seats: { type: Number, default: 5 },
    luggageCapacity: { type: Number, default: 3 },
    rangeOrMpg: { type: String, default: '30 MPG' },
    features: [{ type: String }],
    rating: { type: Number, default: 4.9 },
    reviewCount: { type: Number, default: 1 },
    location: {
      city: { type: String, required: true },
      address: { type: String, required: true },
      lat: { type: Number, default: 37.7749 },
      lng: { type: Number, default: -122.4194 },
    },
    isAvailable: { type: Boolean, default: true },
    maintenanceStatus: { type: String, enum: ['Normal', 'Under Maintenance'], default: 'Normal' },
    registrationPlate: { type: String, required: true },
    vin: { type: String, required: true },
    telematics: {
      currentLat: { type: Number, default: 37.7749 },
      currentLng: { type: Number, default: -122.4194 },
      speed: { type: Number, default: 0 },
      fuelBatteryPercent: { type: Number, default: 100 },
      status: { type: String, default: 'Parked / Ready' },
      heading: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);

