import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import usePaymentCitas from '../../shared/hooks/usePaymentCitas';

const PaymentPage = () => {
  const { citaId } = useParams();
  const { 
    cita, 
    payments, 
    loading, 
    error, 
    paymentStatus, 
    realizarPago 
  } = usePaymentCitas(citaId);

  const [method, setMethod] = useState('card');
  const [paymentId, setPaymentId] = useState(null);

  useEffect(() => {
    if (payments.length > 0) {
      // Si ya hay pagos, guardamos el último pago (el más reciente)
      setPaymentId(payments[payments.length - 1]._id);
    }
  }, [payments]);

  const handleSubmit = async () => {
    try {
      const pago = await realizarPago({ method });
      alert('Pago realizado exitosamente');
      setPaymentId(pago._id);
    } catch (err) {
      alert(err.message || 'Error al procesar el pago');
    }
  };

  if (loading) return <p className="text-center mt-20">Cargando...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;
  if (!cita) return <p className="text-center mt-20">Cita no encontrada</p>;

  return (
    <section className="max-w-xl mx-auto p-6 bg-white shadow-md mt-10 rounded-xl">
      <h2 className="text-2xl font-bold text-center text-red-700 mb-6">Pagar Cita</h2>
      <p><strong>Doctor:</strong> {cita.doctor?.name || 'No especificado'}</p>
      <p><strong>Especialidad:</strong> {cita.doctor?.specialization || 'N/A'}</p>
      <p><strong>Fecha:</strong> {new Date(cita.date).toLocaleString('es-GT')}</p>
      <p><strong>Precio:</strong> Q{cita.price?.toFixed(2)}</p>

      <div className="mt-4">
        <label className="block mb-1 font-semibold">Método de pago:</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full border rounded px-3 py-2"
          disabled={paymentStatus === 'loading' || paymentId} // Deshabilita si ya pagó o está pagando
        >
          <option value="card">Tarjeta</option>
          <option value="cash">Efectivo</option>
          <option value="transfer">Transferencia</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        disabled={paymentStatus === 'loading' || paymentId}
        className={`mt-6 w-full font-semibold py-3 rounded-lg ${
          paymentStatus === 'loading' || paymentId 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {paymentStatus === 'loading' ? 'Procesando Pago...' : 'Confirmar Pago'}
      </button>

      {/* Mostrar botón para generar factura solo si ya se realizó el pago */}
      {paymentId && (
        <button
          onClick={() => alert('Aquí llama a la función para generar factura con citaId y paymentId')}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
        >
          Generar Factura
        </button>
      )}
    </section>
  );
};

export default PaymentPage;
