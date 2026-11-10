import { Router } from 'express';
import { submitOnboarding, getOnboardingStatus, resetOnboarding } from '../controllers/onboardingController.js';

const router = Router();

// POST /api/onboarding - Complete onboarding and generate personalized roadmap
router.post('/', submitOnboarding);

// GET /api/onboarding/status - Check if current student has completed onboarding
router.get('/status', getOnboardingStatus);

// POST /api/onboarding/reset - Reset onboarding status for testing
router.post('/reset', resetOnboarding);

export default router;

