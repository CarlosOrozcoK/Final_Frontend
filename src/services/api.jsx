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

export const crearCita = async ({ doctorId, date }) => {
  try {
    const response = await apiClient.post('/appointments', { doctorId, date });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const actualizarPerfilUsuario = async (id, datosActualizados) => {
  try {
    const response = await apiClient.put(`/users/${id}`, datosActualizados);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getDatosPersonales = async () => {
  try {
    const response = await apiClient.get('/users/mi-perfil');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// ─── PAGOS ─────────────────────────────────────────────────────────

export const crearPagoCita = async ({ appointmentId, amount, method, transactionId }) => {
  try {
    const response = await apiClient.post('/payments', {
      appointmentId,
      amount,
      method,
      transactionId,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const obtenerPagosPorCita = async (appointmentId) => {
  try {
    const response = await apiClient.get(`/payments/${appointmentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const actualizarEstadoPago = async (paymentId, status) => {
  try {
    const response = await apiClient.put(`/payments/${paymentId}`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const generarFactura = async ({ appointmentId, paymentId }) => {
  try {
    const response = await apiClient.post(
      '/invoices/crear',
      { appointmentId, paymentId },
      { responseType: 'blob' } 
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};



export default apiClient;



