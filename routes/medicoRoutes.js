const express = require('express');
const router = express.Router();
const { criar, listar } = require('../controllers/medicoController');
const autenticar = require('../middlewares/autenticar');

router.post('/medicos', autenticar, criar);
router.get('/medicos', autenticar, listar);

module.exports = router;