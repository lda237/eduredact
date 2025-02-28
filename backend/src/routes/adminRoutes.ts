import express from 'express';
import { verifyWriter } from '../controllers/adminController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';

const router = express.Router();

router.post('/verify-writer', authMiddleware, roleMiddleware(['admin']), verifyWriter);

export default router;