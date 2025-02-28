import axios from 'axios';

export async function predictEstimate(serviceType: number, pageCount: number, urgency: number) {
  try {
    // Préparation des données à envoyer au backend
    const payload = {
      serviceType: serviceType === 0 ? 'redaction' : serviceType === 1 ? 'translation' : 'correction',
      pageCount,
      urgency: urgency === 0 ? 'normal' : 'express',
    };

    // Vérifier si l'API est bien accessible à cette URL
    const url = 'http://localhost:5001/estimate'; // L'URL de l'API backend
    
    // Appel à l'API backend
    const response = await axios.post(url, payload);
    
    // Retourner les résultats
    return response.data;
  } catch (error) {
    // Amélioration de la gestion des erreurs
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Si la réponse de l'API contient un message d'erreur
        console.error('Erreur du serveur:', error.response.data);
      } else if (error.request) {
        // Si la requête a été envoyée, mais qu'il n'y a pas eu de réponse
        console.error('Erreur de requête:', error.request);
      } else {
        // Si une autre erreur est survenue
        console.error('Erreur lors de la configuration de la requête:', error.message);
      }
    } else {
      console.error('Erreur inconnue:', error);
    }
    throw error;  // Relancer l'erreur après l'avoir loggée
  }
}
