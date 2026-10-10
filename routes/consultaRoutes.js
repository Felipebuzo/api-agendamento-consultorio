const express = require('express');
const router = express.Router();
const { criar, listar, horariosLivres } = require('../controllers/consultaController');
const autenticar = require('../middlewares/autenticar');

router.post('/consultas', autenticar, criar);
router.get('/consultas', autenticar, listar);
router.get('/horarios-livres', autenticar, horariosLivres);

module.exports = router;