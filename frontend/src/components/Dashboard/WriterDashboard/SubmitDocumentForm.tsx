import React, { useState } from 'react';
import { uploadDocument } from '../../../services/documentService';

interface DocumentSubmissionProps {
  onSubmissionComplete: () => void;
}

// eslint-disable-next-line no-empty-pattern
const DocumentSubmission: React.FC<DocumentSubmissionProps> = ({ }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile && !allowedTypes.includes(selectedFile.type)) {
      setError('Seuls les fichiers PDF et Word sont autorisés.');
      setFile(null);
      return;
    }
    setError('');
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Veuillez sélectionner un fichier.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      await uploadDocument(file, 'default');
      setSuccessMessage('Document soumis avec succès.');
      setFile(null); // Réinitialiser le fichier après l'upload
    } catch {
      setError('Erreur lors de la soumission du document.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sélectionner un fichier</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="mt-1 block w-full border rounded-md p-2 focus:ring-primary-500 focus:border-primary-500"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

      <button
        type="submit"
        disabled={isSubmitting || !file}
        className={`w-full py-2 rounded-md text-white ${isSubmitting ? 'bg-gray-400' : 'bg-primary-600 hover:bg-primary-700'}`}
      >
        {isSubmitting ? 'Envoi en cours...' : 'Soumettre'}
      </button>
    </form>
  );
};

export default DocumentSubmission;
