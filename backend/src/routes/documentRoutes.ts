import express from 'express';
import { uploadDocument, getDocumentsByWriter } from '../controllers/documentController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';

const router = express.Router();

// Apply global middleware for authentication and role checks
router.use(authMiddleware); // Ensures all routes are protected by authentication
router.use(roleMiddleware(['writer'])); // Ensures only users with the 'writer' role can access these routes

// Route to upload a document
router.post('/', uploadDocument);

// Route to fetch documents by the authenticated writer
router.get('/', getDocumentsByWriter);

export default router; // Export the router for use in the main application