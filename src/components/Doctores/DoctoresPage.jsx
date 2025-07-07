import React from 'react';
import { useNavigate } from 'react-router-dom';
import useDoctores from '../../shared/hooks/useDoctores.jsx';

const DoctoresPage = () => {
  const { doctores, loading, error } = useDoctores();
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); 

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-danger fw-bold">Lista de Doctores</h1>

        <div className="d-flex gap-2">
          {role === 'OWNER_ROLE' && (
            <button
              className="btn btn-danger"
              onClick={() => navigate('/agregar-doctor')}
            >
              Agregar Doctor
            </button>
          )}

          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate('/HomePage')}
          >
            Volver a Inicio
          </button>
        </div>
      </div>

      {loading && <p>Cargando doctores...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && doctores.length === 0 && (
        <p className="text-muted">No hay doctores registrados.</p>
      )}

      <div className="row">
        {doctores.map((doc) => (
          <div className="col-md-6 mb-4" key={doc._id}>
            <div className="card shadow-sm border border-light">
              <div className="card-body">
                <h5 className="card-title text-danger">{doc.name}</h5>
                <p className="card-text mb-1">
                  <strong>Especialidad:</strong> {doc.specialization}
                </p>
                <p className="card-text mb-1">
                  <strong>Email:</strong> {doc.email}
                </p>
                <p className="card-text mb-1">
                  <strong>Teléfono:</strong> {doc.phone}
                </p>
                <p className="card-text">
                  <strong>Precio Consulta:</strong> Q{doc.consultationPrice}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctoresPage;
