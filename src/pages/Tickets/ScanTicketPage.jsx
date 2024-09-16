import React from 'react';
import QrScanner from './QrScanner'; // Ruta hacia el componente que creaste

const ScanTicketPage = () => {
  return (
    <div>
      <h2>Scan Your Ticket</h2>
      <QrScanner />
    </div>
  );
};

export default ScanTicketPage;