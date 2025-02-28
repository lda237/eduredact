import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUserTag, FaExclamationTriangle } from 'react-icons/fa';
import { register } from '../../services/authService';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('client');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Reset errors
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Validation des champs
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsLoading(false);
      return setEmailError('Veuillez entrer un email valide.');
    }

    if (password.length < 8) {
      setIsLoading(false);
      return setPasswordError('Le mot de passe doit contenir au moins 8 caractères.');
    }

    if (password !== confirmPassword) {
      setIsLoading(false);
      return setConfirmPasswordError('Les mots de passe ne correspondent pas.');
    }

    // Validation téléphone (optionnel)
    if (phone && !phone.match(/^\+?\d{10,15}$/)) {
      setIsLoading(false);
      return setPhoneError('Le numéro de téléphone n\'est pas valide.');
    }

    try {
      await register(email, password, phone, role);
      navigate('/login', { state: { message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.' } });
    } catch (err) {
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  };

  // Composant d'entrée réutilisable
  const InputField = ({ 
    icon, 
    type, 
    value, 
    onChange, 
    label, 
    required = false,
    placeholder = '',
    error = ''
  }: {
    icon: React.ReactNode,
    type: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    label: string,
    required?: boolean,
    placeholder?: string,
    error?: string
  }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          required={required}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <>
      {error && typeof error === 'string' && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}
      <form onSubmit={handleRegister} className="space-y-4">
        <InputField
          icon={<FaEnvelope />}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Adresse e-mail"
          required
          placeholder="exemple@domaine.com"
          error={emailError}
        />

        <InputField
          icon={<FaLock />}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Mot de passe"
          required
          placeholder="Au moins 8 caractères"
          error={passwordError}
        />

        <InputField
          icon={<FaLock />}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirmer le mot de passe"
          required
          placeholder="Saisissez à nouveau votre mot de passe"
          error={confirmPasswordError}
        />

        {/* Nouveau champ de téléphone avec indicatif et drapeaux */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone (optionnel)</label>
          <div className="relative phone-input-container">
            <PhoneInput
              country={'fr'}
              value={phone}
              onChange={(phone: string) => setPhone(phone)}
              placeholder="Numéro de téléphone"
              inputStyle={{
                width: '100%',
                paddingLeft: '48px',
                paddingRight: '16px',
                paddingTop: '8px',
                paddingBottom: '8px',
                borderRadius: '0.375rem',
                borderColor: '#d1d5db',
                fontSize: '1rem',
                lineHeight: '1.5rem',
              }}
              buttonStyle={{
                border: 'none',
                background: 'transparent',
                padding: '0 0 0 10px',
              }}
              dropdownStyle={{
                width: '300px',
              }}
              enableSearch={true}
              searchPlaceholder="Rechercher un pays..."
              searchNotFound="Pays non trouvé"
              specialLabel=""
            />
            {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Type de compte</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
              <FaUserTag />
            </div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
            >
              <option value="client">Client</option>
              <option value="writer">Rédacteur</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Création du compte...' : 'Créer un compte'}
        </button>
      </form>

      {/* Styles pour mieux intégrer le composant PhoneInput */}
      <style>{`
        .phone-input-container .react-tel-input .form-control {
          width: 100%;
          height: 42px;
        }
        
        .phone-input-container .react-tel-input .flag-dropdown {
          background-color: transparent;
          border: none;
          border-radius: 0.375rem 0 0 0.375rem;
        }
        
        .phone-input-container .react-tel-input .selected-flag:hover,
        .phone-input-container .react-tel-input .selected-flag:focus {
          background-color: transparent;
        }
        
        .phone-input-container .react-tel-input .country-list {
          width: 300px;
          max-height: 200px;
          overflow-y: auto;
        }
      `}</style>
    </>
  );
};

export default RegisterForm;
