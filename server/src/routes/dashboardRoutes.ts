import { Router } from 'express';
import { getDashboardData, getNextStepRecommendation } from '../controllers/dashboardController.js';

const router = Router();

router.get('/', getDashboardData);
router.get('/next-step', getNextStepRecommendation);

export default router;

