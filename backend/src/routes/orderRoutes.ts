import express from 'express';
import { getClientOrders, createOrder } from '../controllers/clientController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getClientOrders);
router.post('/', createOrder);

export default router; // Assurez-vous d'exporter le router