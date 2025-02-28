import express from 'express';
import { predictEstimate } from '../controllers/estimateController'; // Assurez-vous d'avoir un controller pour la logique

const router = express.Router();

// Définition de la route POST pour '/estimate'
router.post('/estimate', predictEstimate);

export default router;
