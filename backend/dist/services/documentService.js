"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentsByWriter = exports.uploadDocument = void 0;
const db_1 = require("../config/db");
const Document_1 = require("../models/Document");
const uploadDocument = async (url, type, writerId) => {
    const documentRepository = db_1.AppDataSource.getRepository(Document_1.Document);
    // Crée un nouveau document
    const document = new Document_1.Document();
    document.url = url;
    document.type = type;
    document.writerId = writerId;
    // Sauvegarde le document dans la base de données
    await documentRepository.save(document);
    return document;
};
exports.uploadDocument = uploadDocument;
const getDocumentsByWriter = async (writerId) => {
    const documentRepository = db_1.AppDataSource.getRepository(Document_1.Document);
    // Trouve tous les documents du rédacteur
    const documents = await documentRepository.find({
        where: { writerId },
    });
    return documents;
};
exports.getDocumentsByWriter = getDocumentsByWriter;
