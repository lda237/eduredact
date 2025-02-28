"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentsByWriter = exports.uploadDocument = void 0;
const db_1 = require("../config/db");
const Document_1 = require("../models/Document");
// Repository for interacting with the Document entity
const DocumentRepository = db_1.AppDataSource.getRepository(Document_1.Document);
/**
 * Uploads a new document.
 * - Validates the request body.
 * - Associates the document with the authenticated writer.
 * - Saves the document to the database.
 */
const uploadDocument = async (req, res) => {
    try {
        const { title, content } = req.body;
        // Ensure required fields are provided
        if (!title || !content) {
            res.status(400).json({ error: 'Title and content are required' });
            return; // Stop further execution
        }
        const writerId = Number(req.user?.id); // Convert to number
        if (!writerId) {
            res.status(401).json({ error: 'Unauthorized' });
            return; // Stop further execution
        }
        // Create a new document
        const newDocument = DocumentRepository.create({
            title, // Ensure this matches the entity property
            content, // Ensure this matches the entity property
            writer: { id: writerId }, // Type casting to match the User entity
        });
        await DocumentRepository.save(newDocument);
        res.status(201).json({ message: 'Document uploaded successfully', document: newDocument });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload document' });
    }
};
exports.uploadDocument = uploadDocument;
/**
 * Fetches all documents written by the authenticated writer.
 * - Retrieves the authenticated user's ID.
 * - Queries the database for documents associated with the writer.
 */
const getDocumentsByWriter = async (req, res) => {
    try {
        const writerId = req.user?.id;
        if (!writerId) {
            res.status(401).json({ error: 'Unauthorized' });
            return; // Stop further execution
        }
        const documents = await DocumentRepository.find({
            where: { writer: { id: Number(writerId) } }, // Convert writerId to number
            relations: ['writer'],
        });
        res.status(200).json(documents);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch documents' });
    }
};
exports.getDocumentsByWriter = getDocumentsByWriter;
