import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import iconRoutes from './routes/iconRoutes';

// Load environment variables from .env once at startup
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Very simple request logger so we can see what's hitting the API
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Icon-related routes live under this prefix
app.use('/api/icons', iconRoutes);

// Basic landing route to confirm the API is up
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Icon Generator API',
    version: '1.0.0',
    endpoints: {
      health: '/api/icons/health',
      generate: '/api/icons/generate (POST)'
    }
  });
});

// Fallback error handler – anything thrown and not caught above lands here
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Start HTTP server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log(`✅ Replicate API Token: ${process.env.REPLICATE_API_TOKEN ? 'Configured' : 'Missing'}`);
});