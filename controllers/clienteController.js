const Cliente = require('../models/clienteModel');

// LISTAR CLIENTES
const listar = async (req, res) => {
    try {
        const datos = await Cliente.obtenerClientes();
        res.status(200).json(datos);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al consultar clientes'
        });
    }
};

// CONSULTAR CLIENTE POR ID
const consultar = async (req, res) => {
    try {
        const cliente = await Cliente.obtenerClientePorId(req.params.id);

        if (!cliente) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.status(200).json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al consultar cliente'
        });
    }
};

// CREAR CLIENTE
const crear = async (req, res) => {
    try {
        const { nombre, apellido, correo, telefono } = req.body;

        if (!nombre || !nombre.trim() || !apellido || !apellido.trim()) {
            return res.status(400).json({
                mensaje: 'El nombre y apellido son obligatorios'
            });
        }

        const id = await Cliente.crearCliente({
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            correo: correo || null,
            telefono: telefono || null
        });

        res.status(201).json({
            mensaje: 'Cliente creado correctamente',
            id_cliente: id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al crear cliente'
        });
    }
};

// ACTUALIZAR CLIENTE
const actualizar = async (req, res) => {
    try {
        const { nombre, apellido, correo, telefono } = req.body;

        if (!nombre || !nombre.trim() || !apellido || !apellido.trim()) {
            return res.status(400).json({
                mensaje: 'El nombre y apellido son obligatorios'
            });
        }

        const filas = await Cliente.actualizarCliente(req.params.id, {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            correo: correo || null,
            telefono: telefono || null
        });

        if (filas === 0) {
            const existe = await Cliente.obtenerClientePorId(req.params.id);

            if (!existe) {
                return res.status(404).json({
                    mensaje: 'Cliente no encontrado'
                });
            }
        }

        res.status(200).json({
            mensaje: 'Cliente actualizado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al actualizar cliente'
        });
    }
};

// ELIMINAR CLIENTE
const eliminar = async (req, res) => {
    try {
        const filas = await Cliente.eliminarCliente(req.params.id);

        if (filas === 0) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Cliente eliminado correctamente'
        });
    } catch (error) {
        console.error(error);

        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(409).json({
                mensaje: 'No se puede eliminar porque tiene pedidos relacionados'
            });
        }

        res.status(500).json({
            mensaje: 'Error al eliminar cliente'
        });
    }
};

module.exports = {
    listar,
    consultar,
    crear,
    actualizar,
    eliminar
};