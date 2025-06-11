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

// Crear nueva venta con validaciones y retorno de detalles
const crearVentaConDetalles = (venta, callback) => {
  const { cliente_id, usuario_id, total, detalles } = venta;

  if (!Array.isArray(detalles) || detalles.length === 0) {
    return callback(new Error('La venta debe contener al menos un detalle.'));
  }

  // Validar existencia del cliente y usuario antes de continuar
  const validarSql = `
    SELECT 
      (SELECT COUNT(*) FROM clientes WHERE id = ?) AS clienteValido,
      (SELECT COUNT(*) FROM usuarios WHERE id = ?) AS usuarioValido
  `;

  db.query(validarSql, [cliente_id, usuario_id], (err, results) => {
    if (err) return callback(err);

    const [validacion] = results;
    if (!validacion.clienteValido || !validacion.usuarioValido) {
      return callback(new Error('Cliente o usuario no válido.'));
    }

    const ventaSql = `INSERT INTO ventas (cliente_id, usuario_id, total) VALUES (?, ?, ?)`;

    db.query(ventaSql, [cliente_id, usuario_id, total], (err2, result) => {
      if (err2) return callback(err2);

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

      db.query(detalleSql, [detalleValores], (err3) => {
        if (err3) return callback(err3);

        // Retornar la venta recién creada con sus detalles
        obtenerVentaPorId(ventaId, callback);
      });
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
