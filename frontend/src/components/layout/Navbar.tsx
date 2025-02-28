import { BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600';
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">EduRédact</span>
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className={`${isActive('/')} px-3 py-2 transition-colors`}>
              Accueil
            </Link>
            <Link to="/services" className={`${isActive('/services')} px-3 py-2 transition-colors`}>
              Services
            </Link>
            <Link to="/tarifs" className={`${isActive('/tarifs')} px-3 py-2 transition-colors`}>
              Tarifs
            </Link>
            <Link to="/a-propos" className={`${isActive('/a-propos')} px-3 py-2 transition-colors`}>
              A propos
            </Link>
            <Link to="/estimation" className={`${isActive('/estimation')} px-3 py-2 transition-colors`}>
              Estimation
            </Link>
            <Link to="/contact" className={`${isActive('/contact')} px-3 py-2 transition-colors`}>
              Contact
            </Link>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              <Link to="/login" >
              Connexion
              </Link>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}