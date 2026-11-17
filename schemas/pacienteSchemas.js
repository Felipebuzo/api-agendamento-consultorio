const { z } = require('zod');

// Regras do corpo da requisição de cadastro de paciente
const pacienteSchema = z.object({
  nome: z.string({ error: 'O nome é obrigatório' }).min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.email({ error: 'Informe um email válido' }),
  senha: z
    .string({ error: 'A senha é obrigatória' })
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .max(72, 'A senha deve ter no máximo 72 caracteres'),
  cpf: z
    .string({ error: 'O CPF é obrigatório' })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'O CPF deve seguir o formato 123.456.789-00'),
  telefone: z
    .string({ error: 'O telefone é obrigatório' })
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'O telefone deve seguir o formato (11) 91234-5678'),
});

module.exports = { pacienteSchema };