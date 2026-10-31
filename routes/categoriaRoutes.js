const express = require('express');
const router = express.Router();

const categoriaController = require('../controllers/categoriaController');

// Rutas CRUD
router.get('/', categoriaController.listar);
router.get('/:id', categoriaController.consultar);
router.post('/', categoriaController.crear);
router.put('/:id', categoriaController.actualizar);
router.delete('/:id', categoriaController.eliminar);

module.exports = router;