const { z } = require('zod');


const idParamsSchema = z.object({
  id: z
    .string({ error: 'Informe o id na URL' })
    .regex(/^[1-9]\d*$/, 'O id deve ser um número inteiro maior que zero'),
});

module.exports = { idParamsSchema };