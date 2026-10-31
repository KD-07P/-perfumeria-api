const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');
const categoriaRoutes = require('./routes/categoriaRoutes');
const marcaRoutes = require('./routes/marcaRoutes');
const productoRoutes = require('./routes/productoRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const detallePedidoRoutes = require('./routes/detallePedidoRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/categorias', categoriaRoutes);
app.use('/api/marcas', marcaRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/detalle-pedido', detallePedidoRoutes);

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de Perfumeria funcionando correctamente'
    });
});

app.get('/api/estado', async (req, res) => {
    try {
        const [resultado] = await db.query(
            'SELECT DATABASE() AS base_datos'
        );

        res.json({
            mensaje: 'Conexion con MySQL exitosa',
            base_datos: resultado[0].base_datos
        });
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            mensaje: 'Error al conectar con MySQL'
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});