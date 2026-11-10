import { Router } from 'express';
import { analyzeRepository } from '../controllers/githubController.js';

const router = Router();

// POST /api/github/analyze
router.post('/analyze', analyzeRepository);

export default router;

