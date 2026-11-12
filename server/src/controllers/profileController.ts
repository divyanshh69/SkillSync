import { Request, Response } from 'express';
import { prisma } from '../config/prisma.js';

// Helper to get or create the default demo user
export async function getOrCreateDemoUser() {
  let user = await prisma.user.findFirst({
    where: { email: 'alex@skillsync.dev' }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: 'demo_user_alex',
        name: 'Alex Rivera',
        email: 'alex@skillsync.dev',
        handle: '@alexrivera_dev',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
        bio: '3rd-year Computer Science student transitioning from building static frontend web apps into production-ready full-stack software systems.',
        education: 'B.S. in Computer Science • University of Washington (Class of 2026)',
        targetCareer: 'Full-Stack Developer',
        weeklyGoalHours: 15,
        hoursCompletedThisWeek: 11.5,
        targetCompletionQuarter: 'Target: Q3 2026 Ready'
      }
    });
  }

  return user;
}

export async function getProfile(req: Request, res: Response) {
  try {
    const user = await getOrCreateDemoUser();
    return res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve profile'
    });
  }
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const user = await getOrCreateDemoUser();
    const {
      name,
      bio,
      targetCareer,
      weeklyGoalHours,
      hoursCompletedThisWeek,
      targetCompletionQuarter,
      handle,
      education,
      experienceLevel,
      isOnboarded,
      githubUsername
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(name !== undefined && { name }),
        ...(bio !== undefined && { bio }),
        ...(targetCareer !== undefined && { targetCareer }),
        ...(weeklyGoalHours !== undefined && { weeklyGoalHours: Number(weeklyGoalHours) }),
        ...(hoursCompletedThisWeek !== undefined && { hoursCompletedThisWeek: Number(hoursCompletedThisWeek) }),
        ...(targetCompletionQuarter !== undefined && { targetCompletionQuarter }),
        ...(handle !== undefined && { handle }),
        ...(education !== undefined && { education }),
        ...(experienceLevel !== undefined && { experienceLevel }),
        ...(isOnboarded !== undefined && { isOnboarded: Boolean(isOnboarded) }),
        ...(githubUsername !== undefined && { githubUsername: githubUsername ? String(githubUsername).trim().replace(/^@+/, '') : null })
      }
    });

    return res.json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update profile'
    });
  }
}

