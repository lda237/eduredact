// frontend/src/components/EstimateForm.tsx
import React, { useState } from 'react';
import { getEstimate } from '../services/api';

export const EstimateForm: React.FC = () => {
  // États pour gérer les valeurs du formulaire
  const [serviceType, setServiceType] = useState('redaction');
  const [pageCount, setPageCount] = useState(0);
  const [urgency, setUrgency] = useState('standard');
  const [estimate, setEstimate] = useState<{ price: number; time: number } | null>(null);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Données à envoyer au backend
    const data = { serviceType, pageCount, urgency };

    try {
      // Appel à l'API pour obtenir l'estimation
      const response = await getEstimate(data);
      setEstimate(response);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'estimation :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Sélection du type de service */}
      <div>
        <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
          Type de service
        </label>
        <select
          id="serviceType"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="redaction">Rédaction académique</option>
          <option value="translation">Traduction</option>
          <option value="correction">Correction</option>
        </select>
      </div>

      {/* Nombre de pages */}
      <div>
        <label htmlFor="pageCount" className="block text-sm font-medium text-gray-700">
          Nombre de pages
        </label>
        <input
          type="number"
          id="pageCount"
          placeholder="Entrez le nombre de pages"
          value={pageCount}
          onChange={(e) => setPageCount(Number(e.target.value))}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      {/* Urgence */}
      <div>
        <label htmlFor="urgency" className="block text-sm font-medium text-gray-700">
          Urgence
        </label>
        <select
          id="urgency"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="standard">Standard</option>
          <option value="express">Express</option>
        </select>
      </div>

      {/* Bouton de soumission */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Estimer
      </button>

      {/* Affichage de l'estimation */}
      {estimate && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-lg font-semibold">
            <strong>Prix estimé :</strong> {estimate.price} XOF
          </p>
          <p className="text-lg font-semibold">
            <strong>Délai estimé :</strong> {estimate.time} heures
          </p>
        </div>
      )}
    </form>
  );
};