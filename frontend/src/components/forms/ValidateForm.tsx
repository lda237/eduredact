// src/components/forms/ValidateForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadDocument } from '../../services/documentService'; // Service pour le téléversement des documents
import { submitVerification } from '../../services/writerService'; // Service pour la soumission des informations

export const ValidateForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Téléverser les documents et obtenir leurs URLs
      const documentUrls = await Promise.all(
        documents.map(async (file) => {
          const response = await uploadDocument(file, 'identity'); // Type de document
          return response.url;
        })
      );

      // Soumettre les informations de vérification
      await submitVerification({
        firstName,
        lastName,
        country,
        city,
        dateOfBirth,
        documents: documentUrls,
      });

      // Rediriger vers le tableau de bord après soumission
      navigate('/writer/dashboard');
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la soumission des informations');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Prénom</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Nom</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Pays</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Ville</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Date de naissance</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Documents (CNI, passeport, etc.)</label>
        <input
          type="file"
          multiple
          onChange={(e) => setDocuments(Array.from(e.target.files || []))}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        disabled={isLoading}
      >
        {isLoading ? 'Soumission en cours...' : 'Soumettre'}
      </button>
    </form>
  );
};