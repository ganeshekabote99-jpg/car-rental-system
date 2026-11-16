import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectDB, isConnectedToMongo } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import telematicsRoutes from './routes/telematicsRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Connect database (with automatic seamless in-memory fallback)
connectDB();

// Backend API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: isConnectedToMongo ? 'MongoDB Atlas / Local' : 'High-Performance In-Memory Store (Active)',
    version: '1.0.0',
    mode: 'Unified Full-Stack Server',
    services: {
      auth: 'online',
      fleet: 'online',
      smartPricing: 'online',
      aiRecommendations: 'online',
      gpsTelematics: 'online',
      chatbot: 'online',
      qrVerification: 'online',
      digitalAgreements: 'online',
    },
  });
});

// Mount All Backend API Routes under "/api"
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/telematics', telematicsRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Serve Frontend Static Assets from client/dist (Unified Single-Port Deployment)
const clientDistPath = path.resolve(__dirname, '../client/dist');

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  // Catch-all route to serve client index.html for Single Page Application (SPA) routing
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ message: 'API endpoint not found' });
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Frontend build not detected. Please run "npm run build" in the client directory.');
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`\n=============================================================`);
  console.log(`🚀 VelocityFleet Unified Full-Stack Platform Active!`);
  console.log(`🌐 SINGLE LOCALHOST LINK: http://localhost:${PORT}`);
  console.log(`📡 API Health Check:     http://localhost:${PORT}/api/health`);
  console.log(`👤 Customer Demo:        customer@rentride.com / pass123`);
  console.log(`🔑 Admin Demo:           admin@rentride.com / admin123`);
  console.log(`=============================================================\n`);
});
