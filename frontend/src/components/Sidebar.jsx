import React from 'react';

const Sidebar = () => {
  return (
    <aside style={{
      width: '200px',
      backgroundColor: '#f0f0f0',
      padding: '1rem',
      height: '100%',
    }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><a href="/">Inicio</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/clientes">Clientes</a></li>
          <li><a href="/productos">Productos</a></li>
          <li><a href="/ventas">Ventas</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
