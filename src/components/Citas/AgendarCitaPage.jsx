import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import useAgendarCita from '../../shared/hooks/useAgendarCita.jsx';
import { getDoctors } from '../../services/api.jsx';

const AgendarCitaPage = () => {
  const { agendarCita, cita, loading, error } = useAgendarCita();
  const [doctores, setDoctores] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const fetchDoctores = async () => {
      try {
        const { doctors } = await getDoctors();
        setDoctores(doctors);
      } catch (err) {
        // Mejorar manejo de errores para el usuario
        console.error("Error al cargar doctores:", err);
        // Opcional: setear un estado de error para mostrar un mensaje al usuario
      }
    };
    fetchDoctores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctorId || !date) {
      alert("Por favor, selecciona un doctor y una fecha para agendar la cita.");
      return;
    }
    await agendarCita({ doctorId, date });
    // Opcional: Redirigir a "Mis Citas" después de agendar con éxito
    if (!loading && !error && cita) {
      navigate('/misCitas'); // Redirige si la cita se agendó correctamente
    }
  };

  return (
    <section className="p-8 max-w-xl mx-auto min-h-screen bg-gray-50">
      <h2 className="text-4xl font-bold mb-8 text-center text-red-700">Agendar Cita Médica</h2>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="doctorSelect" className="block text-gray-700 text-lg font-medium mb-2">
              Selecciona un Doctor:
            </label>
            <select
              id="doctorSelect"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-base"
              value={doctorId}
              onChange={e => setDoctorId(e.target.value)}
              required
            >
              <option value="">-- Elige un doctor --</option>
              {doctores.map(doc => (
                <option key={doc._id} value={doc._id}>
                  Dr. {doc.name} — {doc.specialization}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dateInput" className="block text-gray-700 text-lg font-medium mb-2">
              Fecha y Hora de la Cita:
            </label>
            <input
              type="datetime-local"
              id="dateInput"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-base"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Agendando Cita...' : 'Agendar Cita'}
          </button>
        </form>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-6" role="alert">
            <strong className="font-bold">¡Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {cita && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-6" role="alert">
            <strong className="font-bold">¡Éxito!</strong>
            <span className="block sm:inline"> Cita agendada para el Dr. {cita.doctor?.name} el {new Date(cita.date).toLocaleString('es-GT', { dateStyle: 'full', timeStyle: 'short' })}.</span>
            <div className="mt-3 text-center">
              <button
                onClick={() => navigate('/mis-citas')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md"
              >
                Ver Mis Citas
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/HomePage')}
          className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <span className="mr-2">←</span> Volver al Inicio
        </button>
      </div>
    </section>
  );
};

export default AgendarCitaPage;