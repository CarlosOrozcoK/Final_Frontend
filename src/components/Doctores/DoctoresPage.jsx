import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDoctores from '../../shared/hooks/useDoctores.jsx';
import apiClient from '../../services/api.jsx';

const DoctoresPage = () => {
  const { doctores, loading, error, refetch } = useDoctores();
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    email: '',
    phone: '',
    consultationPrice: ''
  });

  const openEditModal = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData(doctor);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await apiClient.put(`/doctors/${selectedDoctor._id}`, formData);
      setShowModal(false);
      refetch();
    } catch (error) {
      console.error('Error al actualizar doctor:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Estás seguro de que quieres eliminar este doctor?');
    if (!confirm) return;

    try {
      await apiClient.delete(`/doctors/${id}`);
      refetch();
    } catch (error) {
      console.error('Error al eliminar doctor:', error);
    }
  };

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
          <button className="btn btn-outline-secondary" onClick={() => navigate('/HomePage')}>
            Volver a Inicio
          </button>
        </div>
      </div>

      {loading && <p>Cargando doctores...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && doctores.length === 0 && <p>No hay doctores registrados.</p>}

      <div className="row">
        {doctores.map((doc) => (
          <div className="col-md-6 mb-4" key={doc._id}>
            <div className="card shadow-sm border border-light">
              <div className="card-body">
                <h5 className="card-title text-danger">{doc.name}</h5>
                <p><strong>Especialidad:</strong> {doc.specialization}</p>
                <p><strong>Email:</strong> {doc.email}</p>
                <p><strong>Teléfono:</strong> {doc.phone}</p>
                <p><strong>Precio Consulta:</strong> Q{doc.consultationPrice}</p>

                {role === 'OWNER_ROLE' && (
                  <div className="d-flex gap-2 mt-3">
                    <button className="btn btn-outline-primary btn-sm" onClick={() => openEditModal(doc)}>
                      Editar
                    </button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(doc._id)}>
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Doctor</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {['name', 'specialization', 'email', 'phone', 'consultationPrice'].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                      type={field === 'consultationPrice' ? 'number' : 'text'}
                      className="form-control"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={handleUpdate}>Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctoresPage;
