// Payment.tsx
import React from 'react';

interface PaymentProps {
  amount: number;
  status: 'pending' | 'completed' | 'failed';
}

const Payment: React.FC<PaymentProps> = ({ amount, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
      <p className="text-gray-700 dark:text-gray-300">Montant: {amount} €</p>
      <p className={`font-bold ${getStatusColor()}`}>Statut: {status}</p>
    </div>
  );
};

export default Payment;