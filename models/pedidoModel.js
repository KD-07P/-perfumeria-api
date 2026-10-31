const db = require('../config/db');

const obtenerTodos = async () => {
    const [rows] = await db.execute(`
        SELECT p.*, c.nombre, c.apellido
        FROM pedidos p
        INNER JOIN clientes c ON p.id_cliente = c.id_cliente
    `);
    return rows;
};

const obtenerPorId = async (id) => {
    const [rows] = await db.execute(
        'SELECT * FROM pedidos WHERE id_pedido = ?',
        [id]
    );
    return rows[0];
};

const crear = async (pedido) => {
    const { fecha_pedido, estado, total, id_cliente } = pedido;

    const [result] = await db.execute(
        `INSERT INTO pedidos (fecha_pedido, estado, total, id_cliente)
         VALUES (?, ?, ?, ?)`,
        [fecha_pedido || null, estado || 'Pendiente', total, id_cliente]
    );

    return result.insertId;
};

const actualizar = async (id, pedido) => {
    const { fecha_pedido, estado, total, id_cliente } = pedido;

    const [result] = await db.execute(
        `UPDATE pedidos
         SET fecha_pedido = ?, estado = ?, total = ?, id_cliente = ?
         WHERE id_pedido = ?`,
        [fecha_pedido, estado, total, id_cliente, id]
    );

    return result.affectedRows;
};

const eliminar = async (id) => {
    const [result] = await db.execute(
        'DELETE FROM pedidos WHERE id_pedido = ?',
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