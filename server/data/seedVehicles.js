export const initialVehicles = [
  {
    _id: "veh_001",
    name: "Tesla Model S Plaid",
    brand: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    category: "Electric EV",
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80"
    ],
    dailyRate: 189,
    hourlyRate: 25,
    transmission: "Automatic",
    fuelType: "Electric",
    seats: 5,
    luggageCapacity: 3,
    rangeOrMpg: "396 miles range (1,020 hp)",
    features: ["Tri-Motor AWD", "Autopilot HW4", "17\" Cinematic Screen", "Wireless Charging", "Glass Roof", "Ventilated Seats"],
    rating: 4.95,
    reviewCount: 48,
    location: {
      city: "San Francisco",
      address: "100 Montgomery St, Financial District",
      lat: 37.7891,
      lng: -122.4014
    },
    isAvailable: true,
    maintenanceStatus: "Normal",
    registrationPlate: "7EV9914",
    vin: "5YJSA1E21NF008819",
    telematics: {
      currentLat: 37.7891,
      currentLng: -122.4014,
      speed: 0,
      fuelBatteryPercent: 92,
      status: "Parked / Ready",
      heading: 45
    }
  },
  {
    _id: "veh_002",
    name: "Porsche 911 Carrera 4S",
    brand: "Porsche",
    model: "911 Carrera 4S",
    year: 2024,
    category: "Sports Car",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"
    ],
    dailyRate: 295,
    hourlyRate: 40,
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 4,
    luggageCapacity: 2,
    rangeOrMpg: "24 MPG (443 hp Twin-Turbo)",
    features: ["Sport Chrono Package", "Bose Surround Sound", "Active Suspension", "PASM Sport", "Launch Control"],
    rating: 4.98,
    reviewCount: 62,
    location: {
      city: "Los Angeles",
      address: "9400 Wilshire Blvd, Beverly Hills",
      lat: 34.0673,
      lng: -118.4012
    },
    isAvailable: true,
    maintenanceStatus: "Normal",
    registrationPlate: "6911PRS",
    vin: "WP0AB2A97NS240182",
    telematics: {
      currentLat: 34.0673,
      currentLng: -118.4012,
      speed: 0,
      fuelBatteryPercent: 85,
      status: "Parked / Ready",
      heading: 180
    }
  },
  {
    _id: "veh_003",
    name: "Range Rover Autobiography",
    brand: "Land Rover",
    model: "Range Rover Autobiography",
    year: 2024,
    category: "Luxury SUV",
    images: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80"
    ],
    dailyRate: 240,
    hourlyRate: 32,
    transmission: "Automatic",
    fuelType: "Hybrid",
    seats: 7,
    luggageCapacity: 5,
    rangeOrMpg: "28 MPG Combined (523 hp V8 Twin-Turbo)",
    features: ["Executive Class Rear Seating", "Meridian 3D Audio", "All-Wheel Steering", "Electronic Air Suspension", "Terrain Response 2"],
    rating: 4.92,
    reviewCount: 39,
    location: {
      city: "New York",
      address: "59th St & 5th Ave, Central Park South",
      lat: 40.7644,
      lng: -73.9734
    },
    isAvailable: true,
    maintenanceStatus: "Normal",
    registrationPlate: "NY-RR808",
    vin: "SALWR2V42PA199341",
    telematics: {
      currentLat: 40.7644,
      currentLng: -73.9734,
      speed: 0,
      fuelBatteryPercent: 95,
      status: "Parked / Ready",
      heading: 90
    }
  },
  {
    _id: "veh_004",
    name: "BMW M4 Competition Coupe",
    brand: "BMW",
    model: "M4 Competition",
    year: 2024,
    category: "Sports Car",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80"
    ],
    dailyRate: 210,
    hourlyRate: 28,
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 4,
    luggageCapacity: 2,
    rangeOrMpg: "23 MPG (503 hp M TwinPower Turbo)",
    features: ["M xDrive", "Carbon Fiber Bucket Seats", "Head-Up Display", "Harman Kardon Audio", "Adaptive M Suspension"],
    rating: 4.89,
    reviewCount: 35,
    location: {
      city: "Miami",
      address: "1100 Ocean Drive, South Beach",
      lat: 25.7826,
      lng: -80.1303
    },
    isAvailable: true,
    maintenanceStatus: "Normal",
    registrationPlate: "FL-M4RCNG",
    vin: "WBS33AY08NCF91024",
    telematics: {
      currentLat: 25.7826,
      currentLng: -80.1303,
      speed: 0,
      fuelBatteryPercent: 78,
      status: "Parked / Ready",
      heading: 270
    }
  },
  {
    _id: "veh_005",
    name: "Mercedes-Benz S 580 4MATIC",
    brand: "Mercedes-Benz",
    model: "S 580 Sedan",
    year: 2024,
    category: "Sedan",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1622353219448-46a48f2178db?auto=format&fit=crop&w=1200&q=80"
    ],
    dailyRate: 220,
    hourlyRate: 30,
    transmission: "Automatic",
    fuelType: "Hybrid",
    seats: 5,
    luggageCapacity: 4,
    rangeOrMpg: "25 MPG (496 hp EQ Boost)",
    features: ["Burmester High-End 4D Sound", "Rear-Axle Steering", "MBUX Augmented Reality HUD", "Massaging Seats", "Soft-Close Doors"],
    rating: 4.97,
    reviewCount: 51,
    location: {
      city: "San Francisco",
      address: "SFO Airport Luxury Car Deck",
      lat: 37.6213,
      lng: -122.3790
    },
    isAvailable: true,
    maintenanceStatus: "Normal",
    registrationPlate: "CAL-S580M",
    vin: "W1K2230761A088312",
    telematics: {
      currentLat: 37.6213,
      currentLng: -122.3790,
      speed: 0,
      fuelBatteryPercent: 88,
      status: "Parked / Ready",
      heading: 120
    }
  },
  {
    _id: "veh_006",
    name: "Lucid Air Grand Touring",
    brand: "Lucid",
    model: "Air Grand Touring",
    year: 2024,
    category: "Electric EV",
    images: [
      "https://images.unsplash.com/photo-1662991040845-6679541a49df?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=1200&q=80"
    ],
    dailyRate: 215,
    hourlyRate: 29,
    transmission: "Automatic",
    fuelType: "Electric",
    seats: 5,
    luggageCapacity: 3,
    rangeOrMpg: "516 miles EPA range (819 hp)",
    features: ["900V+ Ultra-Fast Charging", "DreamDrive Pro ADAS", "Surreal Sound 21-Speaker", "Glass Canopy Roof", "34-inch Curved 5K Display"],
    rating: 4.96,
    reviewCount: 29,
    location: {
      city: "Los Angeles",
      address: "LAX Terminal 4 Executive Valet",
      lat: 33.9416,
      lng: -118.4085
    },
    isAvailable: true,
    maintenanceStatus: "Normal",
    registrationPlate: "7LCD998",
    vin: "7L1A1E112PB001294",
    telematics: {
      currentLat: 33.9416,
      currentLng: -118.4085,
      speed: 0,
      fuelBatteryPercent: 96,
      status: "Parked / Ready",
      heading: 315
    }
  },
  {
    _id: "veh_007",
    name: "Audi RS e-tron GT",
    brand: "Audi",
    model: "RS e-tron GT",
    year: 2024,
    category: "Electric EV",
    images: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
    ],
    dailyRate: 230,
    hourlyRate: 31,
    transmission: "Automatic",
    fuelType: "Electric",
    seats: 4,
    luggageCapacity: 2,
    rangeOrMpg: "249 miles range (637 hp Boost)",
    features: ["quattro All-Wheel Drive", "Bang & Olufsen 3D Sound", "Carbon Ceramic Brakes", "Adaptive Air Suspension", "Matrix LED Headlights"],
    rating: 4.94,
    reviewCount: 42,
    location: {
      city: "New York",
      address: "JFK Airport Premier Terminal",
      lat: 40.6413,
      lng: -73.7781
    },
    isAvailable: true,
    maintenanceStatus: "Normal",
    registrationPlate: "NY-AUDI9",
    vin: "WAUZZZFW8MA028451",
    telematics: {
      currentLat: 40.6413,
      currentLng: -73.7781,
      speed: 0,
      fuelBatteryPercent: 91,
      status: "Parked / Ready",
      heading: 60
    }
  },
  {
    _id: "veh_008",
    name: "Ford Bronco Badlands Sasquatch",
    brand: "Ford",
    model: "Bronco Badlands",
    year: 2024,
    category: "Luxury SUV",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80"
    ],
    dailyRate: 145,
    hourlyRate: 20,
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    luggageCapacity: 4,
    rangeOrMpg: "18 MPG (330 hp EcoBoost)",
    features: ["Sasquatch 35-inch Mud-Terrain Tires", "Removable Doors & Roof", "Bilstein Position-Sensitive Dampers", "GOAT Driving Modes", "360 Trail Camera"],
    rating: 4.88,
    reviewCount: 56,
    location: {
      city: "Denver",
      address: "8500 Peña Blvd, Denver International Airport",
      lat: 39.8561,
      lng: -104.6737
    },
    isAvailable: true,
    maintenanceStatus: "Normal",
    registrationPlate: "CO-WILD8",
    vin: "1FMEE5DP6PLA77421",
    telematics: {
      currentLat: 39.8561,
      currentLng: -104.6737,
      speed: 0,
      fuelBatteryPercent: 82,
      status: "Parked / Ready",
      heading: 200
    }
  },
  {
    _id: "veh_009",
    name: "Mercedes-Benz G 63 AMG",
    brand: "Mercedes-Benz",
    model: "G 63 AMG",
    year: 2024,
    category: "Luxury SUV",
    images: [
      "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80"
    ],
    dailyRate: 360,
    hourlyRate: 50,
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    luggageCapacity: 4,
    rangeOrMpg: "15 MPG (577 hp Handcrafted V8)",
    features: ["AMG Performance Exhaust", "3 Differential Locks", "Nappa Leather Luxury Interior", "Burmester Surround", "Carbon Trim"],
    rating: 4.97,
    reviewCount: 71,
    location: {
      city: "Miami",
      address: "4441 Collins Ave, Fontainebleau",
      lat: 25.8183,
      lng: -80.1221
    },
    isAvailable: true,
    maintenanceStatus: "Normal",
    registrationPlate: "FL-G63BOSS",
    vin: "W1N4632761X390881",
    telematics: {
      currentLat: 25.8183,
      currentLng: -80.1221,
      speed: 0,
      fuelBatteryPercent: 74,
      status: "Parked / Ready",
      heading: 15
    }
  },
  {
    _id: "veh_010",
    name: "Chevrolet Corvette Stingray Convertible",
    brand: "Chevrolet",
    model: "Corvette Stingray C8",
    year: 2024,
    category: "Convertible",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80"
    ],
    dailyRate: 195,
    hourlyRate: 27,
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 2,
    luggageCapacity: 2,
    rangeOrMpg: "24 MPG (495 hp 6.2L Mid-Engine)",
    features: ["Power Retractable Hardtop", "Z51 Performance Package", "Performance Data Recorder", "GT2 Bucket Seats", "Bose 14-Speaker"],
    rating: 4.91,
    reviewCount: 44,
    location: {
      city: "Los Angeles",
      address: "100 World Way, Los Angeles",
      lat: 34.0195,
      lng: -118.4912
    },
    isAvailable: true,
    maintenanceStatus: "Normal",
    registrationPlate: "CA-C8VETT",
    vin: "1G1YB2D47P5104231",
    telematics: {
      currentLat: 34.0195,
      currentLng: -118.4912,
      speed: 0,
      fuelBatteryPercent: 80,
      status: "Parked / Ready",
      heading: 260
    }
  },
  {
    _id: "veh_011",
    name: "Toyota Sienna Hybrid Platinum",
    brand: "Toyota",
    model: "Sienna Platinum",
    year: 2024,
    category: "Minivan",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?auto=format&fit=crop&w=1200&q=80"
    ],
    dailyRate: 110,
    hourlyRate: 16,
    transmission: "Automatic",
    fuelType: "Hybrid",
    seats: 8,
    luggageCapacity: 6,
    rangeOrMpg: "36 MPG Combined (245 hp Hybrid)",
    features: ["Super Long Slide Captain's Chairs", "Rear-Seat Entertainment 11.6\" Screen", "Hands-Free Dual Power Sliding Doors", "Onboard Vacuum & Fridge", "AWD"],
    rating: 4.87,
    reviewCount: 38,
    location: {
      city: "San Francisco",
      address: "4th St & King St, Mission Bay",
      lat: 37.7765,
      lng: -122.3949
    },
    isAvailable: true,
    maintenanceStatus: "Normal",
    registrationPlate: "7VAN829",
    vin: "5TDJS4FC7NS092144",
    telematics: {
      currentLat: 37.7765,
      currentLng: -122.3949,
      speed: 0,
      fuelBatteryPercent: 93,
      status: "Parked / Ready",
      heading: 110
    }
  },
  {
    _id: "veh_012",
    name: "MINI Cooper S Clubman",
    brand: "MINI",
    model: "Cooper S Clubman",
    year: 2024,
    category: "Compact",
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    ],
    dailyRate: 85,
    hourlyRate: 12,
    transmission: "Automatic",
    fuelType: "Petrol",
    seats: 5,
    luggageCapacity: 2,
    rangeOrMpg: "35 MPG (189 hp Turbo)",
    features: ["Iconic Split Rear Barn Doors", "Panoramic Sunroof", "Apple CarPlay", "Harman Kardon HiFi", "Comfort Access"],
    rating: 4.82,
    reviewCount: 27,
    location: {
      city: "New York",
      address: "Manhattan West Valet, 9th Ave",
      lat: 40.7533,
      lng: -73.9989
    },
    isAvailable: true,
    maintenanceStatus: "Normal",
    registrationPlate: "NY-MINI24",
    vin: "WMZLV7C53N2M19280",
    telematics: {
      currentLat: 40.7533,
      currentLng: -73.9989,
      speed: 0,
      fuelBatteryPercent: 87,
      status: "Parked / Ready",
      heading: 45
    }
  }
];

