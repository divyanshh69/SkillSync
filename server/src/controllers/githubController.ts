import { Request, Response } from 'express';
import { githubService } from '../services/githubService.js';

export async function analyzeRepository(req: Request, res: Response) {
  try {
    const rawUrl = req.body.repositoryUrl || req.body.url || req.body.repoUrl;

    if (!rawUrl || typeof rawUrl !== 'string' || rawUrl.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid GitHub repository URL.'
      });
    }

    const sanitizedUrl = rawUrl.trim();
    console.log(`[GitHub API] Starting analysis for repository: ${sanitizedUrl}`);

    const analysis = await githubService.analyzeRepository(sanitizedUrl);

    console.log(`[GitHub API] Successfully analyzed ${analysis.repository.name}: ${analysis.technologies.length} techs, ${analysis.suggestedSkills.length} suggested skills.`);

    return res.json({
      success: true,
      data: analysis
    });
  } catch (error: any) {
    const message = error.message || 'Failed to analyze GitHub repository.';
    console.error('[GitHub API] Analysis error:', message);

    if (message.includes('valid public GitHub repository URL')) {
      return res.status(400).json({
        success: false,
        error: message
      });
    }

    if (message.includes('not found') || message.includes('ensure the repository is public')) {
      return res.status(404).json({
        success: false,
        error: message
      });
    }

    if (message.includes('rate limit')) {
      return res.status(429).json({
        success: false,
        error: message
      });
    }

    return res.status(500).json({
      success: false,
      error: message
    });
  }
}

