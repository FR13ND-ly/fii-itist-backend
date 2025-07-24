import { Router } from 'express';
import { getHalls, addHall, updateHall, deleteHall, getTimeSlots, addTimeSlot, updateTimeSlot, deleteTimeSlot, getSessions, addSession, updateSession, deleteSession } from '../controllers/sessionController';

const router = Router();

router.get('/halls', getHalls);
router.post('/halls', addHall);
router.put('/halls/:id', updateHall);
router.delete('/halls/:id', deleteHall);

router.get('/time-slots', getTimeSlots);
router.post('/time-slots', addTimeSlot);
router.put('/time-slots/:id', updateTimeSlot);
router.delete('/time-slots/:id', deleteTimeSlot);

router.get('/', getSessions);
router.post('/', addSession);
router.put('/:id', updateSession);
router.delete('/:id', deleteSession);

export default router;

