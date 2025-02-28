"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitVerification = void 0;
const db_1 = require("../config/db");
const User_1 = require("../models/User");
const Document_1 = require("../models/Document");
const submitVerification = async (req, res) => {
    const { userId, firstName, lastName, country, city, dateOfBirth, documents } = req.body;
    // Validate required fields
    if (!userId || !firstName || !lastName || !country || !city || !dateOfBirth || !documents) {
        res.status(400).json({ message: 'Tous les champs sont obligatoires' });
        return; // Stop further execution
    }
    try {
        const userRepository = db_1.AppDataSource.getRepository(User_1.User);
        const documentRepository = db_1.AppDataSource.getRepository(Document_1.Document);
        // Find the user by ID and role
        const user = await userRepository.findOne({ where: { id: userId, role: 'writer' } });
        if (!user) {
            res.status(404).json({ message: 'Rédacteur non trouvé' });
            return; // Stop further execution
        }
        // Update user details
        user.firstName = firstName;
        user.lastName = lastName;
        user.country = country;
        user.city = city;
        user.dateOfBirth = dateOfBirth;
        // Create document entities
        const documentEntities = documents.map((doc) => {
            const document = new Document_1.Document();
            document.url = doc.url;
            document.type = doc.type;
            document.writer = user; // Associate the document with the user
            return document;
        });
        // Save documents and user to the database
        await documentRepository.save(documentEntities);
        await userRepository.save(user);
        // Send success response
        res.status(200).json({ message: 'Profil soumis avec succès', user });
    }
    catch (error) {
        console.error(error); // Log the error for debugging
        const errorMessage = error.message;
        res.status(500).json({ message: 'Erreur lors de la soumission du profil', error: errorMessage });
    }
};
exports.submitVerification = submitVerification;
