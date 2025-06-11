const DetalleVentaModel = require('../models/detalle_ventas.model');

// Obtener todos los detalles
const getDetalles = (req, res) => {
  DetalleVentaModel.obtenerDetallesVenta((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Obtener un detalle por ID
const getDetalleById = (req, res) => {
  DetalleVentaModel.obtenerDetallePorId(req.params.id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Detalle no encontrado' });
    res.json(rows[0]);
  });
};

// Crear nuevo detalle
const createDetalle = (req, res) => {
  DetalleVentaModel.crearDetalleVenta(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ mensaje: 'Detalle de venta creado', id: result.insertId });
  });
};

// Actualizar detalle
const updateDetalle = (req, res) => {
  DetalleVentaModel.actualizarDetalleVenta(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Detalle de venta actualizado' });
  });
};

// Eliminar detalle
const deleteDetalle = (req, res) => {
  DetalleVentaModel.eliminarDetalleVenta(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: 'Detalle de venta eliminado' });
  });
};

module.exports = {
  getDetalles,
  getDetalleById,
  createDetalle,
  updateDetalle,
  deleteDetalle
};
