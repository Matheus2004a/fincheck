import axios from 'axios';
import { storage } from '../config/storage';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

httpClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(storage.ACCESS_TOKEN);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

httpClient.interceptors.response.use((response) => response, (error) => {
  if (error.response) {
    return Promise.reject(new Error(error.response.data.message));
  }

  if (error.code === 'ERR_NETWORK') {
    return Promise.reject(new Error(error.message));
  }

  return error;
});
