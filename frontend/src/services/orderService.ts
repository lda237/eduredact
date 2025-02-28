import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createOrder = async (orderData: any) => {
  const response = await axios.post(`${API_URL}/orders`, orderData);
  return response.data;
};

export const getOrders = async (userId: number) => {
  const response = await axios.get(`${API_URL}/orders`, { params: { userId } });
  return response.data;
};