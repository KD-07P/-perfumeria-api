const Marca = require('../models/marcaModel');

// LISTAR TODAS LAS MARCAS
const listar = async (req, res) => {
    try {
        const datos = await Marca.obtenerMarcas();
        res.status(200).json(datos);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al consultar marcas'
        });
    }
};

// CONSULTAR MARCA POR ID
const consultar = async (req, res) => {
    try {
        const marca = await Marca.obtenerMarcaPorId(req.params.id);

        if (!marca) {
            return res.status(404).json({
                mensaje: 'Marca no encontrada'
            });
        }

        res.status(200).json(marca);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al consultar marca'
        });
    }
};

// CREAR MARCA
const crear = async (req, res) => {
    try {
        const { nombre, pais_origen } = req.body;

        if (!nombre || !nombre.trim()) {
            return res.status(400).json({
                mensaje: 'El nombre es obligatorio'
            });
        }

        const id = await Marca.crearMarca(
            nombre.trim(),
            pais_origen || null
        );

        res.status(201).json({
            mensaje: 'Marca creada correctamente',
            id_marca: id
        });
    } catch (error) {
        console.error(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensaje: 'La marca ya existe'
            });
        }

        res.status(500).json({
            mensaje: 'Error al crear marca'
        });
    }
};

// ACTUALIZAR MARCA
const actualizar = async (req, res) => {
    try {
        const { nombre, pais_origen } = req.body;

        if (!nombre || !nombre.trim()) {
            return res.status(400).json({
                mensaje: 'El nombre es obligatorio'
            });
        }

        const filas = await Marca.actualizarMarca(
            req.params.id,
            nombre.trim(),
            pais_origen || null
        );

        if (filas === 0) {
            const existe = await Marca.obtenerMarcaPorId(req.params.id);

            if (!existe) {
                return res.status(404).json({
                    mensaje: 'Marca no encontrada'
                });
            }
        }

        res.status(200).json({
            mensaje: 'Marca actualizada correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al actualizar marca'
        });
    }
};

// ELIMINAR MARCA
const eliminar = async (req, res) => {
    try {
        const filas = await Marca.eliminarMarca(req.params.id);

        if (filas === 0) {
            return res.status(404).json({
                mensaje: 'Marca no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Marca eliminada correctamente'
        });
    } catch (error) {
        console.error(error);

        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(409).json({
                mensaje: 'No se puede eliminar porque tiene productos relacionados'
            });
        }

        res.status(500).json({
            mensaje: 'Error al eliminar marca'
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