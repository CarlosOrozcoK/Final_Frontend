import { useState } from 'react';
import apiClient from '../../services/api.jsx';

const useAgregarDoctor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const agregarDoctor = async (datosDoctor) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await apiClient.post('/doctors/nuevoDoc', datosDoctor);
      return { success: true, doctor: data.doctor };
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al agregar doctor');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { agregarDoctor, loading, error };
};

export default useAgregarDoctor;
