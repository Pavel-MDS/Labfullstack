import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Ventas.css'; // Usa los estilos específicos de ventas

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [nuevaVenta, setNuevaVenta] = useState({
    producto: '',
    cantidad: '',
    precioUnitario: ''
  });

  useEffect(() => {
    obtenerVentas();
  }, []);

  const obtenerVentas = async () => {
    const res = await axios.get('http://localhost:3001/api/ventas');
    setVentas(res.data);
  };

  const handleChange = (e) => {
    setNuevaVenta({ ...nuevaVenta, [e.target.name]: e.target.value });
  };

  const agregarVenta = async () => {
    const { producto, cantidad, precioUnitario } = nuevaVenta;
    if (!producto || !cantidad || !precioUnitario) return;

    const total = parseFloat(cantidad) * parseFloat(precioUnitario);
    await axios.post('http://localhost:3001/api/ventas', {
      ...nuevaVenta,
      total
    });

    setNuevaVenta({ producto: '', cantidad: '', precioUnitario: '' });
    obtenerVentas();
  };

  const eliminarVenta = async (id) => {
    await axios.delete(`http://localhost:3001/api/ventas/${id}`);
    obtenerVentas();
  };

  return (
    <div className="contenedor">
      <h2 className="titulo">Gestión de Ventas</h2>

      <div className="formulario">
        <input
          type="text"
          name="producto"
          placeholder="Producto"
          value={nuevaVenta.producto}
          onChange={handleChange}
        />
        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
          value={nuevaVenta.cantidad}
          onChange={handleChange}
        />
        <input
          type="number"
          name="precioUnitario"
          placeholder="Precio Unitario"
          value={nuevaVenta.precioUnitario}
          onChange={handleChange}
        />
        <button onClick={agregarVenta}>Añadir</button>
      </div>

      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id}>
              <td>{venta.id}</td>
              <td>{venta.producto}</td>
              <td>{venta.cantidad}</td>
              <td>{venta.precioUnitario}</td>
              <td>{venta.total}</td>
              <td>
                <button onClick={() => eliminarVenta(venta.id)} className="eliminar">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ventas;
