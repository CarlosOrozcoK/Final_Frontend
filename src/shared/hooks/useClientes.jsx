import { useState, useEffect } from 'react';
import apiClient from '../../services/api.jsx';

const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClientes = async () => {
    try {
      const response = await apiClient.get('/users');
      if (response.data.success) {
        setClientes(response.data.clientes);
      } else {
        setError('No se pudieron cargar los clientes');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return { clientes, loading, error, refetch: fetchClientes };
};

export default useClientes;
