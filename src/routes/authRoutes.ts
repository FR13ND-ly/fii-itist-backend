import { Router } from 'express';
import { signup, signin } from '../controllers/authController';

const router = Router();

router.post('/sign-up', signup);
router.post('/sign-in', signin);

export default router;
