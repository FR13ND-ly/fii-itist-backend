import { Router } from 'express';
import { getUsers, updateUser, deleteUser, addEnrolment, deleteEnrolment, verifyEmail, sendVerificationEmail, getUser, getEnrolments } from '../controllers/userController';

const router = Router();

router.post('/send-verify', sendVerificationEmail);
router.post('/verify-email', verifyEmail);

router.get('/:id/enrolments', getEnrolments);
router.post('/:id/enrolments', addEnrolment);
router.delete('/:id/enrolments/:sessionId', deleteEnrolment);

router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;