import { Request, Response } from 'express';
import { githubService, parseGitHubUrl } from '../services/githubService.js';
import { getOrCreateDemoUser } from './profileController.js';
import { prisma } from '../config/prisma.js';

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

export async function getGitHubProfile(req: Request, res: Response) {
  try {
    const username = (req.params.username || req.query.username) as string;

    if (!username || typeof username !== 'string' || !username.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid GitHub username.'
      });
    }

    const cleanUsername = username.trim().replace(/^@+/, '');
    console.log(`[GitHub API] Fetching user profile for: ${cleanUsername}`);

    const profile = await githubService.getUserProfile(cleanUsername);

    return res.json({
      success: true,
      data: profile
    });
  } catch (error: any) {
    const message = error.message || 'Failed to retrieve GitHub user profile.';
    console.error('[GitHub API] Profile error:', message);

    const status = message.includes('not found')
      ? 404
      : message.includes('rate limit')
      ? 429
      : 500;

    return res.status(status).json({
      success: false,
      error: message
    });
  }
}

export async function getGitHubRepositories(req: Request, res: Response) {
  try {
    const username = (req.params.username || req.query.username) as string;

    if (!username || typeof username !== 'string' || !username.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid GitHub username.'
      });
    }

    const cleanUsername = username.trim().replace(/^@+/, '');
    console.log(`[GitHub API] Fetching repositories for: ${cleanUsername}`);

    const user = await getOrCreateDemoUser();
    const repos = await githubService.getUserRepositories(cleanUsername, user.id);

    console.log(`[GitHub API] Retrieved ${repos.length} repositories for ${cleanUsername}`);

    return res.json({
      success: true,
      data: repos
    });
  } catch (error: any) {
    const message = error.message || 'Failed to retrieve GitHub repositories.';
    console.error('[GitHub API] Repositories error:', message);

    const status = message.includes('not found')
      ? 404
      : message.includes('rate limit')
      ? 429
      : 500;

    return res.status(status).json({
      success: false,
      error: message
    });
  }
}

export async function importGitHubRepository(req: Request, res: Response) {
  try {
    const user = await getOrCreateDemoUser();
    const payload = req.body;

    const rawUrl = payload?.repositoryUrl || payload?.githubUrl;
    if (!rawUrl || typeof rawUrl !== 'string' || !payload?.name) {
      return res.status(400).json({
        success: false,
        error: 'Repository URL and project name are required to import.'
      });
    }

    console.log(`[GitHub API] Importing repository: ${payload.name} (${rawUrl}) for user ${user.id}`);

    const importedProject = await githubService.importRepository(user.id, {
      ...payload,
      repositoryUrl: rawUrl
    });

    // Automatically link githubUsername if not yet set on profile
    const parsed = parseGitHubUrl(rawUrl);
    if (parsed && !user.githubUsername) {
      await prisma.user.update({
        where: { id: user.id },
        data: { githubUsername: parsed.owner }
      });
    }

    console.log(`[GitHub API] Successfully imported project ${importedProject.name} (ID: ${importedProject.id})`);

    return res.status(201).json({
      success: true,
      data: importedProject
    });
  } catch (error: any) {
    const message = error.message || 'Failed to import GitHub repository.';
    console.error('[GitHub API] Import error:', message);

    const status = message.includes('already been imported') ? 409 : 500;

    return res.status(status).json({
      success: false,
      error: message
    });
  }
}


