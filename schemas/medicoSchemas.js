const { z } = require('zod');

// Regras do corpo da requisição de criar médico
const medicoSchema = z.object({
  nome: z
    .string({ error: 'O nome é obrigatório' })
    .min(2, 'O nome deve ter pelo menos 2 caracteres')
    .max(191, 'O nome deve ter no máximo 191 caracteres'),
  email: z
    .email({ error: 'Informe um email válido' })
    .max(191, 'O email deve ter no máximo 191 caracteres'),
  senha: z
    .string({ error: 'A senha é obrigatória' })
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .max(72, 'A senha deve ter no máximo 72 caracteres'),
  crm: z
    .string({ error: 'O CRM é obrigatório' })
    .regex(/^\d{4,7}-[A-Z]{2}$/, 'O CRM deve seguir o formato 123456-SP'),
  especialidadeId: z
    .number({ error: 'Informe a especialidade pelo id (um número)' })
    .int('O id da especialidade deve ser um número inteiro')
    .positive('O id da especialidade deve ser maior que zero'),
});

module.exports = { medicoSchema };