import { Request, Response } from 'express';
import { getOrCreateDemoUser } from './profileController.js';
import { generateCareerAdvice, ChatMessage } from '../services/geminiService.js';

export async function chatWithAI(req: Request, res: Response) {
  try {
    const { message, history } = req.body;

    console.log(`[AI] Request received at /api/ai/chat (payload length: ${typeof message === 'string' ? message.length : 0})`);

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: 'Message is required and must be a non-empty string'
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        error: 'Message exceeds maximum length of 2000 characters'
      });
    }

    // Validate and sanitize history if provided
    const cleanHistory: ChatMessage[] = Array.isArray(history)
      ? history
          .filter(h => h && typeof h.content === 'string' && (h.role === 'user' || h.role === 'assistant' || h.role === 'model'))
          .map(h => ({
            role: (h.role === 'assistant' || h.role === 'model' ? 'assistant' : 'user') as 'assistant' | 'user',
            content: h.content.trim().slice(0, 2000)
          }))
      : [];

    const user = await getOrCreateDemoUser();
    const result = await generateCareerAdvice(message.trim(), cleanHistory, user.id);

    // Return structured JSON as required: { "message": "AI response here" }
    return res.status(200).json({
      message: result.reply,
      reply: result.reply, // Compatibility alias
      isMockFallback: result.isMockFallback || false
    });
  } catch (error: any) {
    console.error('[AI] Controller error caught:', error?.message || error);

    const errorMessage = error?.message || 'Failed to process AI chat request';
    const isTimeout = errorMessage.includes('timed out');
    const statusCode = isTimeout ? 504 : 503;

    return res.status(statusCode).json({
      error: errorMessage,
      message: errorMessage
    });
  }
}
