import React from 'react';

const Sidebar = ({ role, activeMenu, setActiveMenu }) => {
  const menuItemsOwner = [
    { id: 'home', label: 'Inicio' },
    { id: 'doctores', label: 'Doctores' },
    { id: 'pacientes', label: 'Pacientes' },
    { id: 'agregarDoctor', label: 'Agregar Doctor' },
  ];

  const menuItemsClient = [
    { id: 'home', label: 'Inicio' },
    { id: 'misCitas', label: 'Mis Citas' },
    { id: 'perfil', label: 'Perfil' },
  ];

  const menuItems = role === 'OWNER_ROLE' ? menuItemsOwner : menuItemsClient;

  return (
    <aside className="w-64 bg-red-700 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">Clínica Salud</h2>
      <nav>
        <ul>
          {menuItems.map(({ id, label }) => (
            <li
              key={id}
              onClick={() => setActiveMenu(id)}
              className={`mb-4 cursor-pointer rounded px-3 py-2 hover:bg-red-600 ${
                activeMenu === id ? 'bg-red-800 font-semibold' : ''
              }`}
            >
              {label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
