import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role, activeMenu, setActiveMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItemsOwner = [
    { id: 'home', label: 'Inicio', path: '/' },
    { id: 'doctores', label: 'Doctores', path: '/doctores' },
    { id: 'clientes', label: 'Clientes', path: '/clientes' },
  ];

  const menuItemsClient = [
    { id: 'home', label: 'Inicio', path: '/' },
    { id: 'misCitas', label: 'Mis Citas', path: '/mis-citas' },
    { id: 'userDetails', label: 'Perfil', path: '/UserDetails' },
  ];

  const menuItems = role === 'OWNER_ROLE' ? menuItemsOwner : menuItemsClient;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 text-white bg-red-700 rounded-md shadow-lg lg:hidden"
      >
        {isOpen ? '✖' : '☰'}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 bg-red-700 text-white min-h-screen p-6 transform transition-transform duration-300 z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:fixed lg:block`}
      >
        <h2 className="text-2xl font-bold mb-8">Clínica Salud de Guatemala</h2>
        <nav>
          <ul>
            {menuItems.map(({ id, label, path }) => (
              <li key={id} className="mb-4">
                <Link
                  to={path}
                  className={`block rounded px-3 py-2 hover:bg-red-600 ${
                    activeMenu === id ? 'bg-red-800 font-semibold' : ''
                  }`}
                  onClick={() => {
                    if (typeof setActiveMenu === 'function') {
                      setActiveMenu(id);
                    }
                    setIsOpen(false);
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
