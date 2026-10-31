const Pedido = require('../models/pedidoModel');

const obtenerTodos = async (req, res) => {
    try {
        const pedidos = await Pedido.obtenerTodos();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar pedidos' });
    }
};

const obtenerPorId = async (req, res) => {
    try {
        const pedido = await Pedido.obtenerPorId(req.params.id);

        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar el pedido' });
    }
};

const crear = async (req, res) => {
    try {
        const { total, id_cliente } = req.body;

        if (total === undefined || Number(total) < 0 || !id_cliente) {
            return res.status(400).json({
                mensaje: 'Debes enviar un total válido y el id del cliente'
            });
        }

        const id = await Pedido.crear(req.body);
        res.status(201).json({
            mensaje: 'Pedido creado correctamente',
            id_pedido: id
        });
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ mensaje: 'El cliente no existe' });
        }

        res.status(500).json({ mensaje: 'Error al crear el pedido' });
    }
};

const actualizar = async (req, res) => {
    try {
        const { total, id_cliente, estado, fecha_pedido } = req.body;

        if (total === undefined || Number(total) < 0 || !id_cliente || !estado) {
            return res.status(400).json({
                mensaje: 'Debes enviar total, id_cliente y estado válidos'
            });
        }

        const cantidad = await Pedido.actualizar(req.params.id, {
            total,
            id_cliente,
            estado,
            fecha_pedido
        });

        if (cantidad === 0) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        res.status(200).json({ mensaje: 'Pedido actualizado correctamente' });
    } catch (error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(400).json({ mensaje: 'El cliente no existe' });
        }

        res.status(500).json({ mensaje: 'Error al actualizar el pedido' });
    }
};

const eliminar = async (req, res) => {
    try {
        const cantidad = await Pedido.eliminar(req.params.id);

        if (cantidad === 0) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }

        res.status(200).json({ mensaje: 'Pedido eliminado correctamente' });
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(409).json({
                mensaje: 'No se puede eliminar: el pedido tiene detalles asociados'
            });
        }

        res.status(500).json({ mensaje: 'Error al eliminar el pedido' });
    }
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};