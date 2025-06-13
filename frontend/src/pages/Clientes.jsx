import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cliente.css'; // Asegúrate de crear este archivo con estilos si lo necesitas

const Cliente = () => {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: '', correo: '' });

  useEffect(() => {
    obtenerClientes();
  }, []);

  const obtenerClientes = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/clientes');
      setClientes(res.data);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  const handleChange = (e) => {
    setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });
  };

  const agregarCliente = async () => {
    if (!nuevoCliente.nombre || !nuevoCliente.correo) return;
    try {
      await axios.post('http://localhost:3001/api/clientes', nuevoCliente);
      setNuevoCliente({ nombre: '', correo: '' });
      obtenerClientes();
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  };

  const eliminarCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/clientes/${id}`);
      obtenerClientes();
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  return (
    <div className="contenedor">
      <h2 className="titulo">Gestión de Clientes</h2>

      <div className="formulario">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoCliente.nombre}
          onChange={handleChange}
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={nuevoCliente.correo}
          onChange={handleChange}
        />
        <button onClick={agregarCliente}>Añadir</button>
      </div>

      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.correo}</td>
              <td>
                <button onClick={() => eliminarCliente(cliente.id)} className="eliminar">
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

export default Cliente;
