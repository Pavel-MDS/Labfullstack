const db = require('../db/connection');

// Obtener todos los usuarios
const obtenerUsuarios = (callback) => {
  db.query('SELECT * FROM usuarios', callback);
};

// Obtener usuario por ID
const obtenerUsuarioPorId = (id, callback) => {
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], callback);
};

// Crear usuario
const crearUsuario = (datos, callback) => {
  const { nombre, correo, password } = datos;
  db.query(
    'INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)',
    [nombre, correo, password],
    callback
  );
};

// Actualizar usuario
const actualizarUsuario = (id, datos, callback) => {
  const { nombre, correo, password } = datos;
  db.query(
    'UPDATE usuarios SET nombre = ?, correo = ?, password = ? WHERE id = ?',
    [nombre, correo, password, id],
    callback
  );
};

// Eliminar usuario
const eliminarUsuario = (id, callback) => {
  db.query('DELETE FROM usuarios WHERE id = ?', [id], callback);
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
