// src/services/documentService.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const uploadDocument = async (file: File, type: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);
  const response = await axios.post(`${API_URL}/documents`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data; // { url: string }
};