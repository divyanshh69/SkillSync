import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { getOrCreateDemoUser } from './profileController.js';
import { toFrontendStatus, toDbStatus } from '../utils/readiness.js';

export async function getSkills(req: Request, res: Response) {
  try {
    const user = await getOrCreateDemoUser();

    // Fetch all skills, including user skills and project evidence
    const skills = await prisma.skill.findMany({
      include: {
        userSkills: {
          where: { userId: user.id }
        },
        projectSkills: {
          include: {
            project: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    const formattedSkills = skills.map(skill => {
      const userSkill = skill.userSkills[0];
      const projectNames = skill.projectSkills.map(ps => ps.project.name);
      const isEvidenced = (userSkill?.isProjectEvidenced || false) || projectNames.length > 0;

      return {
        id: skill.id,
        name: skill.name,
        category: skill.category,
        description: skill.description,
        status: toFrontendStatus(userSkill?.status || 'NOT_STARTED'),
        isProjectEvidenced: isEvidenced,
        evidencedByProjectNames: projectNames,
        importance: skill.importance,
        masteryScore: userSkill?.masteryScore || 0,
        notes: userSkill?.notes || undefined
      };
    });

    return res.json({
      success: true,
      data: formattedSkills
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve skills'
    });
  }
}

export async function updateSkill(req: Request, res: Response) {
  try {
    const user = await getOrCreateDemoUser();
    const skillParam = req.params.id;
    const { status, isProjectEvidenced, masteryScore, notes } = req.body;

    // Find skill by ID or by name
    const skill = await prisma.skill.findFirst({
      where: {
        OR: [
          { id: skillParam },
          { name: skillParam }
        ]
      }
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        error: 'Skill not found'
      });
    }

    // Upsert UserSkill
    const dbStatus = status ? toDbStatus(status) : undefined;

    const userSkill = await prisma.userSkill.upsert({
      where: {
        userId_skillId: {
          userId: user.id,
          skillId: skill.id
        }
      },
      update: {
        ...(dbStatus !== undefined && { status: dbStatus }),
        ...(isProjectEvidenced !== undefined && { isProjectEvidenced }),
        ...(masteryScore !== undefined && { masteryScore: Number(masteryScore) }),
        ...(notes !== undefined && { notes })
      },
      create: {
        userId: user.id,
        skillId: skill.id,
        status: dbStatus || toDbStatus('not-started'),
        isProjectEvidenced: isProjectEvidenced || false,
        masteryScore: masteryScore ? Number(masteryScore) : 0,
        notes: notes || undefined
      }
    });

    // Check project names
    const projectSkills = await prisma.projectSkill.findMany({
      where: { skillId: skill.id },
      include: { project: true }
    });
    const projectNames = projectSkills.map(ps => ps.project.name);

    return res.json({
      success: true,
      data: {
        id: skill.id,
        name: skill.name,
        category: skill.category,
        description: skill.description,
        status: toFrontendStatus(userSkill.status),
        isProjectEvidenced: userSkill.isProjectEvidenced || projectNames.length > 0,
        evidencedByProjectNames: projectNames,
        importance: skill.importance,
        masteryScore: userSkill.masteryScore,
        notes: userSkill.notes
      }
    });
  } catch (error) {
    console.error('Error updating skill:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update skill'
    });
  }
}
