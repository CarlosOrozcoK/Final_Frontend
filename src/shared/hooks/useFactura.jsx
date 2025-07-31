import { useState } from 'react';
import apiClient from '../../services/api';

const useFactura = () => {
  const [loading, setLoading] = useState(false);

  const generarFactura = async (appointmentId, paymentId) => {
  try {
    setLoading(true);

    const dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();

    console.log('Datos para generar factura:', { appointmentId, paymentId, dueDate });

    const response = await apiClient.post(
      '/invoices/crear',
      { appointmentId, paymentId, dueDate },
      { responseType: 'blob' }
    );

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: 'application/pdf' })
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'factura.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      const msg = error.response?.data?.msg || 'Error al generar la factura';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return { generarFactura, loading };
};

export default useFactura;
