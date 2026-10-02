const prisma = require('../lib/prisma');

async function criar(req, res) {
  const { nome } = req.body;

  const especialidade = await prisma.especialidade.create({
    data: { nome },
  });

  res.status(201).json(especialidade);
}

async function listar(req, res) {
  const especialidades = await prisma.especialidade.findMany();
  res.json(especialidades);
}

async function buscarPorId(req, res) {
  const { id } = req.params;

  const especialidade = await prisma.especialidade.findUnique({
    where: { id: Number(id) },
  });

  if (!especialidade) {
    return res.status(404).json({ erro: 'Especialidade não encontrada' });
  }

  res.json(especialidade);
}

async function deletar(req, res) {
  const { id } = req.params;

  await prisma.especialidade.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
}

module.exports = { criar, listar, buscarPorId, deletar };