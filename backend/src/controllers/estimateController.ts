// controllers/estimateController.ts

import { Request, Response } from 'express';

// Fonction pour estimer le prix et le délai
export const predictEstimate = (req: Request, res: Response) => {
  try {
    // Extraire les données de la requête
    const { serviceType, pageCount, urgency } = req.body;

    // Logique de calcul d'estimation (à personnaliser selon vos besoins)
    let price = 0;
    let time = 0;

    if (serviceType === 'redaction') {
      price = pageCount * 10; // Exemple de calcul
      time = pageCount * 2; // Exemple de délai
    } else if (serviceType === 'translation') {
      price = pageCount * 15; // Exemple de calcul
      time = pageCount * 1.5; // Exemple de délai
    } else if (serviceType === 'correction') {
      price = pageCount * 8; // Exemple de calcul
      time = pageCount * 1; // Exemple de délai
    }

    // Appliquer un ajustement en fonction de l'urgence
    if (urgency === 'express') {
      price *= 1.2; // Augmenter le prix en cas d'urgence
      time /= 2; // Réduire le délai pour l'urgence
    }

    // Retourner la réponse avec l'estimation
    res.status(200).json({
      price: price,
      time: time,
    });
  } catch (error) {
    console.error('Erreur lors de l\'estimation:', error);
    res.status(500).json({ message: 'Erreur lors de l\'estimation' });
  }
};
