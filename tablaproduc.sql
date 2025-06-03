use db_ventas;

CREATE TABLE productos (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
precio DECIMAL(10,2) NOT NULL,
stock INT NOT NULL
);

CREATE TABLE clientes (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100) NOT NULL,
documento_identidad VARCHAR(20) UNIQUE NOT NULL,
direccion VARCHAR(150),
telefono VARCHAR(20)
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE ventas (
id INT AUTO_INCREMENT PRIMARY KEY,
cliente_id INT NOT NULL,
usuario_id INT NOT NULL,
fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
total DECIMAL(10,2) NOT NULL,
FOREIGN KEY (cliente_id) REFERENCES clientes(id),
FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE detalle_ventas (
id INT AUTO_INCREMENT PRIMARY KEY,
venta_id INT NOT NULL,
producto_id INT NOT NULL,
cantidad INT NOT NULL,
precio_unitario DECIMAL(10,2) NOT NULL,
subtotal DECIMAL(10,2) NOT NULL,

FOREIGN KEY (venta_id) REFERENCES ventas(id),
FOREIGN KEY (producto_id) REFERENCES productos(id)
);