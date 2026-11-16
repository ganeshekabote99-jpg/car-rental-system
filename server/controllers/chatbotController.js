import { store } from '../data/store.js';

export const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ message: 'Message content is required' });
    }

    const q = message.toLowerCase();
    const allVehicles = store.getAllVehicles();

    let reply = "";
    let suggestedVehicles = [];
    let quickActions = [];

    if (q.includes('document') || q.includes('requirement') || q.includes('license') || q.includes('age')) {
      reply = "To rent any vehicle with VelocityFleet, you need:\n1. A valid driver's license (domestic or international)\n2. A credit card or debit card in the driver's name\n3. Driver must be at least 21 years old (young driver fee is completely waived for Gold & Platinum loyalty members).\nAll verification is handled digitally during checkout!";
      quickActions = ["Browse Available Fleet", "Check Loyalty Tiers", "Pricing Information"];
    } else if (q.includes('electric') || q.includes('ev') || q.includes('tesla') || q.includes('battery')) {
      const evs = allVehicles.filter(v => v.fuelType === 'Electric');
      suggestedVehicles = evs.slice(0, 3);
      reply = `We feature top-tier premium EVs in our fleet with supercharging included:\n- **Tesla Model S Plaid**: 1,020 HP, 396-mile range\n- **Lucid Air Grand Touring**: 516-mile EPA range with ultra-fast 900V charging\n- **Audi RS e-tron GT**: 637 HP with quattro AWD.`;
      quickActions = ["View Tesla Model S", "View Lucid Air", "AI Recommendation Wizard"];
    } else if (q.includes('loyalty') || q.includes('reward') || q.includes('points') || q.includes('tier')) {
      reply = "Our **RideMiles™ Loyalty Program** gives you instant rewards:\n- **Earn 10 points** for every $10 spent\n- **Bronze Tier**: Free digital check-in & toll-pass option\n- **Silver Tier (500 pts)**: 5% off rentals & priority customer support\n- **Gold Tier (1,000 pts)**: 10% discount, free young-driver waiver & complimentary upgrade\n- **Platinum Tier (2,000 pts)**: 15% discount, zero cancellation fees, dedicated concierge.\nYou can redeem points directly at checkout for instant cash savings!";
      quickActions = ["Check My Tier", "Book a Vehicle", "How to Earn Points"];
    } else if (q.includes('cancel') || q.includes('refund') || q.includes('policy')) {
      reply = "Our cancellation policy is flexible and hassle-free:\n- **Free 100% cancellation** up to 24 hours before your pickup time\n- Instant refunds are credited back to your original payment method within 1-3 business days\n- Modify pickup dates or times anytime via your User Dashboard!";
      quickActions = ["View My Bookings", "Fleet Search", "Customer Support"];
    } else if (q.includes('family') || q.includes('7 seat') || q.includes('8 seat') || q.includes('group') || q.includes('van')) {
      const familyCars = allVehicles.filter(v => v.seats >= 7);
      suggestedVehicles = familyCars;
      reply = "For family or group trips, we highly recommend:\n- **Toyota Sienna Hybrid Platinum** (8 passengers, captain chairs, dual power doors, vacuum & onboard fridge)\n- **Range Rover Autobiography** (7 passengers, Meridian 3D sound, executive luxury comfort).";
      quickActions = ["Book Toyota Sienna", "Book Range Rover", "Run AI Match Wizard"];
    } else if (q.includes('sports') || q.includes('fast') || q.includes('porsche') || q.includes('bmw') || q.includes('corvette')) {
      const sports = allVehicles.filter(v => v.category === 'Sports Car' || v.category === 'Convertible');
      suggestedVehicles = sports.slice(0, 3);
      reply = "Looking for high thrills? Check out our exotic performance lineup:\n- **Porsche 911 Carrera 4S** (Twin-Turbo 443 hp)\n- **BMW M4 Competition** (503 hp M xDrive)\n- **Chevrolet Corvette C8 Convertible** (Mid-engine V8).";
      quickActions = ["View Porsche 911", "View BMW M4", "View Corvette C8"];
    } else if (q.includes('gps') || q.includes('tracking') || q.includes('telematics')) {
      reply = "Every vehicle in our fleet is equipped with **Live Satellite Telematics**! You can track real-time coordinates, current speed, battery/fuel status, and geofencing directly from your active booking screen.";
      quickActions = ["Test Live GPS Telematics", "View Fleet", "Contact Support"];
    } else if (q.includes('agreement') || q.includes('sign') || q.includes('qr')) {
      reply = "VelocityFleet is 100% paperless! During checkout, you digitally sign your rental contract on our HTML5 e-signature pad. Once confirmed, you get an encrypted **QR-Pass** for contactless 60-second pickup at any hub!";
      quickActions = ["Start a Reservation", "View Sample Agreement", "Pricing Breakdown"];
    } else {
      reply = "Welcome to **VelocityFleet Concierge**! I can help you find the ideal vehicle, explain our smart pricing, answer insurance & policy questions, or guide you through AI recommendations. What would you like to explore?";
      quickActions = ["Recommend a car for my trip", "Show Electric Vehicles", "Check Loyalty Benefits", "Browse All Cars"];
    }

    return res.json({
      reply,
      suggestedVehicles,
      quickActions,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

