const express = require('express');
const router = express.Router();
const ProductoController = require('../controllers/productos.controller');

router.get('/', ProductoController.getProductos);
router.get('/:id', ProductoController.getProductoById);
router.post('/', ProductoController.createProducto);
router.put('/:id', ProductoController.updateProducto);
router.delete('/:id', ProductoController.deleteProducto);

module.exports = router;