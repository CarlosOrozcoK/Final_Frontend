// src/hooks/useLogin.jsx
import { useState } from 'react';

const API_URL = 'http://localhost:3000/Final_backend/v1/auth/login';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Error al iniciar sesión');
      }

      const { token, username: name } = data.userDetails;

      localStorage.setItem('token', token);
      localStorage.setItem('username', name);

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return { login, logout, error, loading };
};
