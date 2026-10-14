const express = require('express');
const router = express.Router();
const {
  criar,
  listar,
  buscarPorId,
  deletar,
} = require('../controllers/especialidadeController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

router.post('/especialidades', autenticar, autorizar('ADMIN'), criar);
router.get('/especialidades', autenticar, listar);
router.get('/especialidades/:id', autenticar, buscarPorId);
router.delete('/especialidades/:id', autenticar, autorizar('ADMIN'), deletar);

module.exports = router;