import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getClientOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/client/orders`);
  return response.data;
};

export const getWriterOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/writer/orders`);
  return response.data;
};

export const getAdminMetrics = async () => {
  const response = await axios.get(`${API_BASE_URL}/admin/metrics`);
  return response.data;
};