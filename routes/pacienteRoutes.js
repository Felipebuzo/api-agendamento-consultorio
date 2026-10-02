const express = require('express');
const router = express.Router();
const { criar, listar } = require('../controllers/pacienteController');
const autenticar = require('../middlewares/autenticar');

router.post('/pacientes', autenticar, criar);
router.get('/pacientes', autenticar, listar);

module.exports = router;