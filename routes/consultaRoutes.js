const express = require('express');
const router = express.Router();
const {
  criar,
  listar,
  horariosLivres,
  cancelar,
  remarcar,
} = require('../controllers/consultaController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');
const validar = require('../middlewares/validar');
const { criarConsultaSchema, remarcarConsultaSchema } = require('../schemas/consultaSchemas');
const { idParamsSchema } = require('../schemas/paramsSchemas');
const { horariosLivresQuerySchema } = require('../schemas/horariosSchemas');

router.post('/consultas', autenticar, autorizar('ADMIN', 'PACIENTE'), validar(criarConsultaSchema), criar);
router.get('/consultas', autenticar, listar);
router.get('/horarios-livres', autenticar, validar(horariosLivresQuerySchema, 'query'), horariosLivres);
router.patch('/consultas/:id/cancelar', autenticar, validar(idParamsSchema, 'params'), cancelar);
router.patch('/consultas/:id/remarcar', autenticar, validar(idParamsSchema, 'params'), validar(remarcarConsultaSchema), remarcar);

module.exports = router;