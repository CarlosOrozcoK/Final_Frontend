import { useState, useEffect } from 'react';
import { getDatosPersonales, actualizarPerfilUsuario } from '../../services/api.jsx';

const usePerfilUsuario = () => {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);

  // Cargar datos personales al montar o cuando sea necesario
  const cargarPerfil = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getDatosPersonales();
      setPerfil(data.cliente);  // asumimos que viene en data.cliente
    } catch (err) {
      setError(err.msg || 'Error al cargar perfil');
    } finally {
      setLoading(false);
    }
  };

  // Actualizar perfil con datos nuevos
  const actualizarPerfil = async (datosActualizados) => {
    if (!perfil?._id) {
      setError('ID de usuario no disponible');
      return;
    }
    try {
      setSaving(true);
      setError(null);
      setExito(null);
      const data = await actualizarPerfilUsuario(perfil._id, datosActualizados);
      setPerfil(data.cliente); // actualizar perfil local
      setExito('Perfil actualizado correctamente');
    } catch (err) {
      setError(err.msg || 'Error al actualizar perfil');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    cargarPerfil();
  }, []);

  return {
    perfil,
    loading,
    saving,
    error,
    exito,
    actualizarPerfil,
    recargarPerfil: cargarPerfil,
  };
};

export default usePerfilUsuario;
