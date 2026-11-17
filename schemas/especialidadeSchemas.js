const { z } = require('zod');


const especialidadeSchema = z.object({
  nome: z
    .string({ error: 'O nome da especialidade é obrigatório' })
    .min(2, 'O nome deve ter pelo menos 2 caracteres'),
});

module.exports = { especialidadeSchema };