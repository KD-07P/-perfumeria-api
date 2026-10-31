const Detalle = require('../models/detallePedidoModel');

const obtenerTodos = async (req, res) => {
    try {
        const detalles = await Detalle.obtenerTodos();
        res.status(200).json(detalles);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar los detalles' });
    }
};

const obtenerPorId = async (req, res) => {
    try {
        const detalle = await Detalle.obtenerPorId(req.params.id);

        if (!detalle) {
            return res.status(404).json({ mensaje: 'Detalle no encontrado' });
        }

        res.status(200).json(detalle);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar el detalle' });
    }
};

const crear = async (req, res) => {
    try {
        const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;

        if (
            !id_pedido ||
            !id_producto ||
            !Number.isInteger(Number(cantidad)) ||
            Number(cantidad) <= 0 ||
            precio_unitario === undefined ||
            !Number.isFinite(Number(precio_unitario)) ||
            Number(precio_unitario) < 0
        ) {
            return res.status(400).json({
                mensaje: 'Envía un pedido, producto, cantidad y precio válidos'
            });
        }

        const id = await Detalle.crear(req.body);

        res.status(201).json({
            mensaje: 'Detalle creado correctamente',
            id_detalle: id
        });
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({
                mensaje: 'El pedido o el producto no existe'
            });
        }

        res.status(500).json({ mensaje: 'Error al crear el detalle' });
    }
};

const actualizar = async (req, res) => {
    try {
        const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;

        if (
            !id_pedido ||
            !id_producto ||
            !Number.isInteger(Number(cantidad)) ||
            Number(cantidad) <= 0 ||
            precio_unitario === undefined ||
            !Number.isFinite(Number(precio_unitario)) ||
            Number(precio_unitario) < 0
        ) {
            return res.status(400).json({
                mensaje: 'Envía un pedido, producto, cantidad y precio válidos'
            });
        }

        const filas = await Detalle.actualizar(req.params.id, req.body);

        if (filas === 0) {
            return res.status(404).json({ mensaje: 'Detalle no encontrado' });
        }

        res.status(200).json({ mensaje: 'Detalle actualizado correctamente' });
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({
                mensaje: 'El pedido o el producto no existe'
            });
        }

        res.status(500).json({ mensaje: 'Error al actualizar el detalle' });
    }
};

const eliminar = async (req, res) => {
    try {
        const filas = await Detalle.eliminar(req.params.id);

        if (filas === 0) {
            return res.status(404).json({ mensaje: 'Detalle no encontrado' });
        }

        res.status(200).json({ mensaje: 'Detalle eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el detalle' });
    }
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};