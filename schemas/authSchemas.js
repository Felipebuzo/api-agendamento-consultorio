const { z } = require('zod');

// Regras do corpo da requisição de login
const loginSchema = z.object({
  email: z.email({ error: 'Informe um email válido' }),
  senha: z.string({ error: 'A senha é obrigatória' }).min(1, 'A senha é obrigatória'),
});

// Regras do cadastro de usuário (feito pelo admin)
const cadastroSchema = z.object({
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
  role: z.enum(['ADMIN', 'MEDICO', 'PACIENTE'], {
    error: 'O papel deve ser ADMIN, MEDICO ou PACIENTE',
  }),
});

module.exports = { loginSchema, cadastroSchema };