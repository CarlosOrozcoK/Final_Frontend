import { useEffect, useState } from 'react';
import apiClient from '../../services/api.jsx';

const useMisCitas = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCitas = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/appointments');
      setCitas(response.data.appointments);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener citas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  return {
    citas,
    loading,
    error
  };
};

export default useMisCitas;
