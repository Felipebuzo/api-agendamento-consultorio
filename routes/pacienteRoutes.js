const express = require('express');
const router = express.Router();
const { criar, listar } = require('../controllers/pacienteController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

router.post('/pacientes', criar);
router.get('/pacientes', autenticar, autorizar('ADMIN'), listar);

module.exports = router;