const db = require('../config/db');

const obtenerTodos = async () => {
    const [rows] = await db.execute(`
        SELECT d.*, p.nombre AS producto
        FROM detalle_pedido d
        INNER JOIN productos p ON d.id_producto = p.id_producto
    `);
    return rows;
};

const obtenerPorId = async (id) => {
    const [rows] = await db.execute(
        'SELECT * FROM detalle_pedido WHERE id_detalle = ?',
        [id]
    );
    return rows[0];
};

const crear = async (detalle) => {
    const { id_pedido, id_producto, cantidad, precio_unitario } = detalle;

    const [result] = await db.execute(
        `INSERT INTO detalle_pedido
        (id_pedido, id_producto, cantidad, precio_unitario)
        VALUES (?, ?, ?, ?)`,
        [id_pedido, id_producto, cantidad, precio_unitario]
    );

    return result.insertId;
};

const actualizar = async (id, detalle) => {
    const { id_pedido, id_producto, cantidad, precio_unitario } = detalle;

    const [result] = await db.execute(
        `UPDATE detalle_pedido
        SET id_pedido = ?, id_producto = ?, cantidad = ?, precio_unitario = ?
        WHERE id_detalle = ?`,
        [id_pedido, id_producto, cantidad, precio_unitario, id]
    );

    return result.affectedRows;
};

const eliminar = async (id) => {
    const [result] = await db.execute(
        'DELETE FROM detalle_pedido WHERE id_detalle = ?',
        [id]
    );

    return result.affectedRows;
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};