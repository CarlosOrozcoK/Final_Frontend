import { useState } from 'react';
import apiClient from '../../services/api.jsx';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const { data, status } = await apiClient.post('/auth/login', { username, password });

      if (status !== 200) {
        throw new Error(data.msg || 'Error al iniciar sesión');
      }

      const { token, username: name, role } = data.userDetails;

      localStorage.setItem('token', token);
      localStorage.setItem('username', name);
      localStorage.setItem('role', role);

      return { success: true };
    } catch (err) {
      setError(err.response?.data?.msg || err.message || 'Error al iniciar sesión');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  };

  return { login, logout, error, loading };
};
