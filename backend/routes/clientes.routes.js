const express = require('express');
const router = express.Router();
<<<<<<< Updated upstream
const clientesController = require('../controllers/cliente.controller');
router.get('/', clientesController.getClientes);
router.get('/:id', clientesController.getClienteById);
router.post('/', clientesController.createCliente);
router.put('/:id', clientesController.updateCliente);
router.delete('/:id', clientesController.deleteCliente);
module.exports = router;
=======
const db = require('../db/connection');

// Obtener todos los clientes
router.get('/', (req, res) => {
    db.query('SELECT * FROM clientes', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Obtener cliente por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        res.json(results[0]);
    });
});

// Crear cliente
router.post('/', (req, res) => {
    const { nombre, documento_identidad, direccion, telefono } = req.body;

    if (!nombre || !documento_identidad || !direccion || !telefono) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    db.query('INSERT INTO clientes (nombre, documento_identidad, direccion, telefono) VALUES (?, ?, ?, ?)',
        [nombre, documento_identidad, direccion, telefono], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, nombre, documento_identidad, direccion, telefono });
        });
});

// Actualizar cliente
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, documento_identidad, direccion, telefono } = req.body;

    if (!nombre || !documento_identidad || !direccion || !telefono) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    db.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Cliente no encontrado' });

        db.query('UPDATE clientes SET nombre=?, documento_identidad=?, direccion=?, telefono=? WHERE id=?',
            [nombre, documento_identidad, direccion, telefono, id], (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ mensaje: 'Cliente actualizado' });
            });
    });
});

// Eliminar cliente
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM clientes WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Cliente no encontrado' });

        db.query('DELETE FROM clientes WHERE id=?', [id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: 'Cliente eliminado' });
        });
    });
});

module.exports = router;
>>>>>>> Stashed changes
