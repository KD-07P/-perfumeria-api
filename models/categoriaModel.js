const db = require('../config/db');

// Consultar todas las categorías
const obtenerCategorias = async () => {
    const [resultado] = await db.query(
        'SELECT * FROM categorias'
    );
    return resultado;
};

// Consultar categoría por ID
const obtenerCategoriaPorId = async (id) => {
    const [resultado] = await db.query(
        'SELECT * FROM categorias WHERE id_categoria = ?',
        [id]
    );
    return resultado[0];
};

// Crear categoría
const crearCategoria = async (nombre, descripcion) => {
    const [resultado] = await db.query(
        'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion]
    );
    return resultado.insertId;
};

// Actualizar categoría
const actualizarCategoria = async (id, nombre, descripcion) => {
    const [resultado] = await db.query(
        'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id_categoria = ?',
        [nombre, descripcion, id]
    );
    return resultado.affectedRows;
};

// Eliminar categoría
const eliminarCategoria = async (id) => {
    const [resultado] = await db.query(
        'DELETE FROM categorias WHERE id_categoria = ?',
        [id]
    );
    return resultado.affectedRows;
};

module.exports = {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
};