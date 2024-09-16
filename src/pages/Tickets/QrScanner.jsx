import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QrScanner = () => {
  const [qrCodeData, setQrCodeData] = useState(null);
  const [validationResult, setValidationResult] = useState('');

  const handleScan = (data) => {
    if (data) {
      setQrCodeData(data); // Guardamos el QR escaneado
      validateQrCode(data); // Validamos el QR
    }
  };

  const handleError = (err) => {
    console.error('Error scanning QR Code:', err);
  };

  const validateQrCode = async (qrData) => {
    try {
      const response = await axios.post('/api/myTicket/validateQR', {
        qrCodeData: qrData,
      });
      setValidationResult(response.data.message);
    } catch (error) {
      console.error('Error validating QR Code:', error);
      setValidationResult('QR Code validation failed');
    }
  };

  return (
    <div>
      <h1>Scan Your Ticket</h1>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            handleScan(result?.text);
          }
          if (error) {
            handleError(error);
          }
        }}
        constraints={{ facingMode: 'environment' }}
        style={{ width: '100%' }}
      />
      {qrCodeData && <p>QR Code Data: {qrCodeData}</p>}
      {validationResult && <p>{validationResult}</p>}
    </div>
  );
};

export default QrScanner;