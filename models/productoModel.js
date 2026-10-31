const db = require('../config/db');

// CONSULTAR TODOS LOS PRODUCTOS
const obtenerProductos = async () => {
    const [resultado] = await db.query(
        `SELECT p.*, c.nombre AS categoria, m.nombre AS marca
         FROM productos p
         INNER JOIN categorias c ON p.id_categoria = c.id_categoria
         INNER JOIN marcas m ON p.id_marca = m.id_marca`
    );

    return resultado;
};

// CONSULTAR PRODUCTO POR ID
const obtenerProductoPorId = async (id) => {
    const [resultado] = await db.query(
        'SELECT * FROM productos WHERE id_producto = ?',
        [id]
    );

    return resultado[0];
};

// CREAR PRODUCTO
const crearProducto = async (datos) => {
    const [resultado] = await db.query(
        `INSERT INTO productos
        (nombre, descripcion, precio, stock, id_categoria, id_marca)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            datos.nombre,
            datos.descripcion,
            datos.precio,
            datos.stock,
            datos.id_categoria,
            datos.id_marca
        ]
    );

    return resultado.insertId;
};

// ACTUALIZAR PRODUCTO
const actualizarProducto = async (id, datos) => {
    const [resultado] = await db.query(
        `UPDATE productos
         SET nombre = ?, descripcion = ?, precio = ?,
             stock = ?, id_categoria = ?, id_marca = ?
         WHERE id_producto = ?`,
        [
            datos.nombre,
            datos.descripcion,
            datos.precio,
            datos.stock,
            datos.id_categoria,
            datos.id_marca,
            id
        ]
    );

    return resultado.affectedRows;
};

// ELIMINAR PRODUCTO
const eliminarProducto = async (id) => {
    const [resultado] = await db.query(
        'DELETE FROM productos WHERE id_producto = ?',
        [id]
    );

    return resultado.affectedRows;
};

module.exports = {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};