import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';
import { FaUserPlus, FaCheckCircle } from 'react-icons/fa';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Section gauche (visible uniquement sur desktop) */}
      <div className="hidden md:flex md:w-1/2 bg-indigo-700 text-white p-12 flex-col justify-center items-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6">Rejoignez notre communauté</h1>
          <p className="text-xl mb-8">
            Créez votre compte et commencez à utiliser notre plateforme en quelques minutes.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <FaCheckCircle className="text-blue-300 text-xl mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">Accès immédiat</h3>
                <p className="text-blue-100">Accédez à tous nos services dès la validation de votre compte.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaCheckCircle className="text-blue-300 text-xl mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">Support dédié</h3>
                <p className="text-blue-100">Notre équipe est à votre disposition pour vous accompagner.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaCheckCircle className="text-blue-300 text-xl mt-1 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">Sécurité garantie</h3>
                <p className="text-blue-100">Vos données sont protégées avec les meilleurs standards de sécurité.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section droite avec le formulaire */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-3">
              <FaUserPlus className="text-blue-600 text-xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Inscription</h2>
          </div>
          
          <RegisterForm />
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600">
              Déjà un compte ?{' '}
              <Link 
                to="/login" 
                className="text-blue-600 font-medium hover:text-blue-800 transition duration-300"
              >
                Se Connecter
              </Link>
            </p>
          </div>
          
          <p className="text-xs text-center text-gray-500 mt-8">
            En vous inscrivant, vous acceptez nos{' '}
            <Link to="/terms" className="underline hover:text-blue-600">Conditions d'utilisation</Link>
            {' '}et notre{' '}
            <Link to="/privacy" className="underline hover:text-blue-600">Politique de confidentialité</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;