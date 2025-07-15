// src/shared/hooks/useAgendarCita.jsx
import { useState } from 'react';
import apiClient from '../../services/api.jsx';

const useAgendarCita = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cita, setCita] = useState(null);

  const agendarCita = async ({ doctorId, date }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.post('/appointments/nuevaCita', { doctorId, date });

      if (response?.data?.appointment) {
        setCita(response.data.appointment);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al agendar la cita');
    } finally {
      setLoading(false);
    }
  };

  return {
    agendarCita,
    cita,
    loading,
    error
  };
};

export default useAgendarCita;
