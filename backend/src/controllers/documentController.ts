// src/controllers/documentController.ts
import { Response } from 'express';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest ';
import { AppDataSource } from '../config/db';
import { Document } from '../models/Document';
import { User } from '../models/User';

// Repository for interacting with the Document entity
const DocumentRepository = AppDataSource.getRepository(Document);

export const uploadDocument = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;

    // Ensure required fields are provided
    if (!title || !content) {
      res.status(400).json({ error: 'Title and content are required' });
      return;
    }

    // Ici, TypeScript sait que req.user existe (ou est potentiellement undefined)
    const writerId = Number(req.user?.id);

    if (!writerId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Create a new document
    const newDocument = DocumentRepository.create({
      title,
      content,
      writer: { id: writerId } as User,
    });

    await DocumentRepository.save(newDocument);

    res.status(201).json({ message: 'Document uploaded successfully', document: newDocument });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
};

export const getDocumentsByWriter = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const writerId = req.user?.id;

    if (!writerId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const documents = await DocumentRepository.find({
      where: { writer: { id: Number(writerId) } },
      relations: ['writer'],
    });

    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
};
