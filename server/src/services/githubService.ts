import { prisma } from '../config/prisma.js';
import { SkillStatus } from '@prisma/client';

export interface GitHubUserProfile {
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  htmlUrl: string;
  publicReposCount: number;
  followersCount: number;
  location: string;
  company: string;
  blog: string;
}

export interface GitHubRepoSummary {
  id: number | string;
  name: string;
  fullName: string;
  description: string;
  primaryLanguage: string;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  isFork: boolean;
  isAlreadyImported: boolean;
  technologies: string[];
  suggestedSkills: SuggestedSkillItem[];
}

export interface ImportRepoPayload {
  repositoryUrl: string;
  name: string;
  tagline?: string;
  description: string;
  technologies?: string[] | string;
  evidencedSkills?: string[];
  liveDemoUrl?: string;
  githubRepoId?: string;
  status?: string;
}

export interface GitHubRepoMetadata {
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  primaryLanguage: string | null;
  stars: number;
  forks: number;
  defaultBranch: string;
  topics: string[];
}

export interface SuggestedSkillItem {
  name: string;
  reason: string;
  category?: string;
}

export interface GitHubAnalysisResult {
  repository: {
    name: string;
    description: string;
    url: string;
    primaryLanguage: string;
    stars?: number;
    topics?: string[];
    defaultBranch?: string;
  };
  technologies: string[];
  suggestedSkills: SuggestedSkillItem[];
  detectedFiles: string[];
}

interface SkillMatchRule {
  tech: string;
  skillKeyword: string;
  reason: string;
  categoryDefault?: string;
}

/**
 * Validates and extracts owner and repo from a GitHub URL.
 * Handles formats like:
 * - https://github.com/owner/repo
 * - http://github.com/owner/repo/
 * - github.com/owner/repo
 * - https://github.com/owner/repo.git
 * - https://github.com/owner/repo/tree/main/...
 */
export function parseGitHubUrl(rawUrl: string): { owner: string; repo: string } | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();

  // Pattern matches github.com/{owner}/{repo}
  const match = trimmed.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)/i);
  if (!match) return null;

  const owner = match[1];
  let repo = match[2];

  // Strip trailing .git or slashes
  if (repo.endsWith('.git')) {
    repo = repo.slice(0, -4);
  }
  repo = repo.replace(/\/+$/, '');

  if (!owner || !repo) return null;
  return { owner, repo };
}

/**
 * Returns GitHub API headers, injecting GITHUB_TOKEN if available in environment.
 */
function getGitHubHeaders(raw = false): Record<string, string> {
  const headers: Record<string, string> = {
    'User-Agent': 'SkillSync-Career-Companion/1.0',
    'Accept': raw ? 'application/vnd.github.v3.raw' : 'application/vnd.github.v3+json'
  };

  const token = process.env.GITHUB_TOKEN;
  if (token && token.trim().length > 0) {
    headers['Authorization'] = `token ${token.trim()}`;
  }

  return headers;
}

/**
 * Safe fetch wrapper with timeout
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 10000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    return res;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('Connection to GitHub timed out. Please try again.');
    }
    throw err;
  } finally {
    clearTimeout(id);
  }
}

// Deterministic JS/TS dependency catalog
const JS_DEPENDENCY_RULES: Record<string, { tech: string; skillKeyword: string; reason: string }> = {
  // Frontend Frameworks & UI
  'react': { tech: 'React', skillKeyword: 'React', reason: "Detected 'react' in package.json dependencies" },
  'react-dom': { tech: 'React', skillKeyword: 'React', reason: "Detected 'react-dom' in package.json dependencies" },
  'vue': { tech: 'Vue.js', skillKeyword: 'Frontend', reason: "Detected 'vue' in package.json dependencies" },
  'svelte': { tech: 'Svelte', skillKeyword: 'Frontend', reason: "Detected 'svelte' in package.json dependencies" },
  'next': { tech: 'Next.js', skillKeyword: 'React', reason: "Detected 'next' React framework in package.json" },
  'nuxt': { tech: 'Nuxt.js', skillKeyword: 'Frontend', reason: "Detected 'nuxt' full-stack framework in package.json" },

  // TypeScript & Core Languages
  'typescript': { tech: 'TypeScript', skillKeyword: 'TypeScript', reason: "Detected 'typescript' in dependencies" },

  // Styling & Design
  'tailwindcss': { tech: 'Tailwind CSS', skillKeyword: 'Tailwind', reason: "Detected 'tailwindcss' in styling dependencies" },
  '@tailwindcss/typography': { tech: 'Tailwind CSS', skillKeyword: 'Tailwind', reason: "Detected Tailwind typography plugin" },
  'sass': { tech: 'Sass / SCSS', skillKeyword: 'CSS', reason: "Detected 'sass' stylesheet preprocessor" },
  'styled-components': { tech: 'Styled Components', skillKeyword: 'CSS', reason: "Detected 'styled-components' CSS-in-JS library" },

  // State Management
  'zustand': { tech: 'Zustand', skillKeyword: 'State Management', reason: "Detected 'zustand' client state store in dependencies" },
  'redux': { tech: 'Redux', skillKeyword: 'State Management', reason: "Detected 'redux' centralized state management in dependencies" },
  '@reduxjs/toolkit': { tech: 'Redux Toolkit', skillKeyword: 'State Management', reason: "Detected '@reduxjs/toolkit' in dependencies" },
  'recoil': { tech: 'Recoil', skillKeyword: 'State Management', reason: "Detected 'recoil' atomic state management" },

  // Data Fetching & Networking
  'axios': { tech: 'Axios', skillKeyword: 'Data Fetching', reason: "Detected 'axios' HTTP client in dependencies" },
  '@tanstack/react-query': { tech: 'TanStack Query', skillKeyword: 'Data Fetching', reason: "Detected '@tanstack/react-query' asynchronous state management" },
  'swr': { tech: 'SWR', skillKeyword: 'Data Fetching', reason: "Detected 'swr' data-fetching hook library" },

  // Backend & Servers
  'express': { tech: 'Node.js & Express', skillKeyword: 'Express', reason: "Detected 'express' server runtime in dependencies" },
  'fastify': { tech: 'Fastify', skillKeyword: 'Backend', reason: "Detected 'fastify' high-performance backend framework" },
  'koa': { tech: 'Koa', skillKeyword: 'Backend', reason: "Detected 'koa' backend middleware framework" },
  '@nestjs/core': { tech: 'NestJS', skillKeyword: 'Backend', reason: "Detected '@nestjs/core' modular enterprise architecture" },
  'hono': { tech: 'Hono', skillKeyword: 'Backend', reason: "Detected 'hono' edge web framework" },

  // Databases & ORMs
  'prisma': { tech: 'Prisma ORM', skillKeyword: 'Prisma', reason: "Detected 'prisma' type-safe ORM in dependencies" },
  '@prisma/client': { tech: 'Prisma ORM', skillKeyword: 'Prisma', reason: "Detected '@prisma/client' ORM client in dependencies" },
  'drizzle-orm': { tech: 'Drizzle ORM', skillKeyword: 'Prisma', reason: "Detected 'drizzle-orm' database toolkit in dependencies" },
  'pg': { tech: 'PostgreSQL', skillKeyword: 'PostgreSQL', reason: "Detected 'pg' PostgreSQL client driver in dependencies" },
  'postgres': { tech: 'PostgreSQL', skillKeyword: 'PostgreSQL', reason: "Detected 'postgres' database client driver" },
  'mysql2': { tech: 'MySQL', skillKeyword: 'Databases', reason: "Detected 'mysql2' relational database driver" },
  'mongoose': { tech: 'MongoDB', skillKeyword: 'Databases', reason: "Detected 'mongoose' ODM in dependencies" },
  'sqlite3': { tech: 'SQLite', skillKeyword: 'Databases', reason: "Detected 'sqlite3' embedded database driver" },
  'better-sqlite3': { tech: 'SQLite', skillKeyword: 'Databases', reason: "Detected 'better-sqlite3' database driver" },
  'redis': { tech: 'Redis', skillKeyword: 'Databases', reason: "Detected 'redis' in-memory cache client" },
  'ioredis': { tech: 'Redis', skillKeyword: 'Databases', reason: "Detected 'ioredis' client in dependencies" },

  // Auth & Security
  'jsonwebtoken': { tech: 'JWT Authentication', skillKeyword: 'JWT', reason: "Detected 'jsonwebtoken' token-based authentication library" },
  'bcrypt': { tech: 'Bcrypt', skillKeyword: 'Security', reason: "Detected 'bcrypt' cryptographic password hashing" },
  'bcryptjs': { tech: 'Bcrypt', skillKeyword: 'Security', reason: "Detected 'bcryptjs' password hashing in dependencies" },
  'passport': { tech: 'Passport.js', skillKeyword: 'JWT', reason: "Detected 'passport' authentication middleware" },
  'zod': { tech: 'Zod', skillKeyword: 'TypeScript', reason: "Detected 'zod' schema validation and type inference" },

  // Testing & Quality
  'vitest': { tech: 'Vitest', skillKeyword: 'Testing', reason: "Detected 'vitest' unit test runner in devDependencies" },
  'jest': { tech: 'Jest', skillKeyword: 'Testing', reason: "Detected 'jest' test suite in devDependencies" },
  '@testing-library/react': { tech: 'React Testing Library', skillKeyword: 'Testing', reason: "Detected '@testing-library/react' component test suite" },
  'cypress': { tech: 'Cypress', skillKeyword: 'Testing', reason: "Detected 'cypress' end-to-end testing framework" },
  'playwright': { tech: 'Playwright', skillKeyword: 'Testing', reason: "Detected 'playwright' browser automation & test suite" },
  '@playwright/test': { tech: 'Playwright', skillKeyword: 'Testing', reason: "Detected '@playwright/test' automation framework" },
  'eslint': { tech: 'ESLint', skillKeyword: 'Tooling', reason: "Detected 'eslint' code quality linter" }
};

// Deterministic Python dependency catalog
const PYTHON_DEPENDENCY_RULES: Record<string, { tech: string; skillKeyword: string; reason: string }> = {
  'pandas': { tech: 'Pandas', skillKeyword: 'Pandas', reason: "Detected 'pandas' DataFrame manipulation library" },
  'numpy': { tech: 'NumPy', skillKeyword: 'NumPy', reason: "Detected 'numpy' numerical array & scientific computing library" },
  'scikit-learn': { tech: 'Scikit-Learn', skillKeyword: 'Scikit-Learn', reason: "Detected 'scikit-learn' machine learning package" },
  'sklearn': { tech: 'Scikit-Learn', skillKeyword: 'Scikit-Learn', reason: "Detected 'sklearn' machine learning module" },
  'torch': { tech: 'PyTorch', skillKeyword: 'Deep Learning', reason: "Detected 'torch' (PyTorch) deep learning framework" },
  'pytorch': { tech: 'PyTorch', skillKeyword: 'Deep Learning', reason: "Detected 'pytorch' deep learning framework" },
  'tensorflow': { tech: 'TensorFlow', skillKeyword: 'Deep Learning', reason: "Detected 'tensorflow' machine learning & neural network library" },
  'keras': { tech: 'Keras', skillKeyword: 'Deep Learning', reason: "Detected 'keras' deep learning high-level API" },
  'fastapi': { tech: 'FastAPI', skillKeyword: 'API', reason: "Detected 'fastapi' modern high-performance web API framework" },
  'flask': { tech: 'Flask', skillKeyword: 'API', reason: "Detected 'flask' lightweight web framework" },
  'django': { tech: 'Django', skillKeyword: 'Backend', reason: "Detected 'django' full-stack web framework" },
  'pytest': { tech: 'Pytest', skillKeyword: 'Testing', reason: "Detected 'pytest' test runner in requirements" },
  'matplotlib': { tech: 'Matplotlib', skillKeyword: 'Visualization', reason: "Detected 'matplotlib' data visualization library" },
  'seaborn': { tech: 'Seaborn', skillKeyword: 'Visualization', reason: "Detected 'seaborn' statistical data visualization library" },
  'sqlalchemy': { tech: 'SQLAlchemy', skillKeyword: 'SQL', reason: "Detected 'sqlalchemy' database ORM" },
  'streamlit': { tech: 'Streamlit', skillKeyword: 'Visualization', reason: "Detected 'streamlit' interactive dashboard framework" },
  'langchain': { tech: 'LangChain', skillKeyword: 'AI', reason: "Detected 'langchain' LLM orchestration framework" },
  'transformers': { tech: 'Hugging Face Transformers', skillKeyword: 'Deep Learning', reason: "Detected 'transformers' NLP and LLM model library" }
};

export class GitHubService {
  /**
   * Main analysis orchestrator
   */
  public async analyzeRepository(repositoryUrl: string): Promise<GitHubAnalysisResult> {
    // 1. Validate URL
    const parsed = parseGitHubUrl(repositoryUrl);
    if (!parsed) {
      throw new Error('Please enter a valid public GitHub repository URL (e.g., https://github.com/owner/repository).');
    }

    const { owner, repo } = parsed;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

    // 2. Fetch Repository Metadata
    const repoRes = await fetchWithTimeout(apiUrl, {
      headers: getGitHubHeaders(false)
    });

    if (repoRes.status === 404) {
      throw new Error('Repository not found. Please verify the URL and ensure the repository is public.');
    }

    if (repoRes.status === 403 || repoRes.status === 429) {
      const remaining = repoRes.headers.get('x-ratelimit-remaining');
      if (remaining === '0') {
        throw new Error('GitHub API rate limit reached. Please wait a few minutes or add a GITHUB_TOKEN in server/.env.');
      }
      throw new Error('Access to repository was denied by GitHub API.');
    }

    if (!repoRes.ok) {
      throw new Error(`GitHub API error: ${repoRes.statusText} (${repoRes.status})`);
    }

    const repoData = (await repoRes.json()) as any;

    // 3. Fetch Languages Distribution
    const languagesUrl = `https://api.github.com/repos/${owner}/${repo}/languages`;
    let languageData: Record<string, number> = {};
    try {
      const langRes = await fetchWithTimeout(languagesUrl, {
        headers: getGitHubHeaders(false)
      });
      if (langRes.ok) {
        languageData = (await langRes.json()) as Record<string, number>;
      }
    } catch (e) {
      console.warn('[GitHub Analysis] Could not fetch language distribution, continuing...');
    }

    // 4. Fetch Root Contents
    const contentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
    let rootContents: Array<{ name: string; type: string; path: string }> = [];
    try {
      const contentsRes = await fetchWithTimeout(contentsUrl, {
        headers: getGitHubHeaders(false)
      });
      if (contentsRes.ok) {
        const json = await contentsRes.json();
        if (Array.isArray(json)) {
          rootContents = json;
        }
      }
    } catch (e) {
      console.warn('[GitHub Analysis] Could not fetch root directory contents, continuing...');
    }

    const rootFileNames = rootContents.map(c => c.name);

    // 5. Detect Important Files
    const detectedFiles: string[] = [];
    const importantSignatures = [
      'package.json',
      'tsconfig.json',
      'tailwind.config.js',
      'tailwind.config.ts',
      'tailwind.config.cjs',
      'vite.config.js',
      'vite.config.ts',
      'next.config.js',
      'next.config.mjs',
      'next.config.ts',
      'Dockerfile',
      'docker-compose.yml',
      'docker-compose.yaml',
      'compose.yaml',
      'requirements.txt',
      'pyproject.toml',
      'Pipfile',
      'schema.prisma',
      '.github',
      'src',
      'README.md',
      'go.mod',
      'Cargo.toml',
      'pom.xml',
      'build.gradle'
    ];

    for (const signature of importantSignatures) {
      if (rootFileNames.includes(signature)) {
        detectedFiles.push(signature);
      }
    }

    // Accumulators for technologies and skill matching rules
    const detectedTechs = new Set<string>();
    const skillRules: SkillMatchRule[] = [];

    // Add primary repository language
    if (repoData.language) {
      detectedTechs.add(repoData.language);
      if (repoData.language === 'TypeScript') {
        skillRules.push({
          tech: 'TypeScript',
          skillKeyword: 'TypeScript Fundamentals',
          reason: 'Primary repository language is TypeScript'
        });
      } else if (repoData.language === 'JavaScript') {
        skillRules.push({
          tech: 'JavaScript',
          skillKeyword: 'Modern JavaScript (ES6+)',
          reason: 'Primary repository language is JavaScript'
        });
      } else if (repoData.language === 'Python') {
        skillRules.push({
          tech: 'Python',
          skillKeyword: 'Python for Data Science',
          reason: 'Primary repository language is Python'
        });
      }
    }

    // Add other top languages (> 5% of code volume)
    const totalLangBytes = Object.values(languageData).reduce((a, b) => a + b, 0);
    for (const [lang, bytes] of Object.entries(languageData)) {
      if (totalLangBytes > 0 && (bytes / totalLangBytes) >= 0.05) {
        detectedTechs.add(lang);
      }
    }

    // Always include Git & Version Control for any verified GitHub repo
    detectedTechs.add('Git');
    skillRules.push({
      tech: 'Git',
      skillKeyword: 'Git & Version Control',
      reason: 'Structured repository with Git version control history'
    });

    // 6. Deep File Inspection: package.json
    const hasPackageJson = rootFileNames.includes('package.json');
    if (hasPackageJson) {
      try {
        const pkgRes = await fetchWithTimeout(`https://api.github.com/repos/${owner}/${repo}/contents/package.json`, {
          headers: getGitHubHeaders(true)
        });
        if (pkgRes.ok) {
          const rawText = await pkgRes.text();
          const pkg = JSON.parse(rawText);
          const allDeps = {
            ...(pkg.dependencies || {}),
            ...(pkg.devDependencies || {}),
            ...(pkg.peerDependencies || {})
          };

          for (const [depName, rule] of Object.entries(JS_DEPENDENCY_RULES)) {
            if (allDeps[depName] !== undefined) {
              detectedTechs.add(rule.tech);
              skillRules.push({
                tech: rule.tech,
                skillKeyword: rule.skillKeyword,
                reason: rule.reason
              });
            }
          }
        }
      } catch (e) {
        console.warn('[GitHub Analysis] Could not parse package.json, falling back to file checks');
      }
    }

    // 7. Deep File Inspection: requirements.txt or pyproject.toml
    const hasRequirements = rootFileNames.includes('requirements.txt');
    const hasPyProject = rootFileNames.includes('pyproject.toml');

    if (hasRequirements || hasPyProject) {
      detectedTechs.add('Python');
      skillRules.push({
        tech: 'Python',
        skillKeyword: 'Python',
        reason: 'Detected Python project configuration in repository'
      });

      const manifestFile = hasRequirements ? 'requirements.txt' : 'pyproject.toml';
      try {
        const pyRes = await fetchWithTimeout(`https://api.github.com/repos/${owner}/${repo}/contents/${manifestFile}`, {
          headers: getGitHubHeaders(true)
        });
        if (pyRes.ok) {
          const pyText = (await pyRes.text()).toLowerCase();
          for (const [pkgName, rule] of Object.entries(PYTHON_DEPENDENCY_RULES)) {
            // Regex to check package name as whole word in requirements or pyproject
            const pkgRegex = new RegExp(`\\b${pkgName.replace('-', '[-_]')}\\b`, 'i');
            if (pkgRegex.test(pyText)) {
              detectedTechs.add(rule.tech);
              skillRules.push({
                tech: rule.tech,
                skillKeyword: rule.skillKeyword,
                reason: rule.reason
              });
            }
          }
        }
      } catch (e) {
        console.warn('[GitHub Analysis] Could not parse Python manifest file');
      }
    }

    // 8. Deterministic File-Level Rules
    if (rootFileNames.some(f => f.startsWith('Dockerfile') || f.startsWith('docker-compose') || f === 'compose.yaml')) {
      detectedTechs.add('Docker');
      skillRules.push({
        tech: 'Docker',
        skillKeyword: 'Docker',
        reason: 'Detected Dockerfile or docker-compose in repository root'
      });
    }

    if (rootFileNames.includes('.github')) {
      detectedTechs.add('GitHub Actions');
      skillRules.push({
        tech: 'GitHub Actions',
        skillKeyword: 'CI/CD',
        reason: 'Detected .github automation & workflows directory'
      });
    }

    if (rootFileNames.includes('schema.prisma')) {
      detectedTechs.add('Prisma');
      skillRules.push({
        tech: 'Prisma',
        skillKeyword: 'Prisma',
        reason: 'Detected Prisma ORM schema file (schema.prisma)'
      });
    }

    if (rootFileNames.includes('tsconfig.json')) {
      detectedTechs.add('TypeScript');
      skillRules.push({
        tech: 'TypeScript',
        skillKeyword: 'TypeScript',
        reason: 'Detected TypeScript compiler configuration (tsconfig.json)'
      });
    }

    if (rootFileNames.some(f => f.startsWith('tailwind.config'))) {
      detectedTechs.add('Tailwind CSS');
      skillRules.push({
        tech: 'Tailwind CSS',
        skillKeyword: 'Tailwind',
        reason: 'Detected Tailwind CSS configuration file'
      });
    }

    if (rootFileNames.some(f => f.startsWith('vite.config'))) {
      detectedTechs.add('Vite');
      skillRules.push({
        tech: 'Vite',
        skillKeyword: 'Frontend',
        reason: 'Detected Vite build configuration file'
      });
    }

    if (rootFileNames.some(f => f.startsWith('next.config'))) {
      detectedTechs.add('Next.js');
      skillRules.push({
        tech: 'Next.js',
        skillKeyword: 'React',
        reason: 'Detected Next.js application configuration'
      });
    }

    // 9. Map Detected Rules to SkillSync Database Skills
    const suggestedSkills = await this.mapRulesToDatabaseSkills(skillRules);

    return {
      repository: {
        name: repoData.name,
        description: repoData.description || 'Public repository analyzed for project evidence.',
        url: repoData.html_url,
        primaryLanguage: repoData.language || 'Code',
        stars: repoData.stargazers_count,
        topics: repoData.topics || [],
        defaultBranch: repoData.default_branch
      },
      technologies: Array.from(detectedTechs),
      suggestedSkills,
      detectedFiles
    };
  }

  /**
   * Matches candidate skill rules against the SkillSync skill catalogue in PostgreSQL,
   * prioritizing exact matches and skills that are part of the user's active roadmap.
   */
  private async mapRulesToDatabaseSkills(rules: SkillMatchRule[]): Promise<SuggestedSkillItem[]> {
    try {
      const allSkills = await prisma.skill.findMany({
        select: { id: true, name: true, category: true, description: true }
      });

      // Try fetching active skills for user to prioritize them
      const user = await prisma.user.findFirst();
      let activeSkillNames = new Set<string>();
      if (user) {
        const userSkills = await prisma.userSkill.findMany({
          where: { userId: user.id },
          include: { skill: true }
        });
        activeSkillNames = new Set(userSkills.map(us => us.skill.name));
      }

      const matchedSkillsMap = new Map<string, SuggestedSkillItem>();

      for (const rule of rules) {
        const keyword = rule.skillKeyword.toLowerCase();

        let bestMatch: (typeof allSkills)[0] | null = null;
        let bestScore = 0;

        for (const s of allSkills) {
          const sLower = s.name.toLowerCase();
          let score = 0;

          if (sLower === keyword) {
            score = 100;
          } else if (sLower.startsWith(keyword) || keyword.startsWith(sLower)) {
            score = 80;
          } else if (new RegExp(`\\b${keyword.replace(/[^a-z0-9]/g, '\\$&')}\\b`, 'i').test(sLower)) {
            score = 65;
          } else if (sLower.includes(keyword) || keyword.includes(sLower)) {
            score = 45;
          } else {
            // Check word intersections
            const ruleWords = keyword.split(/[\s&/]+/).filter(w => w.length > 2);
            const matchedWordCount = ruleWords.filter(w => sLower.includes(w)).length;
            if (matchedWordCount > 0) {
              score = 25 * matchedWordCount;
            }
          }

          // Prioritize skills currently in the user's active roadmap / user skills
          if (score > 0 && activeSkillNames.has(s.name)) {
            score += 40;
          }

          if (score > bestScore) {
            bestScore = score;
            bestMatch = s;
          }
        }

        if (bestMatch && bestScore >= 25) {
          if (!matchedSkillsMap.has(bestMatch.name)) {
            matchedSkillsMap.set(bestMatch.name, {
              name: bestMatch.name,
              reason: rule.reason,
              category: bestMatch.category
            });
          }
        } else {
          // Fallback to tech name itself if not already present
          if (!matchedSkillsMap.has(rule.tech)) {
            matchedSkillsMap.set(rule.tech, {
              name: rule.tech,
              reason: rule.reason,
              category: rule.categoryDefault || 'Technical Skills'
            });
          }
        }
      }

      return Array.from(matchedSkillsMap.values());
    } catch (err) {
      console.error('[GitHub Analysis] Error querying skills from DB, falling back to rule defaults:', err);
      // Fallback if DB query fails
      const fallbackList: SuggestedSkillItem[] = [];
      const seen = new Set<string>();
      for (const rule of rules) {
        if (!seen.has(rule.tech)) {
          seen.add(rule.tech);
          fallbackList.push({
            name: rule.tech,
            reason: rule.reason,
            category: 'Technical Skills'
          });
        }
      }
      return fallbackList;
    }
  }

  /**
   * Fetches public GitHub user profile
   */
  public async getUserProfile(rawUsername: string): Promise<GitHubUserProfile> {
    const username = rawUsername.trim().replace(/^@/, '');
    if (!username) {
      throw new Error('Please enter a valid GitHub username.');
    }

    const apiUrl = `https://api.github.com/users/${encodeURIComponent(username)}`;
    const res = await fetchWithTimeout(apiUrl, {
      headers: getGitHubHeaders(false)
    });

    if (res.status === 404) {
      throw new Error(`GitHub user '${username}' not found. Please verify the username.`);
    }

    if (res.status === 403 || res.status === 429) {
      const remaining = res.headers.get('x-ratelimit-remaining');
      if (remaining === '0') {
        throw new Error('GitHub API rate limit reached. Please wait a few minutes or add a GITHUB_TOKEN in server/.env.');
      }
      throw new Error('Access denied by GitHub API.');
    }

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.statusText} (${res.status})`);
    }

    const data = (await res.json()) as any;
    return {
      username: data.login,
      name: data.name || data.login,
      avatarUrl: data.avatar_url || '',
      bio: data.bio || '',
      htmlUrl: data.html_url,
      publicReposCount: data.public_repos || 0,
      followersCount: data.followers || 0,
      location: data.location || '',
      company: data.company || '',
      blog: data.blog || ''
    };
  }

  /**
   * Fetches public repositories for a GitHub user, checking for already imported projects
   */
  public async getUserRepositories(rawUsername: string, userId?: string): Promise<GitHubRepoSummary[]> {
    const username = rawUsername.trim().replace(/^@/, '');
    if (!username) {
      throw new Error('Please enter a valid GitHub username.');
    }

    const apiUrl = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=30&type=owner`;
    const res = await fetchWithTimeout(apiUrl, {
      headers: getGitHubHeaders(false)
    });

    if (res.status === 404) {
      throw new Error(`GitHub user '${username}' not found.`);
    }

    if (res.status === 403 || res.status === 429) {
      const remaining = res.headers.get('x-ratelimit-remaining');
      if (remaining === '0') {
        throw new Error('GitHub API rate limit reached. Please wait a few minutes or configure GITHUB_TOKEN.');
      }
      throw new Error('Access to GitHub repositories was denied.');
    }

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.statusText} (${res.status})`);
    }

    const rawRepos = (await res.json()) as any[];
    if (!Array.isArray(rawRepos)) {
      return [];
    }

    // Check existing projects for this user to detect already imported repos
    let importedUrls = new Set<string>();
    let importedIds = new Set<string>();

    if (userId) {
      const existingProjects = await prisma.project.findMany({
        where: { userId },
        select: { githubUrl: true, githubRepoId: true }
      });

      importedUrls = new Set(
        existingProjects
          .filter(p => Boolean(p.githubUrl))
          .map(p => p.githubUrl!.toLowerCase().replace(/\/+$/, ''))
      );
      importedIds = new Set(
        existingProjects
          .filter(p => Boolean(p.githubRepoId))
          .map(p => String(p.githubRepoId))
      );
    }

    // Pre-fetch all skills for quick mapping
    const allDbSkills = await prisma.skill.findMany({
      select: { id: true, name: true, category: true }
    });

    return rawRepos.map(repo => {
      const normalizedUrl = (repo.html_url || '').toLowerCase().replace(/\/+$/, '');
      const isAlreadyImported = importedUrls.has(normalizedUrl) || importedIds.has(String(repo.id));

      // Extract technologies from language, topics, and description
      const techs = new Set<string>();
      if (repo.language) techs.add(repo.language);
      if (Array.isArray(repo.topics)) {
        for (const t of repo.topics) {
          const tClean = t.toLowerCase();
          if (tClean.includes('react')) techs.add('React');
          else if (tClean.includes('typescript')) techs.add('TypeScript');
          else if (tClean.includes('tailwind')) techs.add('Tailwind CSS');
          else if (tClean.includes('node') || tClean.includes('express')) techs.add('Node.js & Express');
          else if (tClean.includes('postgres') || tClean.includes('sql')) techs.add('PostgreSQL');
          else if (tClean.includes('prisma')) techs.add('Prisma ORM');
          else if (tClean.includes('docker')) techs.add('Docker');
          else if (tClean.includes('python')) techs.add('Python');
          else if (tClean.includes('pandas')) techs.add('Pandas');
          else if (tClean.includes('pytorch') || tClean.includes('deep-learning')) techs.add('PyTorch');
          else if (tClean.length > 2) {
            techs.add(t.charAt(0).toUpperCase() + t.slice(1));
          }
        }
      }

      // Quick skill hints based on detected techs
      const suggestedSkills: SuggestedSkillItem[] = [];
      for (const tech of techs) {
        const matchingSkill = allDbSkills.find(s => s.name.toLowerCase().includes(tech.toLowerCase()));
        if (matchingSkill && !suggestedSkills.some(s => s.name === matchingSkill.name)) {
          suggestedSkills.push({
            name: matchingSkill.name,
            reason: `Detected ${tech} in repository metadata`,
            category: matchingSkill.category
          });
        }
      }

      // Default Git skill for all repos
      const gitSkill = allDbSkills.find(s => s.name.toLowerCase().includes('git'));
      if (gitSkill && !suggestedSkills.some(s => s.name === gitSkill.name)) {
        suggestedSkills.push({
          name: gitSkill.name,
          reason: 'Git repository version control',
          category: gitSkill.category
        });
      }

      return {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || 'Public GitHub repository.',
        primaryLanguage: repo.language || 'Code',
        url: repo.html_url,
        homepage: repo.homepage || null,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        topics: repo.topics || [],
        updatedAt: repo.updated_at,
        isFork: Boolean(repo.fork),
        isAlreadyImported,
        technologies: Array.from(techs),
        suggestedSkills
      };
    });
  }

  /**
   * Imports a GitHub repository as a persistent Project in PostgreSQL,
   * linking selected skills and updating user readiness.
   */
  public async importRepository(userId: string, payload: ImportRepoPayload) {
    const rawUrl = payload.repositoryUrl || (payload as any).githubUrl;
    if (!rawUrl || typeof rawUrl !== 'string') {
      throw new Error('A valid repository URL is required.');
    }

    const normalizedUrl = rawUrl.trim().toLowerCase().replace(/\/+$/, '');

    // Prevent duplicate imports for this user
    const existing = await prisma.project.findFirst({
      where: {
        userId,
        OR: [
          { githubUrl: { equals: normalizedUrl, mode: 'insensitive' } },
          ...(payload.githubRepoId ? [{ githubRepoId: String(payload.githubRepoId) }] : [])
        ]
      }
    });

    if (existing) {
      throw new Error(`The repository "${payload.name || existing.name}" has already been imported into your projects.`);
    }

    // Normalize technologies to string array
    const techsArray: string[] = Array.isArray(payload.technologies)
      ? payload.technologies
      : typeof payload.technologies === 'string'
      ? payload.technologies.split(',').map(t => t.trim()).filter(Boolean)
      : [];

    // Create the Project in PostgreSQL
    const createdProject = await prisma.project.create({
      data: {
        userId,
        name: payload.name.trim(),
        tagline: payload.tagline?.trim() || null,
        description: payload.description?.trim() || 'Imported from public GitHub repository.',
        technologies: techsArray,
        githubUrl: rawUrl.trim(),
        liveDemoUrl: payload.liveDemoUrl?.trim() || null,
        status: payload.status || 'Completed',
        source: 'github',
        githubRepoId: payload.githubRepoId ? String(payload.githubRepoId) : null,
        completionDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      }
    });

    // Link evidenced skills in PostgreSQL
    const linkedSkillNames: string[] = [];
    if (Array.isArray(payload.evidencedSkills) && payload.evidencedSkills.length > 0) {
      for (const skillItem of payload.evidencedSkills) {
        const skill = await prisma.skill.findFirst({
          where: {
            OR: [
              { id: skillItem },
              { name: skillItem }
            ]
          }
        });

        if (skill) {
          // Link ProjectSkill
          await prisma.projectSkill.upsert({
            where: {
              projectId_skillId: {
                projectId: createdProject.id,
                skillId: skill.id
              }
            },
            update: {},
            create: {
              projectId: createdProject.id,
              skillId: skill.id
            }
          });

          // Update UserSkill to isProjectEvidenced: true
          await prisma.userSkill.upsert({
            where: {
              userId_skillId: {
                userId,
                skillId: skill.id
              }
            },
            update: {
              isProjectEvidenced: true,
              status: SkillStatus.IN_PROGRESS
            },
            create: {
              userId,
              skillId: skill.id,
              status: SkillStatus.IN_PROGRESS,
              isProjectEvidenced: true,
              masteryScore: 65
            }
          });

          linkedSkillNames.push(skill.name);
        }
      }
    }

    return {
      id: createdProject.id,
      name: createdProject.name,
      tagline: createdProject.tagline || '',
      description: createdProject.description,
      technologies: createdProject.technologies,
      evidencedSkills: linkedSkillNames,
      githubUrl: createdProject.githubUrl || undefined,
      liveDemoUrl: createdProject.liveDemoUrl || undefined,
      status: createdProject.status,
      source: createdProject.source,
      githubRepoId: createdProject.githubRepoId || undefined,
      completionDate: createdProject.completionDate,
      featured: createdProject.featured
    };
  }
}

export const githubService = new GitHubService();
