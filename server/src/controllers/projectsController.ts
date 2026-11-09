import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';
import { getOrCreateDemoUser } from './profileController.js';
import { SkillStatus } from '@prisma/client';

export async function getProjects(req: Request, res: Response) {
  try {
    const user = await getOrCreateDemoUser();

    const projects = await prisma.project.findMany({
      where: { userId: user.id },
      include: {
        projectSkills: {
          include: {
            skill: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedProjects = projects.map(proj => ({
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

    return res.json({
      success: true,
      data: formattedProjects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve projects'
    });
  }
}

export async function createProject(req: Request, res: Response) {
  try {
    const user = await getOrCreateDemoUser();
    const {
      name,
      tagline,
      description,
      technologies,
      evidencedSkills,
      githubUrl,
      liveDemoUrl,
      status,
      metrics,
      completionDate,
      featured
    } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        error: 'Project name and description are required'
      });
    }

    // Normalize technologies to string array
    const techsArray: string[] = Array.isArray(technologies)
      ? technologies
      : typeof technologies === 'string'
      ? technologies.split(',').map((t: string) => t.trim()).filter(Boolean)
      : [];

    // Create the Project record
    const createdProject = await prisma.project.create({
      data: {
        userId: user.id,
        name: name.trim(),
        tagline: tagline?.trim() || null,
        description: description.trim(),
        technologies: techsArray,
        githubUrl: githubUrl?.trim() || null,
        liveDemoUrl: liveDemoUrl?.trim() || null,
        status: status || 'Completed',
        metrics: metrics?.trim() || null,
        completionDate: completionDate || 'Just Now',
        featured: Boolean(featured)
      }
    });

    // Link evidenced skills
    const linkedSkillNames: string[] = [];
    if (Array.isArray(evidencedSkills) && evidencedSkills.length > 0) {
      for (const skillItem of evidencedSkills) {
        // Find skill by name or ID
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

          // Update UserSkill to evidenced and in-progress/completed
          await prisma.userSkill.upsert({
            where: {
              userId_skillId: {
                userId: user.id,
                skillId: skill.id
              }
            },
            update: {
              isProjectEvidenced: true,
              // If not started, advance to in-progress
              status: SkillStatus.IN_PROGRESS
            },
            create: {
              userId: user.id,
              skillId: skill.id,
              status: SkillStatus.IN_PROGRESS,
              isProjectEvidenced: true,
              masteryScore: 60
            }
          });

          linkedSkillNames.push(skill.name);
        }
      }
    }

    return res.status(201).json({
      success: true,
      data: {
        id: createdProject.id,
        name: createdProject.name,
        tagline: createdProject.tagline || '',
        description: createdProject.description,
        technologies: createdProject.technologies,
        evidencedSkills: linkedSkillNames,
        githubUrl: createdProject.githubUrl || undefined,
        liveDemoUrl: createdProject.liveDemoUrl || undefined,
        status: createdProject.status,
        metrics: createdProject.metrics || undefined,
        completionDate: createdProject.completionDate,
        featured: createdProject.featured
      }
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create project'
    });
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const user = await getOrCreateDemoUser();
    const projectId = req.params.id;

    // Verify project belongs to user
    const existing = await prisma.project.findFirst({
      where: { id: projectId, userId: user.id },
      include: { projectSkills: true }
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    const affectedSkillIds = existing.projectSkills.map(ps => ps.skillId);

    // Delete Project (cascades to projectSkills)
    await prisma.project.delete({
      where: { id: projectId }
    });

    // Check if affected skills still have other project evidence
    for (const skillId of affectedSkillIds) {
      const remainingCount = await prisma.projectSkill.count({
        where: {
          skillId: skillId,
          project: {
            userId: user.id
          }
        }
      });

      if (remainingCount === 0) {
        await prisma.userSkill.updateMany({
          where: {
            userId: user.id,
            skillId: skillId
          },
          data: {
            isProjectEvidenced: false
          }
        });
      }
    }

    return res.json({
      success: true,
      message: 'Project removed successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete project'
    });
  }
}
