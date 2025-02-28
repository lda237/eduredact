import React, { useState } from 'react';
import { updateProfile } from '../../../services/profileService';



interface ProfileEditorProps {
  onVerificationComplete: () => void;
}

// eslint-disable-next-line no-empty-pattern
const ProfileEditor = ({ }: ProfileEditorProps) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string) => {
    const regex = /^[0-9]+$/; // Seulement des chiffres
    return regex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    setEmailError('');
    setPhoneError('');
    setError('');

    if (!validateEmail(email)) {
      setEmailError('Veuillez entrer une adresse email valide.');
      isValid = false;
    }
    
    if (!validatePhone(phone)) {
      setPhoneError('Le numéro de téléphone ne doit contenir que des chiffres.');
      isValid = false;
    }

    if (!isValid) return;

    setIsUpdating(true);

    try {
      await updateProfile({ email, phone });
      alert('Profil mis à jour avec succès');
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la mise à jour du profil');
    } finally {
      setIsUpdating(false);
    }
  };

  
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Téléphone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
      </div>

      {error && <div className="text-red-500 text-sm mt-2" aria-live="polite">{error}</div>}

      <button
        type="submit"
        disabled={isUpdating || !email || !phone}
        className={`w-full py-2 rounded-md text-white ${isUpdating ? 'bg-gray-400' : 'bg-primary-600 hover:bg-primary-700'}`}
      >
        {isUpdating ? 'Mise à jour...' : 'Mettre à jour'}
      </button>
    </form>
  );
};

export default ProfileEditor;
