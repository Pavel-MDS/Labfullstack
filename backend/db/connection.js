const mysql = require('mysql2');
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '0000a',
database: 'db_ventas'
});
connection.connect((err) => {if (err) {
console.error('Error de conexión:', err);
return;
}
console.log('Conectado a MySQL');
});
module.exports = connection;