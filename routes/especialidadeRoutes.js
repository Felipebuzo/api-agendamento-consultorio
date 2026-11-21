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
const validar = require('../middlewares/validar');
const { especialidadeSchema } = require('../schemas/especialidadeSchemas');
const { idParamsSchema } = require('../schemas/paramsSchemas');

router.post('/especialidades', autenticar, autorizar('ADMIN'), validar(especialidadeSchema), criar);
router.get('/especialidades', autenticar, listar);
router.get('/especialidades/:id', autenticar, validar(idParamsSchema, 'params'), buscarPorId);
router.delete('/especialidades/:id', autenticar, autorizar('ADMIN'), validar(idParamsSchema, 'params'), deletar);

module.exports = router;