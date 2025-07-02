import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegister } from '../../shared/hooks/useRegister'; 

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    username: '',
    dpi: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { register, error, loading } = useRegister();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }

    const { confirmPassword, ...userData } = form;

    const result = await register(userData);

    if (result.success) {
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2800/2800318.png"
            alt="Logo Clínica Salud"
            className="h-16 w-16 object-contain"
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Crear una Cuenta</h2>
        <p className="text-gray-600 mb-8">Únete a nuestra comunidad para acceder a nuestros servicios.</p>

        {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Nombre Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="username" className="block mb-2 font-medium text-gray-700">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="usuario123"
            />
          </div>

          <div>
            <label htmlFor="dpi" className="block mb-2 font-medium text-gray-700">DPI</label>
            <input
              type="text"
              id="dpi"
              name="dpi"
              value={form.dpi}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="Número de DPI"
            />
          </div>

          <div>
            <label htmlFor="address" className="block mb-2 font-medium text-gray-700">Dirección</label>
            <input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="Tu dirección"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">Teléfono</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="Número de teléfono"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="tu@ejemplo.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="********"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-2 font-medium text-gray-700">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 text-white py-3 px-6 rounded-full font-semibold text-lg
                       hover:bg-red-800 transition-colors shadow-md"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="mt-8 text-gray-600 text-center">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-red-700 hover:text-red-800 font-medium">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
