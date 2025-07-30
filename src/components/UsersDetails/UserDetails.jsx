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
    recargarPerfil // Aunque no se usa directamente aquí, es bueno tenerlo si el hook lo expone.
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

  // Efecto para precargar los datos del perfil cuando se cargan
  useEffect(() => {
    if (perfil) {
      setForm({
        name: perfil.name || '',
        username: perfil.username || '',
        dpi: perfil.dpi || '',
        address: perfil.address || '',
        phone: perfil.phone || '',
        email: perfil.email || '',
        password: '' // Siempre dejar la contraseña vacía por seguridad
      });
    }
  }, [perfil]);

  // Manejador de cambios para los campos del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejador de envío del formulario con confirmación
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirmación antes de actualizar
    const confirmUpdate = window.confirm('¿Estás seguro de que quieres guardar los cambios en tu perfil?');
    if (!confirmUpdate) {
      return; // Si el usuario cancela, no hacemos nada
    }

    await actualizarPerfil(form);
    // Puedes añadir lógica adicional aquí después de la actualización si es necesario
    // Por ejemplo, cerrar un modal o mostrar un mensaje temporal si no se hace en el hook
  };

  // Estado de carga inicial
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
        <p className="ml-4 text-xl text-gray-700">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-8 sm:p-10 border-t-4 border-red-600"> {/* Barra roja superior y sombra más profunda */}
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-4 border-gray-200">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Mi Perfil</h2>
          <button
            onClick={() => navigate('/HomePage')}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-full font-medium border border-gray-300 shadow-sm hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Regresar
          </button>
        </div>

        {/* Mensajes de feedback */}
        {exito && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-lg shadow-sm animate-fade-in">
            <p className="font-medium">{exito}</p>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-sm animate-fade-in">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Formulario de perfil */}
        <form onSubmit={handleSubmit} className="space-y-6"> {/* Más espacio entre campos */}
          {['name', 'username', 'dpi', 'address', 'phone', 'email', 'password'].map(field => (
            <div key={field}>
              <label htmlFor={field} className="block text-lg font-semibold text-gray-700 mb-2"> {/* Etiquetas más grandes */}
                {field === 'name' && 'Nombre Completo'}
                {field === 'username' && 'Nombre de Usuario'}
                {field === 'dpi' && 'Número de DPI'}
                {field === 'address' && 'Dirección'}
                {field === 'phone' && 'Teléfono'}
                {field === 'email' && 'Correo Electrónico'}
                {field === 'password' && 'Nueva Contraseña (opcional)'}
              </label>
              <input
                id={field}
                type={field === 'password' ? 'password' : (field === 'email' ? 'email' : (field === 'phone' ? 'tel' : 'text'))}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 text-lg transition-all duration-200" // Estilo de inputs
                placeholder={
                  field === 'name' ? 'Tu nombre completo' :
                  field === 'username' ? 'Tu nombre de usuario' :
                  field === 'dpi' ? 'Ej. 1234567890123' :
                  field === 'address' ? 'Tu dirección de residencia' :
                  field === 'phone' ? 'Ej. 1234-5678' :
                  field === 'email' ? 'tu.correo@ejemplo.com' :
                  field === 'password' ? 'Deja vacío para no cambiar' : ''
                }
                autoComplete={field === 'password' ? 'new-password' : field} // Autocompletar para accesibilidad
              />
            </div>
          ))}

          <div className="pt-4 flex justify-end gap-4"> {/* Espacio superior y justificación */}
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed" // Estilo del botón de guardar
            >
              {saving ? 'Guardando...' : 'Actualizar Perfil'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserDetails;