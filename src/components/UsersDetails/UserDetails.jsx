import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usePerfilUsuario from '../../shared/hooks/useUserDetails';

const UserDetails = () => {
  const navigate = useNavigate();

  const {
    perfil,
    loading,
    saving,
    error,
    exito,
    actualizarPerfil,
    recargarPerfil
  } = usePerfilUsuario();

  const [form, setForm] = useState({
    name: '',
    username: '',
    dpi: '',
    address: '',
    phone: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (perfil) {
      setForm({
        name: perfil.name || '',
        username: perfil.username || '',
        dpi: perfil.dpi || '',
        address: perfil.address || '',
        phone: perfil.phone || '',
        email: perfil.email || '',
        password: ''
      });
    }
  }, [perfil]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actualizarPerfil(form);
  };

  if (loading) return <p>Cargando perfil...</p>;

  return (
    <section className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Mi Perfil</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        {['name', 'username', 'dpi', 'address', 'phone', 'email', 'password'].map(field => (
          <div key={field}>
            <label className="block font-medium capitalize">
              {field === 'password' ? 'Nueva contraseña (opcional)' : field}
            </label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
            />
          </div>
        ))}

        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {saving ? 'Guardando...' : 'Actualizar Perfil'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/HomePage')}
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            Regresar
          </button>
        </div>

        {exito && <p className="text-green-600 mt-4">{exito}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </form>
    </section>
  );
};

export default UserDetails;
