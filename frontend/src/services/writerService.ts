// src/services/writerService.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const submitVerification = async (data: {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  dateOfBirth: string;
  documents: string[];
}) => {
  const response = await axios.post(`${API_URL}/writer/submit-verification`, data);
  return response.data;
};