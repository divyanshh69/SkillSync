import { Router } from 'express';
import { chatWithAI } from '../controllers/aiController.js';

const router = Router();

// POST /api/ai/chat - Process conversational career guidance with Gemini + user context
router.post('/chat', chatWithAI);

export default router;

