import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMisCitas from '../../shared/hooks/useMisCitas';
import apiClient from '../../services/api';

const MisCitasPage = () => {
  const { citas: fetchedCitas, loading, error, refetch } = useMisCitas();
  const [currentCitas, setCurrentCitas] = useState([]); 

  useEffect(() => {
    if (fetchedCitas) {
      setCurrentCitas(fetchedCitas);
    }
  }, [fetchedCitas]);
 
  
  const navigate = useNavigate();

  const handleCancelCita = async (citaId) => {
    const isConfirmed = window.confirm('¿Estás seguro de que quieres cancelar esta cita? Esta acción no se puede deshacer.');

    if (isConfirmed) {
      try {
        await apiClient.delete(`/appointments/${citaId}`);
        setCurrentCitas(prevCitas => prevCitas.filter(cita => cita._id !== citaId));
        alert('La cita ha sido cancelada exitosamente.'); 
        refetch(); 
      } catch (err) {
        console.error('Error reportado por la API al cancelar:', err);
        const statusCode = err.response?.status;
        const backendMessage = err.response?.data?.message;
        
        if (statusCode === 400 || statusCode === 409) {
          setCurrentCitas(prevCitas => prevCitas.filter(cita => cita._id !== citaId)); 
          alert('La cita ha sido cancelada exitosamente.'); 
          refetch(); 
        } else {
          const errorMessage = backendMessage || 'Hubo un error al cancelar la cita. Por favor, inténtalo de nuevo.';
          alert(errorMessage); 
        }
      }
    }
  };

  return (
    <section className="p-8 max-w-6xl mx-auto min-h-screen bg-gray-50">
      <h2 className="text-4xl font-bold mb-8 text-center text-red-700">Mis Citas</h2>

      <div className="mb-8 text-center">
        <button
          onClick={() => navigate('/agendar-cita')}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-md transform hover:scale-105 inline-flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Agendar Nueva Cita
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-48">
          <p className="text-xl text-gray-600 animate-pulse">Cargando citas...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">¡Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {!loading && !error && currentCitas.length === 0 && (
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <p className="text-xl text-gray-700 mb-4">No tienes citas agendadas en este momento.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentCitas.map((cita) => ( 
          <div
            key={cita._id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-t-4 border-red-600"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-3 border-b pb-2 border-red-100">
              Dr. {cita.doctor?.name || 'Doctor Desconocido'}
            </h3>
            <p className="text-gray-700 mb-2 flex items-center">
              <span className="material-icons-outlined text-red-500 mr-2">medical_services</span>
              <span className="font-medium">{cita.doctor?.specialization || 'Especialidad no definida'}</span>
            </p>
            <p className="text-gray-700 mb-2 flex items-center">
              <span className="material-icons-outlined text-red-500 mr-2">event</span>
              Fecha: <span className="font-medium ml-1">{new Date(cita.date).toLocaleString('es-GT', { dateStyle: 'full', timeStyle: 'short' })}</span>
            </p>
            <p className="text-gray-700 mb-2 flex items-center">
              <span className="material-icons-outlined text-red-500 mr-2">payments</span>
              Precio: <span className="font-medium ml-1">Q{cita.price?.toFixed(2) || 'N/A'}</span>
            </p>
            <p className="text-gray-700 flex items-center">
              <span className="material-icons-outlined text-red-500 mr-2">info</span>
              Estado: <span className={`font-bold ml-1 ${cita.status === 'confirmed' ? 'text-green-600' : cita.status === 'pending' ? 'text-yellow-600' : 'text-red-600'} capitalize`}>{cita.status || 'Desconocido'}</span>
            </p>

            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => handleCancelCita(cita._id)}
                disabled={cita.status === 'completed' || cita.status === 'cancelled'}
                className={`text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md flex items-center gap-1
                  ${cita.status === 'completed' || cita.status === 'cancelled' ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1
                  0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {cita.status === 'cancelled' ? 'Cita Cancelada' : 'Cancelar Cita'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
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

export default MisCitasPage;