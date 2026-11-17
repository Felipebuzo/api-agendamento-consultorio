const express = require('express');
const router = express.Router();
const { criar, listar } = require('../controllers/medicoController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');
const validar = require('../middlewares/validar');
const { medicoSchema } = require('../schemas/medicoSchemas');

router.post('/medicos', autenticar, autorizar('ADMIN'), validar(medicoSchema), criar);
router.get('/medicos', autenticar, listar);

module.exports = router;