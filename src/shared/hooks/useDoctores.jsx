import { useEffect, useState } from 'react';
import { getDoctors } from '../../services/api.jsx'; 

const useDoctores = () => {
  const [doctores, setDoctores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctores = async () => {
    try {
      const res = await getDoctors();
      if (res.success) {
        setDoctores(res.doctors);
      } else {
        setError('No se pudieron cargar los doctores.');
      }
    } catch (err) {
      setError(err.message || 'Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctores();
  }, []);

  return { doctores, loading, error, refetch: fetchDoctores };
};

export default useDoctores;
