const { z } = require('zod');

// Confere o pedido gritado no balcão: /horarios-livres?medicoId=1&data=2026-12-15
// Na URL tudo chega como texto, então conferimos se o texto tem cara de número e de data
const horariosLivresQuerySchema = z.object({
  medicoId: z
    .string({ error: 'Informe o médico pelo id' })
    .regex(/^[1-9]\d*$/, 'O id do médico deve ser um número inteiro maior que zero'),
  data: z.iso.date({ error: 'Informe a data no formato 2026-12-15' }),
});

module.exports = { horariosLivresQuerySchema };