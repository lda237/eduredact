import React, { useState } from 'react';
import { Upload, Clock, CreditCard } from 'lucide-react';

export function UploadSection() {
  const [file, setFile] = useState<File | null>(null);
  const [wordCount, setWordCount] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Simulate word count calculation
      setWordCount(Math.floor(Math.random() * 1000) + 500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Soumettez votre document
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">
              Glissez-déposez votre fichier ici ou
            </p>
            <input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={handleFileChange}
              accept=".doc,.docx,.pdf"
            />
            <label
              htmlFor="file-upload"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 cursor-pointer"
            >
              Parcourir
            </label>
            {file && (
              <p className="mt-4 text-gray-600">
                Fichier sélectionné: {file.name}
              </p>
            )}
          </div>

          {wordCount > 0 && (
            <div className="mt-8 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Estimation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-indigo-600 mr-2" />
                    <span>Prix: {(wordCount * 0.05).toFixed(2)} €</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-indigo-600 mr-2" />
                    <span>Délai: {Math.ceil(wordCount / 1000)} jours</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-indigo-600 mr-2" />
                    <span>{wordCount} mots</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700">
                Commander maintenant
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}