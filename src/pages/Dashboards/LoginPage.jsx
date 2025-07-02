import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../shared/hooks/useLogin';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result.success) {
      navigate('/HomePage'); 
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido de nuevo</h2>
        <p className="text-gray-600 mb-8">Inicia sesión para acceder a tu cuenta.</p>

        {error && (
          <div className="mb-4 text-red-600 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-left text-sm font-medium text-gray-700 mb-2">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 text-gray-900"
              placeholder="usuario123"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 text-gray-900"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 text-white py-3 px-6 rounded-full font-semibold text-lg
                       hover:bg-red-800 transition-colors shadow-md focus:outline-none focus:ring-2
                       focus:ring-red-500 focus:ring-offset-2"
          >
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="mt-8 text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/Register" className="text-red-700 hover:text-red-800 font-medium">
            Regístrate aquí
          </Link>
        </p>
        <p className="mt-4 text-gray-600">
          <Link to="/forgot-password" className="text-red-700 hover:text-red-800 font-medium text-sm">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
