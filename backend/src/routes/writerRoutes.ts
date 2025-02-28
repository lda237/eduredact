import express from 'express';
import { submitVerification } from '../controllers/writerController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/submit-verification', authMiddleware, submitVerification);

export default router;