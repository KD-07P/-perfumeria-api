const db = require('../config/db');

// CONSULTAR TODAS LAS MARCAS
const obtenerMarcas = async () => {
    const [resultado] = await db.query(
        'SELECT * FROM marcas'
    );
    return resultado;
};

// CONSULTAR MARCA POR ID
const obtenerMarcaPorId = async (id) => {
    const [resultado] = await db.query(
        'SELECT * FROM marcas WHERE id_marca = ?',
        [id]
    );
    return resultado[0];
};

// CREAR MARCA
const crearMarca = async (nombre, pais_origen) => {
    const [resultado] = await db.query(
        'INSERT INTO marcas (nombre, pais_origen) VALUES (?, ?)',
        [nombre, pais_origen]
    );
    return resultado.insertId;
};

// ACTUALIZAR MARCA
const actualizarMarca = async (id, nombre, pais_origen) => {
    const [resultado] = await db.query(
        'UPDATE marcas SET nombre = ?, pais_origen = ? WHERE id_marca = ?',
        [nombre, pais_origen, id]
    );
    return resultado.affectedRows;
};

// ELIMINAR MARCA
const eliminarMarca = async (id) => {
    const [resultado] = await db.query(
        'DELETE FROM marcas WHERE id_marca = ?',
        [id]
    );
    return resultado.affectedRows;
};

module.exports = {
    obtenerMarcas,
    obtenerMarcaPorId,
    crearMarca,
    actualizarMarca,
    eliminarMarca
};