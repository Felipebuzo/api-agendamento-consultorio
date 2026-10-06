const express = require('express');
const router = express.Router();
const { criar, listar } = require('../controllers/consultaController');
const autenticar = require('../middlewares/autenticar');

router.post('/consultas', autenticar, criar);
router.get('/consultas', autenticar, listar);


module.exports = router;