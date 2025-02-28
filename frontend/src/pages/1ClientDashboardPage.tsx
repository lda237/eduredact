import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import OrderList from '../components/Dashboard/ClientDashboard/OrderList';
import { useAuthStore } from '../store/authStore';
import { FileText, Plus, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClientDashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0
  });

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      // Ces valeurs seraient normalement récupérées depuis votre API
      setStats({
        totalOrders: 12,
        pendingOrders: 3,
        completedOrders: 9
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* En-tête de la page */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tableau de Bord Client</h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Bienvenue, {user?.name || 'utilisateur'}. Gérez vos commandes et suivez votre activité.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link
              to="/orders/new"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Commande
            </Link>
            <button 
              onClick={() => setIsLoading(true)}
              className="inline-flex items-center px-3 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Actualiser
            </button>
          </div>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                <FileText className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Commandes Totales</h2>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {isLoading ? '...' : stats.totalOrders}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">
                <FileText className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">En Cours</h2>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {isLoading ? '...' : stats.pendingOrders}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                <FileText className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Terminées</h2>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {isLoading ? '...' : stats.completedOrders}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des commandes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Vos commandes récentes</h2>
          </div>
          <div className={`${isLoading ? 'opacity-50' : ''} transition-opacity`}>
            <OrderList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboardPage;