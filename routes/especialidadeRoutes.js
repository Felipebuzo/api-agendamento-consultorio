const express = require('express');
const router = express.Router();
const {
  criar,
  listar,
  buscarPorId,
  deletar,
} = require('../controllers/especialidadeController');
const autenticar = require('../middlewares/autenticar');

router.post('/especialidades', autenticar, criar);
router.get('/especialidades', autenticar, listar);
router.get('/especialidades/:id', autenticar, buscarPorId);
router.delete('/especialidades/:id', autenticar, deletar);

module.exports = router;