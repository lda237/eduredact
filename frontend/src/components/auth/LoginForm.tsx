import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaExclamationTriangle } from 'react-icons/fa';
import { login } from '../../services/authService';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await login(email, password);
      
      if (response.user.role === 'client') {
        navigate('/client/dashboard');
      } else if (response.user.role === 'writer') {
        navigate('/writer/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    } catch {
      setError('Email ou mot de passe incorrect');
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
    placeholder = ''
  }: {
    icon: React.ReactNode,
    type: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    label: string,
    required?: boolean,
    placeholder?: string
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
    </div>
  );

  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded-md">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-red-500 mr-2" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}
      
      <form onSubmit={handleLogin} className="space-y-4">
        <InputField
          icon={<FaEnvelope />}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Adresse e-mail"
          required
          placeholder="exemple@domaine.com"
        />

        <InputField
          icon={<FaLock />}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Mot de passe"
          required
          placeholder="Votre mot de passe"
        />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Se souvenir de moi
            </label>
          </div>
          
          <div className="text-sm">
            <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
              Mot de passe oublié?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Pas encore de compte?{' '}
          <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Créer un compte
          </a>
        </p>
      </div>
    </>
  );
};

export default LoginForm;