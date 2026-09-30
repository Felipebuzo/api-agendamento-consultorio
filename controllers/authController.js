const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

async function cadastrar(req, res) {
  const { nome, email, senha, role } = req.body;

  // Criptografa a senha antes de qualquer coisa
  const senhaHash = await bcrypt.hash(senha, 10);

  const usuario = await prisma.usuario.create({
    data: {
      nome,
      email,
      senhaHash,
      role,
    },
  });

  res.status(201).json({
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    role: usuario.role,
  });
}

async function login(req, res) {
  const { email, senha } = req.body;

  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario) {
    return res.status(401).json({ erro: 'Email ou senha inválidos' });
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senhaHash);

  if (!senhaCorreta) {
    return res.status(401).json({ erro: 'Email ou senha inválidos' });
  }

  const token = jwt.sign(
    { id: usuario.id, role: usuario.role },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token });
}

module.exports = { cadastrar, login };