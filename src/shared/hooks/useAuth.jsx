import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.token && storedUser?.role) {
      setToken(storedUser.token);
      setRole(storedUser.role);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setToken(null);
    setRole(null);
  };

  return { role, token, logout };
};
