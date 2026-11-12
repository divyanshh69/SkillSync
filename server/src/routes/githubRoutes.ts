import { Router } from 'express';
import { 
  analyzeRepository, 
  getGitHubProfile, 
  getGitHubRepositories, 
  importGitHubRepository 
} from '../controllers/githubController.js';

const router = Router();

// POST /api/github/analyze - Analyze a single repository URL
router.post('/analyze', analyzeRepository);

// GET /api/github/user/:username - Retrieve public GitHub user profile
router.get('/user/:username', getGitHubProfile);

// GET /api/github/user/:username/repos - Retrieve public repositories with skill suggestions
router.get('/user/:username/repos', getGitHubRepositories);

// POST /api/github/import - Import a repository as a project in SkillSync
router.post('/import', importGitHubRepository);

export default router;


