import express from 'express';
import { resolveScannedCode } from '../controllers/scannerController';

const router = express.Router();

router.get('/:code', resolveScannedCode)

export default router;