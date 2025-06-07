const db = require('../db/connection');

// Obtener todas las ventas
const obtenerVentas = (callback) => {
  const sql = `
    SELECT v.id, v.fecha, v.total,
           c.nombre AS cliente, u.nombre AS usuario
    FROM ventas v
    JOIN clientes c ON v.cliente_id = c.id
    JOIN usuarios u ON v.usuario_id = u.id
    ORDER BY v.fecha DESC
  `;
  db.query(sql, callback);
};

// Obtener venta por ID (con detalles)
const obtenerVentaPorId = (id, callback) => {
  const sql = `
    SELECT v.id, v.fecha, v.total,
           c.nombre AS cliente, u.nombre AS usuario,
           d.producto_id, p.nombre AS producto, d.cantidad, d.precio_unitario, d.subtotal
    FROM ventas v
    JOIN clientes c ON v.cliente_id = c.id
    JOIN usuarios u ON v.usuario_id = u.id
    JOIN detalle_ventas d ON d.venta_id = v.id
    JOIN productos p ON p.id = d.producto_id
    WHERE v.id = ?
  `;
  db.query(sql, [id], callback);
};

// Crear nueva venta con sus detalles
const crearVentaConDetalles = (venta, callback) => {
  const { cliente_id, usuario_id, total, detalles } = venta;

  const ventaSql = `INSERT INTO ventas (cliente_id, usuario_id, total) VALUES (?, ?, ?)`;

  db.query(ventaSql, [cliente_id, usuario_id, total], (err, result) => {
    if (err) return callback(err);

    const ventaId = result.insertId;

    const detalleSql = `
      INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario, subtotal)
      VALUES ?
    `;

    const detalleValores = detalles.map(d => [
      ventaId,
      d.producto_id,
      d.cantidad,
      d.precio_unitario,
      d.subtotal
    ]);

    db.query(detalleSql, [detalleValores], (err2) => {
      if (err2) return callback(err2);
      callback(null, { insertId: ventaId });
    });
  });
};

// Eliminar venta y sus detalles
const eliminarVenta = (id, callback) => {
  const borrarDetallesSql = `DELETE FROM detalle_ventas WHERE venta_id = ?`;
  const borrarVentaSql = `DELETE FROM ventas WHERE id = ?`;

  db.query(borrarDetallesSql, [id], (err) => {
    if (err) return callback(err);

    db.query(borrarVentaSql, [id], callback);
  });
};

module.exports = {
  obtenerVentas,
  obtenerVentaPorId,
  crearVentaConDetalles,
  eliminarVenta
};
