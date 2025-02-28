import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/profile`;

// Récupérer les informations du profil
export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du profil :", error);
    throw error;
  }
};

// Mettre à jour le profil
export const updateProfile = async (profileData: { email: string; phone: string }) => {
  try {
    const response = await axios.put(`${API_URL}/update`, profileData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
    throw error;
  }
};

// Vérifier si le profil est validé
export const checkProfileValidation = async () => {
  try {
    const response = await axios.get(`${API_URL}/validation-status`, {
      withCredentials: true,
    });
    return response.data.isValidated;
  } catch (error) {
    console.error("Erreur lors de la vérification du profil :", error);
    throw error;
  }
};
