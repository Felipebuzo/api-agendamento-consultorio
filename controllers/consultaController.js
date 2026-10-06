const prisma = require('../lib/prisma');

async function criar(req, res) {
  const { medicoId, pacienteId, dataHora, observacoes } = req.body;

  const inicio = new Date(dataHora);
  const fim = new Date(inicio.getTime() + 30 * 60 * 1000);
  const margemAnterior = new Date(inicio.getTime() - 30 * 60 * 1000);

  const conflito = await prisma.consulta.findFirst({
    where: {
      medicoId,
      status: 'AGENDADA',
      dataHora: {
        gt: margemAnterior,
        lt: fim,
      },
    },
  });

  if (conflito) {
    return res.status(409).json({ erro: 'Horário indisponível para este médico' });
  }

  const consulta = await prisma.consulta.create({
    data: {
      medicoId,
      pacienteId,
      dataHora: inicio,
      observacoes,
    },
  });

  

  res.status(201).json(consulta);
}

async function listar(req, res) {
  const { medicoId, pacienteId } = req.query;

  const filtro = {};

  if (medicoId) {
    filtro.medicoId = Number(medicoId);
  }

  if (pacienteId) {
    filtro.pacienteId = Number(pacienteId);
  }

  const consultas = await prisma.consulta.findMany({
    where: filtro,
  });

  res.json(consultas);
}

module.exports = { criar, listar };