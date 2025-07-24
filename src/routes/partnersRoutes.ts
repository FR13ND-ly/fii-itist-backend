import { Router } from 'express';
import { addPartner, getPartners, updatePartner, deletePartner } from '../controllers/partnerController';

const router = Router();

router.get('/', getPartners);
router.post('/', addPartner);
router.put('/:id', updatePartner);
router.delete('/:id', deletePartner);

export default router;
