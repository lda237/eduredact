import express from 'express';
import { createPayment } from '../controllers/paymentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware); // Apply auth middleware to all routes

router.post('/', createPayment); // Use the updated createPayment function

export default router;