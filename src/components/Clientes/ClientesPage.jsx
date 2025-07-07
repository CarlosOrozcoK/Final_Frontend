import React from 'react';
import useClientes from '../../shared/hooks/useClientes.jsx';
import { useNavigate } from 'react-router-dom';

const ClientesPage = () => {
  const { clientes, loading, error } = useClientes();
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-danger fw-bold">Lista de Clientes</h1>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Regresar al Inicio
        </button>
      </div>

      {loading && <p>Cargando clientes...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && clientes.length === 0 && (
        <p className="text-muted">No hay clientes registrados.</p>
      )}

      <div className="row">
        {clientes.map((cli) => (
          <div className="col-md-6 mb-4" key={cli._id}>
            <div className="card shadow-sm border border-light">
              <div className="card-body">
                <h5 className="card-title text-danger">{cli.name}</h5>
                <p className="card-text mb-1">
                  <strong>Username:</strong> {cli.username}
                </p>
                <p className="card-text mb-1">
                  <strong>DPI:</strong> {cli.dpi}
                </p>
                <p className="card-text mb-1">
                  <strong>Email:</strong> {cli.email}
                </p>
                <p className="card-text mb-1">
                  <strong>Teléfono:</strong> {cli.phone}
                </p>
                <p className="card-text">
                  <strong>Dirección:</strong> {cli.address}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientesPage;
