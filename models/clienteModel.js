const db = require('../config/db');

// CONSULTAR TODOS LOS CLIENTES
const obtenerClientes = async () => {
    const [resultado] = await db.query(
        'SELECT * FROM clientes'
    );

    return resultado;
};

// CONSULTAR CLIENTE POR ID
const obtenerClientePorId = async (id) => {
    const [resultado] = await db.query(
        'SELECT * FROM clientes WHERE id_cliente = ?',
        [id]
    );

    return resultado[0];
};

// CREAR CLIENTE
const crearCliente = async (datos) => {
    const [resultado] = await db.query(
        `INSERT INTO clientes
        (nombre, apellido, correo, telefono)
        VALUES (?, ?, ?, ?)`,
        [
            datos.nombre,
            datos.apellido,
            datos.correo,
            datos.telefono
        ]
    );

    return resultado.insertId;
};

// ACTUALIZAR CLIENTE
const actualizarCliente = async (id, datos) => {
    const [resultado] = await db.query(
        `UPDATE clientes
         SET nombre = ?, apellido = ?, correo = ?, telefono = ?
         WHERE id_cliente = ?`,
        [
            datos.nombre,
            datos.apellido,
            datos.correo,
            datos.telefono,
            id
        ]
    );

    return resultado.affectedRows;
};

// ELIMINAR CLIENTE
const eliminarCliente = async (id) => {
    const [resultado] = await db.query(
        'DELETE FROM clientes WHERE id_cliente = ?',
        [id]
    );

    return resultado.affectedRows;
};

module.exports = {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};