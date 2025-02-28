import React from 'react';
import { Link } from 'react-router-dom';

export const DashboardNavbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/dashboard" className="text-xl font-bold">
          EduRédact
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="flex items-center focus:outline-none">
              <img
                src="https://via.placeholder.com/40" // Remplace par l'URL de l'avatar de l'utilisateur
                alt="User Avatar"
                className="h-10 w-10 rounded-full"
              />
              <span className="ml-2">John Doe</span> {/* Remplace par le nom de l'utilisateur */}
            </button>
            {/* Menu déroulant (optionnel) */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg hidden">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profil
              </Link>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};