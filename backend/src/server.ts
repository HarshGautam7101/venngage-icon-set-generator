// Load env vars first so anything imported later can read them
import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import iconRoutes from './routes/iconRoutes';

const app: Express = express();
const PORT = process.env.PORT;

// Global middlewares
app.use(cors());                  // Allow frontend to talk to backend
app.use(express.json());          // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form-like data

// Small request logger so we know what's hitting the server
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API routes related to icon generation
app.use('/api/icons', iconRoutes);

// Quick sanity route to confirm server is alive
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Icon Generator API is running 👋',
    version: '1.0.0',
    endpoints: {
      health: '/api/icons/health',
      generate: '/api/icons/generate (POST)'
    }
  });
});

// Catch-all error handler — logs errors and returns a friendly message
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Boot the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log(`🔑 Replicate API Token: ${
    process.env.REPLICATE_API_TOKEN ? 'Loaded' : 'Missing — check .env'
  }`);
});
