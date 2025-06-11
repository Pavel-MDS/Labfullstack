const db = require('../db/connection');

// Obtener todos los detalles de venta
const obtenerDetallesVenta = (callback) => {
  const sql = `
    SELECT d.id, d.venta_id, d.producto_id, p.nombre AS producto,
           d.cantidad, d.precio_unitario, d.subtotal
    FROM  d
    JOIN productos p ON d.producto_id = p.id
    ORDER BY d.venta_id DESC
  `;
  db.query(sql, callback);
};

// Obtener detalles por ID de detalle
const obtenerDetallePorId = (id, callback) => {
  const sql = `
    SELECT d.id, d.venta_id, d.producto_id, p.nombre AS producto,
           d.cantidad, d.precio_unitario, d.subtotal
    FROM detalle_ventas d
    JOIN productos p ON d.producto_id = p.id
    WHERE d.id = ?
  `;
  db.query(sql, [id], callback);
};

// Crear un nuevo detalle de venta
const crearDetalleVenta = (datos, callback) => {
  const { venta_id, producto_id, cantidad, precio_unitario, subtotal } = datos;
  const sql = `
    INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario, subtotal)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [venta_id, producto_id, cantidad, precio_unitario, subtotal], callback);
};

// Actualizar un detalle de venta
const actualizarDetalleVenta = (id, datos, callback) => {
  const { producto_id, cantidad, precio_unitario, subtotal } = datos;
  const sql = `
    UPDATE detalle_ventas 
    SET producto_id = ?, cantidad = ?, precio_unitario = ?, subtotal = ?
    WHERE id = ?
  `;
  db.query(sql, [producto_id, cantidad, precio_unitario, subtotal, id], callback);
};

// Eliminar un detalle de venta
const eliminarDetalleVenta = (id, callback) => {
  const sql = `DELETE FROM detalle_ventas WHERE id = ?`;
  db.query(sql, [id], callback);
};

module.exports = {
  obtenerDetallesVenta,
  obtenerDetallePorId,
  crearDetalleVenta,
  actualizarDetalleVenta,
  eliminarDetalleVenta
};
