const Producto = require('../models/productoModel');

// LISTAR TODOS LOS PRODUCTOS
const listar = async (req, res) => {
    try {
        const datos = await Producto.obtenerProductos();

        res.status(200).json(datos);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al consultar productos'
        });
    }
};

// CONSULTAR PRODUCTO POR ID
const consultar = async (req, res) => {
    try {
        const producto = await Producto.obtenerProductoPorId(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.status(200).json(producto);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al consultar producto'
        });
    }
};

// CREAR PRODUCTO
const crear = async (req, res) => {
    try {
        const {
            nombre,
            descripcion,
            precio,
            stock,
            id_categoria,
            id_marca
        } = req.body;

        if (
            !nombre || !nombre.trim() ||
            precio === undefined || Number(precio) <= 0 ||
            stock === undefined || !Number.isInteger(Number(stock)) ||
            Number(stock) < 0 ||
            !id_categoria || !id_marca
        ) {
            return res.status(400).json({
                mensaje: 'Verifica nombre, precio, stock, categoría y marca'
            });
        }

        const id = await Producto.crearProducto({
            nombre: nombre.trim(),
            descripcion,
            precio,
            stock,
            id_categoria,
            id_marca
        });

        res.status(201).json({
            mensaje: 'Producto creado correctamente',
            id_producto: id
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear producto. Verifica que la categoría y marca existan'
        });
    }
};

// ACTUALIZAR PRODUCTO
const actualizar = async (req, res) => {
    try {
        const {
            nombre,
            descripcion,
            precio,
            stock,
            id_categoria,
            id_marca
        } = req.body;

        if (
            !nombre || !nombre.trim() ||
            precio === undefined || Number(precio) <= 0 ||
            stock === undefined || !Number.isInteger(Number(stock)) ||
            Number(stock) < 0 ||
            !id_categoria || !id_marca
        ) {
            return res.status(400).json({
                mensaje: 'Verifica los datos del producto'
            });
        }

        const filas = await Producto.actualizarProducto(req.params.id, {
            nombre: nombre.trim(),
            descripcion,
            precio,
            stock,
            id_categoria,
            id_marca
        });

        if (filas === 0) {
            const existe = await Producto.obtenerProductoPorId(req.params.id);

            if (!existe) {
                return res.status(404).json({
                    mensaje: 'Producto no encontrado'
                });
            }
        }

        res.status(200).json({
            mensaje: 'Producto actualizado correctamente'
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al actualizar producto'
        });
    }
};

// ELIMINAR PRODUCTO
const eliminar = async (req, res) => {
    try {
        const filas = await Producto.eliminarProducto(req.params.id);

        if (filas === 0) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Producto eliminado correctamente'
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al eliminar producto'
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