import { Router } from 'express';
import { getSkills, updateSkill } from '../controllers/skillsController.js';

const router = Router();

router.get('/', getSkills);
router.patch('/:id', updateSkill);

export default router;

