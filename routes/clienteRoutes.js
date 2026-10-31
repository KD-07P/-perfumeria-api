const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

// RUTAS CRUD DE CLIENTES
router.get('/', clienteController.listar);
router.get('/:id', clienteController.consultar);
router.post('/', clienteController.crear);
router.put('/:id', clienteController.actualizar);
router.delete('/:id', clienteController.eliminar);

module.exports = router;