// Notification.tsx
import React from 'react';
import { Bell, CheckCircle, XCircle } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" />;
      case 'error':
        return <XCircle className="text-red-500" />;
      default:
        return <Bell className="text-blue-500" />;
    }
  };

  return (
    <div className="flex items-center space-x-3 p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
      {getIcon()}
      <span className="text-gray-700 dark:text-gray-300">{message}</span>
    </div>
  );
};

export default Notification;