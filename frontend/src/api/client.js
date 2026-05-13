import axios from 'axios';
import { API_URL } from '../config/env';

const getStoredAuthState = () => {
  try {
    const raw = localStorage.getItem('auth_state');
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return token;
  }

  return getStoredAuthState()?.token || '';
};

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

client.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      const url = String(error.config?.url || '');
      const isAiCall =
        url.includes('/result') ||
        url.includes('/chat') ||
        url.includes('/career') ||
        url.includes('/why-not') ||
        url.includes('/ai-report');
      if (isAiCall) {
        return Promise.reject(
          new Error(
            'Your AI summary is taking a little longer than expected. Your scores are ready — showing a fallback summary now. You can retry the AI-enhanced version.'
          )
        );
      }
      return Promise.reject(
        new Error('The request timed out. Please check your connection and try again.')
      );
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong while processing your request.';

    return Promise.reject(new Error(message));
  }
);

export default client;
