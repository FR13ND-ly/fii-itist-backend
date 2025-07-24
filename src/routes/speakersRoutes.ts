import { Router } from 'express';
import { addSpeaker, getSpeakers, updateSpeaker, deleteSpeaker } from '../controllers/speakersController';

const router = Router();

router.get('/', getSpeakers);
router.post('/', addSpeaker);
router.put('/:id', updateSpeaker);
router.delete('/:id', deleteSpeaker);

export default router;