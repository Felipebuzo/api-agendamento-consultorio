const bcrypt = require('bcrypt');
const prisma = require('../lib/prisma');

async function criar(req, res) {
  const { nome, email, senha, cpf, telefone } = req.body;

  const senhaHash = await bcrypt.hash(senha, 10);

  const paciente = await prisma.$transaction(async (transacao) => {
    const usuario = await transacao.usuario.create({
      data: {
        nome,
        email,
        senhaHash,
        role: 'PACIENTE',
      },
    });

    const pacienteCriado = await transacao.paciente.create({
      data: {
        usuarioId: usuario.id,
        cpf,
        telefone,
      },
      include: {
        usuario: true,
      },
    });

    return pacienteCriado;
  });

  res.status(201).json({
    id: paciente.id,
    nome: paciente.usuario.nome,
    email: paciente.usuario.email,
    cpf: paciente.cpf,
    telefone: paciente.telefone,
  });
}

async function listar(req, res) {
  const pacientes = await prisma.paciente.findMany({
    include: {
      usuario: true,
    },
  });

  const resposta = pacientes.map((paciente) => ({
    id: paciente.id,
    nome: paciente.usuario.nome,
    email: paciente.usuario.email,
    cpf: paciente.cpf,
    telefone: paciente.telefone,
  }));

  res.json(resposta);
}

module.exports = { criar, listar };