const express = require('express');
const router = express.Router();
const { cadastrar, login } = require('../controllers/authController');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');
const validar = require('../middlewares/validar');
const { loginSchema, cadastroSchema } = require('../schemas/authSchemas');

router.post('/cadastro', autenticar, autorizar('ADMIN'), validar(cadastroSchema), cadastrar);
router.post('/login', validar(loginSchema), login);

router.get('/perfil', autenticar, (req, res) => {
  res.json({ usuarioLogado: req.usuario });
});

module.exports = router;