import React, { useState } from 'react';
import useAgregarDoctor from '../../shared/hooks/useAgregarDoctor.jsx';
import { useNavigate } from 'react-router-dom';

const AgregarDoctorPage = () => {
  const { agregarDoctor, loading, error } = useAgregarDoctor();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    specialization: '',
    consultationPrice: ''
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await agregarDoctor(formData);
    if (result.success) {
      navigate('/doctores'); // redirigir a lista de doctores
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-danger fw-bold">Agregar Doctor</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Teléfono</label>
          <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Especialidad</label>
          <input type="text" className="form-control" name="specialization" value={formData.specialization} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Precio Consulta (Q)</label>
          <input type="number" className="form-control" name="consultationPrice" value={formData.consultationPrice} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-danger" disabled={loading}>
          {loading ? 'Agregando...' : 'Agregar Doctor'}
        </button>
      </form>
    </div>
  );
};

export default AgregarDoctorPage;
