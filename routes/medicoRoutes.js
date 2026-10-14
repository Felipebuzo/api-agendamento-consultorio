const express = require('express');
const router = express.Router();
const { criar, listar } = require('../controllers/medicoController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

router.post('/medicos', autenticar, autorizar('ADMIN'), criar);
router.get('/medicos', autenticar, listar);

module.exports = router;