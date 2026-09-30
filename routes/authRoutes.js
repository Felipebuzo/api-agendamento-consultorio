const express = require('express');
const router = express.Router();
const { cadastrar, login } = require('../controllers/authController');
const autenticar = require('../middlewares/autenticar');

router.post('/cadastro', cadastrar);
router.post('/login', login);

router.get('/perfil', autenticar, (req, res) => {
  res.json({ usuarioLogado: req.usuario });
});

module.exports = router;