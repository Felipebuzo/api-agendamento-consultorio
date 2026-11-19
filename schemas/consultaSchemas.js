const { z } = require('zod');

// Confere as regras do horário: futuro, entre 8h e 18h, em blocos de 30 minutos
function horarioValido(valor) {
  const data = new Date(valor);

  // Se a data nem existe, o erro de formato já foi avisado antes
  if (Number.isNaN(data.getTime())) return true;

  const hora = data.getHours();
  const minuto = data.getMinutes();

  return (
    hora >= 8 &&
    hora < 18 &&
    (minuto === 0 || minuto === 30) &&
    data.getSeconds() === 0 &&
    data > new Date()
  );
}

const dataHoraConsulta = z
  .iso.datetime({
    local: true,
    error: 'Informe a data e a hora no formato 2026-12-15T10:00:00',
  })
  .refine(horarioValido, 'O horário deve ser futuro, entre 8h e 18h, em blocos de 30 minutos');

// Regras do corpo da requisição de marcar consulta
const criarConsultaSchema = z.object({
  medicoId: z
    .number({ error: 'Informe o médico pelo id (um número)' })
    .int('O id do médico deve ser um número inteiro')
    .positive('O id do médico deve ser maior que zero'),
  pacienteId: z
    .number({ error: 'Informe o paciente pelo id (um número)' })
    .int('O id do paciente deve ser um número inteiro')
    .positive('O id do paciente deve ser maior que zero')
    .optional(),
  dataHora: dataHoraConsulta,
  observacoes: z.string().max(191, 'As observações devem ter no máximo 191 caracteres').optional(),
});

// Regras do corpo da requisição de remarcar consulta
const remarcarConsultaSchema = z.object({
  dataHora: dataHoraConsulta,
});

module.exports = { criarConsultaSchema, remarcarConsultaSchema };