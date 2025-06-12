const db = require('../db/connection');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
const obtenerUsuarios = (callback) => {
  db.query('SELECT * FROM usuarios', callback);
};

// Obtener usuario por ID
const obtenerUsuarioPorId = (id, callback) => {
  if (!Number.isInteger(id) || id <= 0) {
    return callback(new Error('ID inválido'));
  }
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], callback);
};

// Crear usuario
const crearUsuario = (datos, callback) => {
  const { nombre, correo, password } = datos;

  if (!nombre || !correo || !password) {
    return callback(new Error('Faltan datos obligatorios'));
  }

  if (!/\S+@\S+\.\S+/.test(correo)) {
    return callback(new Error('Correo inválido'));
  }

  if (password.length < 6) {
    return callback(new Error('La contraseña debe tener al menos 6 caracteres'));
  }

  // Verifica si el correo ya existe
  db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (err, results) => {
    if (err) return callback(err);
    if (results.length > 0) return callback(new Error('El correo ya está registrado'));

    // Hashear la contraseña
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return callback(err);

      db.query(
        'INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)',
        [nombre, correo, hash],
        callback
      );
    });
  });
};

// Actualizar usuario
const actualizarUsuario = (id, datos, callback) => {
  if (!Number.isInteger(id) || id <= 0) {
    return callback(new Error('ID inválido'));
  }

  const { nombre, correo, password } = datos;

  if (!nombre || !correo || !password) {
    return callback(new Error('Faltan datos obligatorios'));
  }

  if (!/\S+@\S+\.\S+/.test(correo)) {
    return callback(new Error('Correo inválido'));
  }

  if (password.length < 6) {
    return callback(new Error('La contraseña debe tener al menos 6 caracteres'));
  }

  // Hashear la nueva contraseña
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return callback(err);

    db.query(
      'UPDATE usuarios SET nombre = ?, correo = ?, password = ? WHERE id = ?',
      [nombre, correo, hash, id],
      callback
    );
  });
};

// Eliminar usuario
const eliminarUsuario = (id, callback) => {
  if (!Number.isInteger(id) || id <= 0) {
    return callback(new Error('ID inválido'));
  }

  db.query('DELETE FROM usuarios WHERE id = ?', [id], callback);
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
