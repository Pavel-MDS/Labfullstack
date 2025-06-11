const UsuarioModel = require('../models/usuario.model');

const getUsuarios = (req, res) => {
  UsuarioModel.obtenerUsuarios((err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
};

const getUsuarioById = (req, res) => {
  UsuarioModel.obtenerUsuarioPorId(req.params.id, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(rows[0]);
  });
};

const createUsuario = (req, res) => {
  UsuarioModel.crearUsuario(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ mensaje: 'Usuario creado', id: result.insertId });
  });
};

const updateUsuario = (req, res) => {
  UsuarioModel.actualizarUsuario(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Usuario actualizado' });
  });
};

const deleteUsuario = (req, res) => {
  UsuarioModel.eliminarUsuario(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Usuario eliminado' });
  });
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
