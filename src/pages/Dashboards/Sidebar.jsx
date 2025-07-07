import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role, activeMenu, setActiveMenu }) => { 

  const menuItemsOwner = [
    { id: 'home', label: 'Inicio', path: '/' },
    { id: 'doctores', label: 'Doctores', path: '/doctores' },
    { id: 'clientes', label: 'Clientes', path: '/clientes' },
  ];

  const menuItemsClient = [
    { id: 'home', label: 'Inicio', path: '/' },
    { id: 'misCitas', label: 'Mis Citas', path: '/mis-citas' },
    { id: 'perfil', label: 'Perfil', path: '/perfil' },
  ];

  const menuItems = role === 'OWNER_ROLE' ? menuItemsOwner : menuItemsClient;

  return (
    <aside className="w-64 bg-red-700 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">Clínica Salud</h2>
      <nav>
        <ul>
          {menuItems.map(({ id, label, path }) => (
            <li key={id} className="mb-4">
              <Link
                to={path}
                className={`block rounded px-3 py-2 hover:bg-red-600 ${
                  activeMenu === id ? 'bg-red-800 font-semibold' : ''
                }`}
                onClick={() => setActiveMenu(id)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
