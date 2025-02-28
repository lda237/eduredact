import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  LayoutDashboard, FileText, MessageSquare, User, LogOut, 
  Settings, HelpCircle, ChevronRight, Bell,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

// Interface for navigation items
interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  badge?: number;
}

// Navigation Item Component
function NavItem({ to, icon, children, badge }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-primary-50 text-primary-900 font-medium dark:bg-primary-900/20 dark:text-primary-100'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
      }`}
    >
      <div className="flex items-center space-x-3">
        {React.cloneElement(icon as React.ReactElement, {
          className: `w-5 h-5 ${isActive ? 'text-primary-600 dark:text-primary-400' : ''}`,
        })}
        <span>{children}</span>
      </div>
      
      <div className="flex items-center">
        {badge !== undefined && badge > 0 && (
          <span className="bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full mr-2">
            {badge}
          </span>
        )}
        {isActive && <ChevronRight className="w-4 h-4 text-primary-600 dark:text-primary-400" />}
      </div>
    </Link>
  );
}

// Interface for section divider
interface SectionDividerProps {
  title: string;
}

function SectionDivider({ title }: SectionDividerProps) {
  return (
    <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
      {title}
    </div>
  );
}

// Interface for Sidebar props
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { user, signOut } = useAuthStore();
  
  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0.5 }
  };

  return (
    <motion.aside
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ damping: 20, stiffness: 300 }}
      className={`fixed md:static top-0 left-0 z-20 w-72 h-full md:h-auto bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-xl md:shadow-none md:translate-x-0 flex flex-col overflow-hidden`}
    >
      {/* Mobile sidebar close button */}
      <div className="flex justify-end p-2 md:hidden">
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 rounded-md"
          aria-label="Fermer le menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex flex-col h-full overflow-y-auto">
        {/* User profile section */}
        {user && (
          <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center shadow-md">
                <span className="text-lg font-bold text-white">
                  {(user.name as string)?.charAt(0)?.toUpperCase() ?? (user.email as string)?.charAt(0)?.toUpperCase() ?? ''}
                </span>
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900 dark:text-white">{user.name || user.email}</p>
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1 flex-1">
          <SectionDivider title="Principal" />
          
          <NavItem
            to={user?.role === 'client' ? '/client/dashboard' : '/writer/dashboard'}
            icon={<LayoutDashboard />}
          >
            Tableau de Bord
          </NavItem>
          
          <NavItem 
            to="/orders" 
            icon={<FileText />}
            badge={5} // Exemple de badge pour montrer les commandes non lues
          >
            Commandes
          </NavItem>
          
          <NavItem 
            to="/messages" 
            icon={<MessageSquare />}
            badge={2} // Exemple de badge pour montrer les messages non lus
          >
            Messages
          </NavItem>

          <SectionDivider title="Compte" />
          
          <NavItem to="/profile" icon={<User />}>
            Profil
          </NavItem>
          
          <NavItem to="/notifications" icon={<Bell />}>
            Notifications
          </NavItem>
          
          <NavItem to="/settings" icon={<Settings />}>
            Paramètres
          </NavItem>
          
          <SectionDivider title="Support" />
          
          <NavItem to="/help" icon={<HelpCircle />}>
            Aide & Contact
          </NavItem>
          
          {/* Sign out button */}
          {user && (
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={signOut}
                className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 dark:hover:text-red-400 group transition-colors"
              >
                <LogOut className="w-5 h-5 group-hover:text-red-500" />
                <span>Déconnexion</span>
              </button>
            </div>
          )}
        </nav>
      </div>
      
      {/* Pro badge */}
      <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Version Pro
          </span>
          <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100 rounded-full">
            Actif
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Votre abonnement expire le 01/03/2025
        </p>
      </div>
    </motion.aside>
  );
}