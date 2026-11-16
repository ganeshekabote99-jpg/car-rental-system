import { store } from '../data/store.js';

export const getVehicles = async (req, res) => {
  try {
    const filters = {
      category: req.query.category,
      fuelType: req.query.fuelType,
      transmission: req.query.transmission,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
      seats: req.query.seats,
      search: req.query.search,
      isAvailable: req.query.isAvailable,
    };

    const vehicles = store.getAllVehicles(filters);
    return res.json({
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const vehicle = store.getVehicleById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    return res.json(vehicle);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createVehicle = async (req, res) => {
  try {
    const {
      name,
      brand,
      model,
      year,
      category,
      dailyRate,
      hourlyRate,
      transmission,
      fuelType,
      seats,
      luggageCapacity,
      rangeOrMpg,
      features,
      location,
      images,
      registrationPlate,
      vin,
    } = req.body;

    if (!name || !brand || !dailyRate || !category) {
      return res.status(400).json({ message: 'Vehicle name, brand, dailyRate, and category are required' });
    }

    const newVehicle = store.createVehicle({
      name,
      brand,
      model: model || name,
      year: Number(year) || 2024,
      category,
      dailyRate: Number(dailyRate),
      hourlyRate: Number(hourlyRate) || Math.round(Number(dailyRate) / 8),
      transmission: transmission || 'Automatic',
      fuelType: fuelType || 'Petrol',
      seats: Number(seats) || 5,
      luggageCapacity: Number(luggageCapacity) || 3,
      rangeOrMpg: rangeOrMpg || '30 MPG',
      features: Array.isArray(features) ? features : (features ? features.split(',').map(s => s.trim()) : ['Premium Sound', 'Bluetooth']),
      location: location || { city: 'San Francisco', address: 'Downtown Hub', lat: 37.7749, lng: -122.4194 },
      images: Array.isArray(images) && images.length ? images : ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80'],
      registrationPlate: registrationPlate || 'PLT-' + Math.floor(1000 + Math.random() * 9000),
      vin: vin || 'VIN' + Math.random().toString(36).substring(2, 12).toUpperCase(),
    });

    return res.status(201).json({
      message: 'Vehicle added successfully',
      vehicle: newVehicle,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const updated = store.updateVehicle(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    return res.json({
      message: 'Vehicle updated successfully',
      vehicle: updated,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const deleted = store.deleteVehicle(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }
    return res.json({ message: 'Vehicle deleted from fleet' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const toggleMaintenance = async (req, res) => {
  try {
    const vehicle = store.getVehicleById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const newStatus = vehicle.maintenanceStatus === 'Normal' ? 'Under Maintenance' : 'Normal';
    const isAvailable = newStatus === 'Normal';

    const updated = store.updateVehicle(req.params.id, {
      maintenanceStatus: newStatus,
      isAvailable,
      telematics: {
        ...vehicle.telematics,
        status: newStatus === 'Normal' ? 'Parked / Ready' : 'In Service Bay',
      },
    });

    return res.json({
      message: `Vehicle status changed to ${newStatus}`,
      vehicle: updated,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

