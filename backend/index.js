const express = require('express');
const cors = require('cors');
const app = express();
const productosRoutes = require('./routes/productos.routes');
const clientesRoutes = require('./routes/clientes.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const ventasRoutes = require('./routes/ventas.routes');
const detalleVentasRoutes = require('./routes/detalle_ventas.routes');
app.use('/api/detalle-ventas', detalleVentasRoutes);


app.use(cors());
app.use(express.json());
app.use('/api/productos', productosRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/ventas', ventasRoutes);

app.get('/', (req, res) => {
    res.send('API Sistema de Ventas');
});

app.listen(3001, () => {
    console.log('Servidor en http://localhost:3001');
});