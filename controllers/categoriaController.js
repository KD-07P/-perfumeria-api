const Categoria = require('../models/categoriaModel');

// Listar categorías
const listar = async (req, res) => {
    try {
        const datos = await Categoria.obtenerCategorias();
        res.status(200).json(datos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar categorías' });
    }
};

// Consultar categoría
const consultar = async (req, res) => {
    try {
        const categoria = await Categoria.obtenerCategoriaPorId(req.params.id);

        if (!categoria) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }

        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar categoría' });
    }
};

// Crear categoría
const crear = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre || !nombre.trim()) {
            return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
        }

        const id = await Categoria.crearCategoria(nombre.trim(), descripcion || null);

        res.status(201).json({
            mensaje: 'Categoría creada correctamente',
            id_categoria: id
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ mensaje: 'La categoría ya existe' });
        }

        res.status(500).json({ mensaje: 'Error al crear categoría' });
    }
};

// Actualizar categoría
const actualizar = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre || !nombre.trim()) {
            return res.status(400).json({ mensaje: 'El nombre es obligatorio' });
        }

        const filas = await Categoria.actualizarCategoria(
            req.params.id,
            nombre.trim(),
            descripcion || null
        );

        if (filas === 0) {
            const existe = await Categoria.obtenerCategoriaPorId(req.params.id);

            if (!existe) {
                return res.status(404).json({ mensaje: 'Categoría no encontrada' });
            }
        }

        res.status(200).json({ mensaje: 'Categoría actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar categoría' });
    }
};

// Eliminar categoría
const eliminar = async (req, res) => {
    try {
        const filas = await Categoria.eliminarCategoria(req.params.id);

        if (filas === 0) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }

        res.status(200).json({ mensaje: 'Categoría eliminada correctamente' });
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(409).json({
                mensaje: 'No se puede eliminar porque tiene productos relacionados'
            });
        }

        res.status(500).json({ mensaje: 'Error al eliminar categoría' });
    }
};

module.exports = {
    listar,
    consultar,
    crear,
    actualizar,
    eliminar
};