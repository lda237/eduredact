import React from 'react';

const orders = [
  { id: 1, serviceType: 'Rédaction', status: 'En cours', deadline: '2023-10-15' },
  { id: 2, serviceType: 'Traduction', status: 'Terminé', deadline: '2023-10-10' },
];

const OrderList: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Mes Commandes</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">ID</th>
            <th className="text-left">Type de Service</th>
            <th className="text-left">Statut</th>
            <th className="text-left">Date Limite</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.serviceType}</td>
              <td>{order.status}</td>
              <td>{order.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;