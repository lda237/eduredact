// frontend/src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL du backend
});

export const getEstimate = async (data: { serviceType: string; pageCount: number; urgency: string }) => {
  const response = await api.post('/estimate', data);
  return response.data;
};