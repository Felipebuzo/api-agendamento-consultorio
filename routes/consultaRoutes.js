const express = require('express');
const router = express.Router();
const { criar, listar, horariosLivres, cancelar, remarcar } = require('../controllers/consultaController');
const autenticar = require('../middlewares/autenticar');

router.post('/consultas', autenticar, criar);
router.get('/consultas', autenticar, listar);
router.get('/horarios-livres', autenticar, horariosLivres);
router.patch('/consultas/:id/cancelar', autenticar, cancelar);
router.patch('/consultas/:id/remarcar', autenticar, remarcar);

module.exports = router;