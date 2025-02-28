"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const documentController_1 = require("../controllers/documentController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
// Apply global middleware for authentication and role checks
router.use(authMiddleware_1.authMiddleware); // Ensures all routes are protected by authentication
router.use((0, roleMiddleware_1.roleMiddleware)(['writer'])); // Ensures only users with the 'writer' role can access these routes
// Route to upload a document
router.post('/', documentController_1.uploadDocument);
// Route to fetch documents by the authenticated writer
router.get('/', documentController_1.getDocumentsByWriter);
exports.default = router; // Export the router for use in the main application
