import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/Final_backend/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token; 
  }
  return config;
});



export const loginApi = async (username, password) => {
  try {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const registerApi = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getDoctors = async () => {
  try {
    const response = await apiClient.get('/doctors');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default apiClient;



