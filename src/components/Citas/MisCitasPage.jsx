import React from 'react';
import { useNavigate } from 'react-router-dom';
import useMisCitas from '../../shared/hooks/useMisCitas';

const MisCitasPage = () => {
  const { citas, loading, error } = useMisCitas();
  const navigate = useNavigate();

  return (
    <section className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-red-700">Mis Citas</h2>

      {loading && <p className="text-gray-600">Cargando citas...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && citas.length === 0 && (
        <p className="text-gray-600">No tienes citas agendadas.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {citas.map((cita) => (
          <div key={cita._id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {cita.doctor?.name} - {cita.doctor?.specialization}
            </h3>
            <p className="text-gray-700 mb-1">
              📅 Fecha: {new Date(cita.date).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-1">
              💲 Precio: Q{cita.price}
            </p>
            <p className="text-gray-700">
              Estado: <span className="font-semibold capitalize">{cita.status}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate('/HomePage')}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md"
        >
          ← Volver al inicio
        </button>
      </div>
    </section>
  );
};

export default MisCitasPage;
