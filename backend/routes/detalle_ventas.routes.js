const express = require('express');
const router = express.Router();
const DetalleController = require('../controllers/detalle_ventas.controller');

router.get('/', DetalleController.getDetalles);
router.get('/:id', DetalleController.getDetalleById);
router.post('/', DetalleController.createDetalle);
router.put('/:id', DetalleController.updateDetalle);
router.delete('/:id', DetalleController.deleteDetalle);

module.exports = router;
