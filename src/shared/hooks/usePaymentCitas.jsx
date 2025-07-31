import { useState, useEffect } from 'react';
import { crearPagoCita, obtenerPagosPorCita, actualizarEstadoPago } from '../../services/api';

const usePaymentCitas = (citaId) => {
  const [cita, setCita] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Obtener detalles de la cita
  const fetchCita = async () => {
    try {
      const response = await fetch(`/appointments/${citaId}`);
      const data = await response.json();
      setCita(data.appointment);
    } catch (err) {
      setError('Error al cargar la cita');
    }
  };

  // Obtener pagos existentes para esta cita
  const fetchPayments = async () => {
    try {
      const response = await obtenerPagosPorCita(citaId);
      setPayments(response.payments);
    } catch (err) {
      // No hay pagos aún o error menor, no rompemos el flujo
    }
  };

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([fetchCita(), fetchPayments()]);
      setLoading(false);
    };
    if (citaId) {
      cargarDatos();
    }
  }, [citaId]);

  // Función para crear y confirmar pago
  const realizarPago = async ({ method = 'card', transactionId = `TXN-${Date.now()}` }) => {
    try {
      setError(null);
      setPaymentStatus('loading');

      // Crear pago
      const data = await crearPagoCita({
        appointmentId: citaId,
        amount: cita.price,
        method,
        transactionId,
      });

      // Actualizar estado a 'paid'
      const pagoActualizado = await actualizarEstadoPago(data.payment._id, 'paid');

      // Actualizar estado local con el pago actualizado
      setPayments((prev) => [...prev, pagoActualizado.payment]);

      setPaymentStatus('success');
      return pagoActualizado.payment;
    } catch (err) {
      const msg = err.msg || 'Error al realizar el pago';
      setError(msg);
      setPaymentStatus('error');
      throw new Error(msg);
    }
  };

  return {
    cita,
    payments,
    loading,
    error,
    paymentStatus,
    realizarPago,
  };
};

export default usePaymentCitas;
