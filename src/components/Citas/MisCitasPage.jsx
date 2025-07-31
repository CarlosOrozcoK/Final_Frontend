import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMisCitas from '../../shared/hooks/useMisCitas';
import apiClient from '../../services/api';

const statusDisplayMap = {
  confirmed: 'Confirmada',
  pending: 'Pendiente',
  scheduled: 'Agendada',
  cancelled: 'Cancelada',
  completed: 'Completada',
};

const MisCitasPage = () => {
  const { citas: fetchedCitas, loading, error, refetch } = useMisCitas();
  const [currentCitas, setCurrentCitas] = useState([]);

  useEffect(() => {
    if (fetchedCitas) setCurrentCitas(fetchedCitas);
  }, [fetchedCitas]);

  const navigate = useNavigate();

  const handlePagarCita = (citaId) => navigate(`/payment/${citaId}`);

  const handleCancelCita = async (citaId) => {
    const isConfirmed = window.confirm(
      '¿Estás seguro de que quieres cancelar esta cita? Esta acción no se puede deshacer.'
    );
    if (isConfirmed) {
      try {
        await apiClient.delete(`/appointments/${citaId}`);
        setCurrentCitas((prev) => prev.filter((cita) => cita._id !== citaId));
        alert('Cita cancelada exitosamente.');
        refetch?.();
      } catch (err) {
        const statusCode = err.response?.status;
        const backendMessage = err.response?.data?.message;
        if (statusCode === 400 || statusCode === 409) {
          setCurrentCitas((prev) => prev.filter((cita) => cita._id !== citaId));
          alert('Cita cancelada exitosamente.');
          refetch?.();
        } else {
          alert(backendMessage || 'Error al cancelar la cita. Intenta de nuevo.');
        }
      }
    }
  };

  return (
    <section className="p-6 sm:p-8 max-w-6xl mx-auto min-h-screen bg-gray-50">
      <h2 className="text-4xl font-bold mb-10 text-center text-red-700">Mis Citas</h2>

      <div className="text-center mb-10">
        <button
          onClick={() => navigate('/agendar-cita')}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-md font-semibold flex items-center justify-center gap-2"
        >
          <span className="text-xl">➕</span> Agendar Nueva Cita
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-48">
          <p className="text-lg text-gray-600 animate-pulse">Cargando citas...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <strong>¡Error!</strong> {error}
        </div>
      )}

      {!loading && !error && currentCitas.length === 0 && (
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <p className="text-lg text-gray-700">No tienes citas agendadas.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCitas.map((cita) => (
          <div
            key={cita._id}
            className="bg-white rounded-xl shadow-lg p-5 hover:shadow-xl transition transform hover:-translate-y-1 border-l-4 border-red-600"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-1">👨‍⚕️ {cita.doctor?.name || 'Doctor Desconocido'}</h3>
            <p className="text-gray-600 mb-2">🩺 {cita.doctor?.specialization || 'Especialidad no definida'}</p>
            <p className="text-gray-700 mb-1">📅 Fecha: <span className="font-medium">{new Date(cita.date).toLocaleString('es-GT', { dateStyle: 'medium', timeStyle: 'short' })}</span></p>
            <p className="text-gray-700 mb-2">💰 Precio: <span className="font-medium">Q{cita.price?.toFixed(2) || 'N/A'}</span></p>

            <p className="text-sm mt-2 mb-4">
              Estado:{' '}
              <span
                className={`font-bold ${
                  cita.status === 'confirmed'
                    ? 'text-green-600'
                    : cita.status === 'pending'
                    ? 'text-yellow-600'
                    : cita.status === 'scheduled'
                    ? 'text-blue-600'
                    : 'text-red-600'
                }`}
              >
                {statusDisplayMap[cita.status] || cita.status || 'Desconocido'}
              </span>
            </p>

            <div className="flex gap-2 flex-wrap mt-auto">
              {cita.status === 'scheduled' && (
                <button
                  onClick={() => handlePagarCita(cita._id)}
                  className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-full shadow-md"
                >
                  💳 Pagar
                </button>
              )}
              <button
                onClick={() => handleCancelCita(cita._id)}
                disabled={['completed', 'cancelled'].includes(cita.status)}
                className={`text-white text-sm px-4 py-2 rounded-full shadow-md ${
                  ['completed', 'cancelled'].includes(cita.status)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {cita.status === 'cancelled' ? 'Cancelada' : 'Cancelar'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => navigate('/HomePage')}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full font-semibold shadow-md"
        >
          ← Volver al Inicio
        </button>
      </div>
    </section>
  );
};

export default MisCitasPage;
