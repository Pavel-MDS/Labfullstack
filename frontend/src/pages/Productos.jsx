import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Productos.css'; // Importa el archivo de estilos

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: '' });

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    const res = await axios.get('http://localhost:3001/api/productos');
    setProductos(res.data);
  };

  const handleChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const agregarProducto = async () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio) return;
    await axios.post('http://localhost:3001/api/productos', nuevoProducto);
    setNuevoProducto({ nombre: '', precio: '' });
    obtenerProductos();
  };

  const eliminarProducto = async (id) => {
    await axios.delete(`http://localhost:3001/api/productos/${id}`);
    obtenerProductos();
  };

  return (
    <div className="contenedor">
      <h2 className="titulo">Gestión de Productos</h2>

      <div className="formulario">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={nuevoProducto.nombre}
          onChange={handleChange}
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={handleChange}
        />
        <button onClick={agregarProducto}>Añadir</button>
      </div>

      <table className="tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.nombre}</td>
              <td>{prod.precio}</td>
              <td>
                <button onClick={() => eliminarProducto(prod.id)} className="eliminar">
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

export default Productos;
