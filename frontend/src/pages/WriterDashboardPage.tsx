import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import AssignedOrders from '../components/Dashboard/WriterDashboard/AssignedOrders';
import ProfileEditor from '../components/Dashboard/WriterDashboard/ProfileEditor';
import DocumentSubmission from '../components/Dashboard/WriterDashboard/SubmitDocumentForm';
import Payments from '../components/Dashboard/WriterDashboard/Payment';
import Notifications from '../components/Dashboard/WriterDashboard/Notification';
import { 
  FileText, 
  User, 
  Upload, 
  CreditCard, 
  Bell, 
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

// Définition des onglets disponibles
const tabs = [
  { id: 'orders', label: 'Commandes assignées', icon: <FileText className="w-5 h-5" /> },
  { id: 'profile', label: 'Profil', icon: <User className="w-5 h-5" /> },
  { id: 'documents', label: 'Soumettre des documents', icon: <Upload className="w-5 h-5" /> },
  { id: 'payments', label: 'Paiements', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
  { id: 'stats', label: 'Statistiques', icon: <BarChart3 className="w-5 h-5" /> }
];

const WriterDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [isVerified, setIsVerified] = useState(false); // Simule la vérification du profil
  
  // Récupérer l'onglet actif depuis l'URL si disponible
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab && tabs.some(t => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);
  
  // Mettre à jour l'URL lorsque l'onglet change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/writer/dashboard?tab=${tabId}`);
  };

  // Simuler une vérification de profil après soumission des documents
  const handleProfileVerification = () => {
    setIsVerified(true);
  };

  // Animation pour les transitions de contenu
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg mb-6">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tableau de bord écrivain</h1>
          <p className="text-gray-500 dark:text-gray-400">Gérez vos commandes et votre profil</p>
        </div>
        
        {/* Bannière de vérification */}
        {!isVerified && (
          <div className="bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 dark:border-yellow-600 text-yellow-800 dark:text-yellow-200 p-4 m-6 rounded-md flex justify-between items-center">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              <span>Votre profil n'est pas encore vérifié. Veuillez soumettre vos documents.</span>
            </div>
            <button 
              onClick={() => handleTabChange('documents')}
              className="bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-700 dark:hover:bg-yellow-600 text-yellow-800 dark:text-yellow-100 px-4 py-2 rounded-md text-sm font-medium flex items-center"
            >
              Soumettre <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
                    : 'border-transparent hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Contenu de l'onglet actif */}
        <div className="p-6">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            {activeTab === 'orders' && (
              <AssignedOrders />
            )}
            {activeTab === 'profile' && (
              <ProfileEditor onVerificationComplete={handleProfileVerification} />
            )}
            {activeTab === 'documents' && (
              <DocumentSubmission onSubmissionComplete={handleProfileVerification} />
            )}
            {activeTab === 'payments' && (
              <Payments amount={100} status="completed" />
            )}
            {activeTab === 'notifications' && (
              <Notifications message="Nouvelle commande assignée" type="info" />
            )}
            {activeTab === 'stats' && (
              <div className="text-center p-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Les statistiques seront disponibles après votre première commande complétée.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WriterDashboard;