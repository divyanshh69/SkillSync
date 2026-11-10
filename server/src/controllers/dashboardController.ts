import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { getOrCreateDemoUser } from './profileController.js';
import { calculateReadiness, getNextBestStepForCareer, toFrontendStatus } from '../utils/readiness.js';

export async function getDashboardData(req: Request, res: Response) {
  try {
    const user = await getOrCreateDemoUser();

    // 1. Fetch user skills and project links
    const userSkills = await prisma.userSkill.findMany({
      where: { userId: user.id },
      include: {
        skill: true
      }
    });

    // 2. Fetch project skills map to know which projects evidence which skill
    const projectSkills = await prisma.projectSkill.findMany({
      where: {
        project: { userId: user.id }
      },
      include: {
        project: {
          select: { name: true }
        }
      }
    });

    const skillProjectNamesMap = new Map<string, string[]>();
    for (const ps of projectSkills) {
      const existing = skillProjectNamesMap.get(ps.skillId) || [];
      existing.push(ps.project.name);
      skillProjectNamesMap.set(ps.skillId, existing);
    }

    // 3. Calculate readiness metrics
    const readiness = calculateReadiness(userSkills);

    // 4. Fetch roadmap phases with phaseSkills and skills
    const roadmapPhasesRaw = await prisma.roadmapPhase.findMany({
      orderBy: { phaseNumber: 'asc' },
      include: {
        phaseSkills: {
          orderBy: { order: 'asc' },
          include: {
            skill: {
              include: {
                userSkills: {
                  where: { userId: user.id }
                }
              }
            }
          }
        }
      }
    });

    const roadmapPhases = roadmapPhasesRaw.map(phase => {
      const skills = phase.phaseSkills.map(ps => {
        const skill = ps.skill;
        const uSkill = skill.userSkills[0];
        const projectNames = skillProjectNamesMap.get(skill.id) || [];
        const isEvidenced = (uSkill?.isProjectEvidenced || false) || projectNames.length > 0;

        return {
          id: skill.id,
          name: skill.name,
          category: skill.category,
          status: toFrontendStatus(uSkill?.status || 'NOT_STARTED'),
          isProjectEvidenced: isEvidenced,
          evidencedByProjectNames: projectNames,
          importance: skill.importance,
          masteryScore: uSkill?.masteryScore || 0,
          notes: uSkill?.notes || undefined
        };
      });

      return {
        id: phase.id,
        phaseNumber: phase.phaseNumber,
        title: phase.title,
        subtitle: phase.subtitle,
        status: phase.status as 'completed' | 'in-progress' | 'upcoming',
        description: phase.description,
        skills
      };
    });

    // 5. Fetch recent projects
    const recentProjectsRaw = await prisma.project.findMany({
      where: { userId: user.id },
      include: {
        projectSkills: {
          include: {
            skill: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 6
    });

    const recentProjects = recentProjectsRaw.map(proj => ({
      id: proj.id,
      name: proj.name,
      tagline: proj.tagline || '',
      description: proj.description,
      technologies: proj.technologies,
      evidencedSkills: proj.projectSkills.map(ps => ps.skill.name),
      githubUrl: proj.githubUrl || undefined,
      liveDemoUrl: proj.liveDemoUrl || undefined,
      status: proj.status,
      metrics: proj.metrics || undefined,
      completionDate: proj.completionDate || new Date(proj.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      featured: proj.featured
    }));

    // 6. Get Next Best Step for target career
    const nextBestStep = getNextBestStepForCareer(user.targetCareer);

    // Profile formatted for frontend
    const profile = {
      name: user.name,
      handle: user.handle || '@alexrivera_dev',
      avatarUrl: user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
      bio: user.bio || '',
      education: user.education || '',
      targetCareer: user.targetCareer,
      experienceLevel: user.experienceLevel || 'Beginner',
      isOnboarded: user.isOnboarded || false,
      readinessPercentage: readiness.score,
      weeklyGoalHours: user.weeklyGoalHours,
      hoursCompletedThisWeek: user.hoursCompletedThisWeek,
      targetCompletionQuarter: user.targetCompletionQuarter || 'Target: Q3 2026 Ready'
    };

    return res.json({
      success: true,
      data: {
        profile,
        readiness,
        nextBestStep,
        roadmapPhases,
        recentProjects
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve dashboard data'
    });
  }
}

