const express = require('express');
const router = express.Router();
const VentaController = require('../controllers/ventas.controller');

router.get('/', VentaController.getVentas);
router.get('/:id', VentaController.getVentaById);
router.post('/', VentaController.createVenta);
router.delete('/:id', VentaController.deleteVenta);

module.exports = router;
