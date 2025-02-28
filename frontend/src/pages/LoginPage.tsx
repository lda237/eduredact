import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { FaUserCircle } from 'react-icons/fa';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Section gauche (visible uniquement sur desktop) */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-700 text-white p-12 flex-col justify-center items-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6">Bienvenue sur notre plateforme</h1>
          <p className="text-xl mb-8">
            Connectez-vous pour accéder à votre espace personnel et gérer vos projets.
          </p>
          <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
            <p className="italic text-lg mb-4">
              "Cette plateforme a complètement transformé ma façon de travailler. Tout est devenu plus simple et plus efficace."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center mr-3">
                <FaUserCircle className="text-white text-xl" />
              </div>
              <div>
                <p className="font-medium">Marie Dupont</p>
                <p className="text-sm text-blue-100">Utilisatrice depuis 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section droite avec le formulaire */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <FaUserCircle className="text-blue-600 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Connexion</h2>
            <p className="text-gray-500 mt-2">Accédez à votre espace personnel</p>
          </div>
          
          {/* Intégration du formulaire de connexion */}
          <LoginForm />
          
          {/* Pas besoin du lien vers inscription car déjà inclus dans le LoginForm amélioré */}
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <p className="text-center text-sm text-gray-500">
                En vous connectant, vous acceptez nos{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                  Conditions d'utilisation
                </Link>{' '}
                et notre{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                  Politique de confidentialité
                </Link>
              </p>
              
              <div className="text-center">
                <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
                  Retour à l'accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;