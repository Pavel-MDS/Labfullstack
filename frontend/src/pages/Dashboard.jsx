import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h2>Bienvenido al Sistema</h2>
      <p>Resumen general del sistema o accesos rápidos.</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ backgroundColor: '#e0e0e0', padding: '1rem', flex: 1 }}>Total Clientes</div>
        <div style={{ backgroundColor: '#e0e0e0', padding: '1rem', flex: 1 }}>Total Productos</div>
        <div style={{ backgroundColor: '#e0e0e0', padding: '1rem', flex: 1 }}>Total Ventas</div>
      </div>
    </div>
  );
};

export default Dashboard;
