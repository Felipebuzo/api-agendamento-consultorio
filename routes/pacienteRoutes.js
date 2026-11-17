const express = require('express');
const router = express.Router();
const { criar, listar } = require('../controllers/pacienteController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');
const validar = require('../middlewares/validar');
const { pacienteSchema } = require('../schemas/pacienteSchemas');

router.post('/pacientes', validar(pacienteSchema), criar);
router.get('/pacientes', autenticar, autorizar('ADMIN'), listar);

module.exports = router;