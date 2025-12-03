import { Router } from 'express';
import { IconController } from '../controllers/iconController';

const router = Router();
const iconController = new IconController();

// POST /api/icons/generate
// Kicks off generation of a small icon set based on the given prompt + style
router.post('/generate', (req, res) => iconController.generateIcons(req, res));

// GET /api/icons/health
// Lightweight health check used by the frontend before calling /generate
router.get('/health', (req, res) => iconController.healthCheck(req, res));

export default router;