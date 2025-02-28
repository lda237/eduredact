// src/pages/VerificationPage.tsx
import React from 'react';
import { ValidateForm } from '../components/forms/ValidateForm';

const VerificationPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Vérification du Profil</h2>
        <ValidateForm />
      </div>
    </div>
  );
};

export default VerificationPage;