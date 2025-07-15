import React, { useState, useEffect } from 'react';
import useAgendarCita from '../../shared/hooks/useAgendarCita.jsx';
import { getDoctors } from '../../services/api.jsx';

const AgendarCitaPage = () => {
  const { agendarCita, cita, loading, error } = useAgendarCita();
  const [doctores, setDoctores] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchDoctores = async () => {
      try {
        const { doctors } = await getDoctors();
        setDoctores(doctors);
      } catch {
        // maneja error de carga de doctores
      }
    };
    fetchDoctores();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    agendarCita({ doctorId, date });
  };

  return (
    <div className="container py-5">
      <h1 className="text-danger fw-bold mb-4">Agendar Cita Médica</h1>
      <form onSubmit={handleSubmit}>
        <select
          className="form-select mb-3"
          value={doctorId}
          onChange={e => setDoctorId(e.target.value)}
          required
        >
          <option value="">Selecciona un doctor</option>
          {doctores.map(doc => (
            <option key={doc._id} value={doc._id}>
              {doc.name} — {doc.specialization}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          className="form-control mb-3"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        />
        <button className="btn btn-danger" disabled={loading}>
          {loading ? 'Agendando...' : 'Agendar Cita'}
        </button>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {cita && (
        <div className="alert alert-success mt-3">
          Cita agendada para {new Date(cita.date).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default AgendarCitaPage;
