import { AppDataSource } from '../config/db';
import { Document } from '../models/Document';

export const uploadDocument = async (
  url: string,
  type: string,
  writerId: number
) => {
  const documentRepository = AppDataSource.getRepository(Document);

  // Crée un nouveau document
  const document = new Document();
  document.url = url;
  document.type = type;
  document.writerId = writerId;

  // Sauvegarde le document dans la base de données
  await documentRepository.save(document);
  return document;
};

export const getDocumentsByWriter = async (writerId: number) => {
  const documentRepository = AppDataSource.getRepository(Document);

  // Trouve tous les documents du rédacteur
  const documents = await documentRepository.find({
    where: { writerId },
  });

  return documents;
};