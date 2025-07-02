import { useState } from 'react';
import apiClient from '../../services/api'; 

export const useRegister  = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const { data, status } = await apiClient.post('/auth/register', userData);

      if (status !== 201) {
        throw new Error(data.message || 'Error al registrar');
      }

      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error desconocido');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { register, error, loading };
};
