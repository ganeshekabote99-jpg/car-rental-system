# VelocityFleet — Next-Gen Full-Stack Vehicle Rental & Telematics Platform

A modern, responsive, production-ready Full-Stack Vehicle Rental System built with **React.js, Node.js, Express.js, MongoDB**, and modern UI tooling (Tailwind CSS, Lucide Icons, Leaflet GPS Telematics, HTML5 Canvas E-Signature, and QR verification).

---

## 🚀 Key Features Overview

### 1. 🔑 Authentication & Role-Based Access Control
- **Secure JWT Authentication** with bcrypt password hashing.
- **Roles**:
  - `Customer`: Browse vehicles, receive AI trip recommendations, complete multi-step reservations, redeem loyalty points, e-sign rental agreements, view digital QR passes, and monitor live vehicle GPS.
  - `Admin`: Full fleet management (add, edit, delete, toggle service/maintenance), reservation dispatch control, real-time analytics & KPIs, dynamic smart pricing configuration, and counter QR scanner tool.
- **1-Click Demo Login**:
  - **Customer**: `customer@rentride.com` / `pass123`
  - **Admin**: `admin@rentride.com` / `admin123`

---

### 2. 🚗 Vehicle Search, Filtering & Fleet Catalog
- Search by brand, model, and city/pickup hub.
- Filter by category: **Electric EV, Luxury SUV, Sports Car, Sedan, Convertible, Minivan, Compact**.
- Filter by powertrain: **Electric (EV), Hybrid, Petrol**.
- Filter by transmission: **Automatic / Manual**.
- Filter by passenger seating capacity (2+, 4+, 5+, 7+ seats) and daily rate slider.
- Sorting by **Recommended, Price: Low to High, Price: High to Low, Rating (4.9+), and Year**.

---

### 3. 🧠 Innovative Feature: AI Vehicle Recommendations
- Interactive 3-step AI Concierge wizard.
- Factors in trip occasion (Weekend Getaway, Business, Family Vacation, Outdoor Adventure, Luxury Gala, Eco Highway Trip), passengers count, luggage bags, driving priority (Zero Emissions 100% EV, Thrill & Speed, Maximum Comfort, All-Terrain, Best Value), and budget bracket.
- Evaluates fleet telematics and engine profiles to return:
  - Percentage match scores (e.g. `99% Match`)
  - Personalized rationale ("Why this car fits your trip")
  - Best overall, best value, and ultra-luxury badges
  - 1-click select to book

---

### 4. 🛰️ Innovative Feature: Live GPS Tracking & Telematics
- Live 10Hz simulated satellite telematics stream (`/api/telematics/:vehicleId`).
- Interactive telematics monitor with:
  - Real-time speedometer gauge (`km/h`)
  - Battery charge / fuel gauge with live depletion/status
  - Real-time animated coordinate trail and heading direction
  - 75km Metropolitan Geofence compliance verification
  - Hardware diagnostics: Tire pressure (35 PSI), cabin temperature (21.5°C), and odometer

---

### 5. ⚡ Innovative Feature: Smart Dynamic Pricing Engine
- Real-time pricing calculations with transparent breakdown:
  - Base Daily Rate × Trip Days
  - **Multi-day Duration Discounts**:
    - 3+ Days: **5% Off**
    - 7+ Days: **12% Off**
    - 14+ Days: **20% Off**
  - **Dynamic Demand Surge**: Automatic 15% weekend surge (Fri-Sun) and configurable holiday multipliers.
  - Protection Tier selection:
    - Basic State Coverage ($0)
    - Standard Protection ($19/day)
    - Premium Full Coverage Zero-Deductible ($29/day)
  - Travel add-ons: Satellite GPS ($20), FastTrak Toll Pass ($20), Child Seat ($15), Extra Driver ($15).
  - Admin controls to update multipliers and discount brackets live.

---

### 6. 📱 Innovative Feature: QR-Code Bookings & Express Check-In
- Generates encrypted verification QR codes for each confirmed reservation.
- Digital Boarding Pass with booking ID, vehicle plate, schedule, and pickup instructions.
- Includes **Print Pass** and downloadable ticket view.
- **Admin Counter Scanner**: Staff can verify barcode hashes and unlock vehicle doors instantly.

---

### 7. 🤖 Innovative Feature: 24/7 Chatbot Support ("RideBot AI")
- Floating interactive concierge in the bottom-right corner.
- Answers questions about rental documents (license, age 21+), cancellation rules (free up to 24h), insurance coverage, EV charging, and group vehicles.
- Directly renders embedded vehicle cards inside chat bubbles for 1-click booking.

---

### 8. ✍️ Innovative Feature: Digital Rental Agreement with E-Signature
- 100% paperless rental contract.
- Renders dynamic lessor and lessee particulars, license details, vehicle VIN, registration plate, and legal terms.
- Interactive **HTML5 Canvas Signature Pad** allowing customers to draw their handwritten signature via mouse or touch screen before completing checkout.

---

### 9. 🏆 Innovative Feature: RideMiles™ Loyalty Rewards Program
- Earn **10 RideMiles points for every $10 spent**.
- 4 Status Tiers:
  - **Bronze (0+ pts)**: Welcome bonus, standard roadside support.
  - **Silver (500+ pts)**: 5% discount on all bookings, free FastTrak toll pass option.
  - **Gold (1,000+ pts)**: 10% discount, complimentary vehicle class upgrades, young-driver fee waiver.
  - **Platinum (2,000+ pts)**: 15% VIP discount, zero cancellation fees anytime, dedicated concierge.
- **Checkout Redemption Slider**: Redeem points for instant cash discounts (100 points = $5.00 off).

---

### 10. 🛡️ Admin Fleet & Dispatch Dashboard
- High-level KPIs: Total Revenue, Total Fleet, Fleet in Custody, Utilization %, Service Bay count.
- Fleet Management: Register new vehicles, remove vehicles, toggle maintenance mode.
- Reservation Management: Update statuses (`Confirmed` ➔ `Active / Picked Up` ➔ `Completed` ➔ `Cancelled`).
- Dynamic Pricing controls: Adjust multipliers and surge toggles.

---

## 💻 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide React, HTML5 Canvas, Canvas Confetti |
| **Backend** | Node.js, Express.js, RESTful API |
| **Database** | MongoDB / Mongoose (with automated In-Memory Hybrid Store fallback for instant zero-config startup) |
| **Security** | JWT (JSON Web Tokens), bcryptjs |
| **Telematics & QR** | Leaflet GPS integration, qrcode generator, simulated 10Hz telemetry stream |

---

## 🛠️ How to Run Locally

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### 1. Start the Backend Server
```bash
cd server
npm start
```
*The server will start on `http://localhost:5000`.*
*(If MongoDB is not running locally, the server automatically activates its high-performance in-memory datastore with pre-seeded luxury fleet and demo accounts).*

### 2. Start the Frontend Client
In a separate terminal:
```bash
cd client
npm run dev
```
*The client will start on `http://localhost:3000`.*

---

## 🧪 Testing the API
To run the automated end-to-end API test suite:
```bash
cd server
node test-api.js
```

