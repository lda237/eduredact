import React from 'react';

export const DashboardFooter: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} EduRédact. Tous droits réservés.
        </p>
        <div className="mt-2 space-x-4">
          <a href="/aide" className="text-sm hover:underline">
            Aide
          </a>
          <a href="/contact" className="text-sm hover:underline">
            Contact
          </a>
          <a href="/conditions" className="text-sm hover:underline">
            Conditions d'utilisation
          </a>
        </div>
      </div>
    </footer>
  );
};