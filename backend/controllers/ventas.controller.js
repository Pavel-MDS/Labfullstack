const VentaModel = require('../models/venta.model');

// Obtener todas las ventas
const getVentas = (req, res) => {
  VentaModel.obtenerVentas((err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};

// Obtener venta por ID
const getVentaById = (req, res) => {
  VentaModel.obtenerVentaPorId(req.params.id, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Venta no encontrada' });
    res.json(rows[0]);
  });
};

// Crear nueva venta (con detalles)
const createVenta = (req, res) => {
  const { cliente_id, usuario_id, total, detalles } = req.body;

  VentaModel.crearVentaConDetalles({ cliente_id, usuario_id, total, detalles }, (err, resultado) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ mensaje: 'Venta creada correctamente', venta_id: resultado.insertId });
  });
};

// Eliminar venta
const deleteVenta = (req, res) => {
  VentaModel.eliminarVenta(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Venta eliminada correctamente' });
  });
};

module.exports = {
  getVentas,
  getVentaById,
  createVenta,
  deleteVenta,
};
