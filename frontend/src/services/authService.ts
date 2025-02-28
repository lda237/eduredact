import axios from 'axios';

// Récupération de l'URL du backend depuis les variables d'environnement
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const register = async (email: string, password: string, phone: string, role: string) => {
  // Utilisation de l'URL backend pour faire la requête
  const response = await axios.post(`${API_URL}/api/auth/register`, { email, password, phone, role });
  return response.data;
};

export const login = async (email: string, password: string) => {
  // Utilisation de l'URL backend pour faire la requête
  const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
  return response.data;
};
