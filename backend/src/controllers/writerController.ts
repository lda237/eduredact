import { Request, Response } from 'express';
import { AppDataSource } from '../config/db';
import { User } from '../models/User';
import { Document } from '../models/Document';

export const submitVerification = async (req: Request, res: Response): Promise<void> => {
  const { userId, firstName, lastName, country, city, dateOfBirth, documents } = req.body;

  // Validate required fields
  if (!userId || !firstName || !lastName || !country || !city || !dateOfBirth || !documents) {
    res.status(400).json({ message: 'Tous les champs sont obligatoires' });
    return; // Stop further execution
  }

  try {
    const userRepository = AppDataSource.getRepository(User);
    const documentRepository = AppDataSource.getRepository(Document);

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
    const documentEntities = documents.map((doc: any) => {
      const document = new Document();
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
  } catch (error) {
    console.error(error); // Log the error for debugging
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Erreur lors de la soumission du profil', error: errorMessage });
  }
};