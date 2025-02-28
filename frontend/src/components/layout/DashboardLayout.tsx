import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useAuthStore } from '../../store/authStore';
import { Menu, X, FileText, Bell, ChevronDown } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { AnimatePresence, motion } from 'framer-motion';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut, initialize } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications] = useState<number>(3); // Exemple de compteur de notifications

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    // Fermer le sidebar sur changement de route sur mobile
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Overlay pour mobile quand sidebar est ouverte */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-10 md:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar}
                className="mr-2 p-2 rounded-md md:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-all duration-200"
                aria-label={sidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <Link to="/" className="flex items-center group">
                <FileText className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                  Edu<span className="text-primary-600 dark:text-primary-400">Rédact</span>
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notification Icon */}
              <button className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 rounded-full transition-colors">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-xs">
                    {notifications}
                  </span>
                )}
              </button>
              
              <ThemeToggle />
              
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                        {String(user.name || user.email || '').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">{user.name || user.email}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 hidden md:block" />
                  </button>
                  
                  {/* User Menu Dropdown */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
                      >
                        <div className="p-3 border-b border-gray-200 dark:border-gray-700 md:hidden">
                          <p className="font-medium">{user.name || user.email}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Profil
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                          >
                            Déconnexion
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-all duration-300 hover:shadow-md"
                >
                  <span>Connexion</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 relative">
        {/* Sidebar - avec z-index supérieur à l'overlay */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <motion.main 
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-4 md:p-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </motion.main>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} EduRédact. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}