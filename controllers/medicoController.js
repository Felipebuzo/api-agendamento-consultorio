const bcrypt = require('bcrypt');
const prisma = require('../lib/prisma');

async function criar(req, res) {
  const { nome, email, senha, crm, especialidadeId } = req.body;

  const senhaHash = await bcrypt.hash(senha, 10);

  const medico = await prisma.$transaction(async (transacao) => {
    const usuario = await transacao.usuario.create({
      data: {
        nome,
        email,
        senhaHash,
        role: 'MEDICO',
      },
    });

    const medicoCriado = await transacao.medico.create({
      data: {
        crm,
        usuarioId: usuario.id,
        especialidadeId,
      },
      include: {
        usuario: true,
        especialidade: true,
      },
    });

    return medicoCriado;
  });

  res.status(201).json({
    id: medico.id,
    crm: medico.crm,
    nome: medico.usuario.nome,
    email: medico.usuario.email,
    especialidade: medico.especialidade.nome,
  });
}

async function listar(req, res) {
  const medicos = await prisma.medico.findMany({
    include: {
      usuario: true,
      especialidade: true,
    },
  });

  const resposta = medicos.map((medico) => ({
    id: medico.id,
    crm: medico.crm,
    nome: medico.usuario.nome,
    email: medico.usuario.email,
    especialidade: medico.especialidade.nome,
  }));

  res.json(resposta);
}

module.exports = { criar, listar };