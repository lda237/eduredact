import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const initiatePayment = async (orderId: number) => {
  const response = await axios.post(`${API_URL}/payments`, { orderId });
  return response.data;
};