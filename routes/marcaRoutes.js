const express = require('express');
const router = express.Router();

const marcaController = require('../controllers/marcaController');

// RUTAS CRUD DE MARCAS
router.get('/', marcaController.listar);
router.get('/:id', marcaController.consultar);
router.post('/', marcaController.crear);
router.put('/:id', marcaController.actualizar);
router.delete('/:id', marcaController.eliminar);

module.exports = router;