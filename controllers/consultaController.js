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

async function horariosLivres(req, res) {
  const { medicoId, data } = req.query;

  const trintaMinutos = 30 * 60 * 1000;

  const inicioDoDia = new Date(`${data}T00:00:00`);
  const fimDoDia = new Date(`${data}T23:59:59`);

  const consultas = await prisma.consulta.findMany({
    where: {
      medicoId: Number(medicoId),
      status: 'AGENDADA',
      dataHora: {
        gte: inicioDoDia,
        lte: fimDoDia,
      },
    },
  });

  const horarios = [];

  for (let hora = 8; hora < 18; hora++) {
    for (const minuto of [0, 30]) {
      const horario = new Date(`${data}T00:00:00`);
      horario.setHours(hora, minuto, 0, 0);

      const ocupado = consultas.some((consulta) => {
        const inicioConsulta = consulta.dataHora.getTime();
        return (
          inicioConsulta > horario.getTime() - trintaMinutos &&
          inicioConsulta < horario.getTime() + trintaMinutos
        );
      });

      if (!ocupado) {
        horarios.push(horario);
      }
    }
  }

  res.json(horarios);
}

module.exports = { criar, listar, horariosLivres };