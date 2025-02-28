import React, { useState } from 'react';
import axios from 'axios';

const NewOrderForm = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    description: '',
    pageCount: 1,
    urgency: 'normal',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/orders', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Commande créée avec succès !');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type de service"
        value={formData.serviceType}
        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Nombre de pages"
        value={formData.pageCount}
        onChange={(e) => setFormData({ ...formData, pageCount: parseInt(e.target.value) })}
      />
      <select
        value={formData.urgency}
        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
      >
        <option value="normal">Normal</option>
        <option value="urgent">Urgent</option>
      </select>
      <button type="submit">Soumettre</button>
    </form>
  );
};

export default NewOrderForm;