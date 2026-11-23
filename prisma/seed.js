require('dotenv').config();

const bcrypt = require('bcrypt');
const prisma = require('../lib/prisma');


async function criarPrimeiroAdmin() {
  const nome = process.env.ADMIN_NOME || 'Administrador';
  const email = process.env.ADMIN_EMAIL;
  const senha = process.env.ADMIN_SENHA;

 
  if (!email || !senha) {
    console.error('Defina ADMIN_EMAIL e ADMIN_SENHA no arquivo .env antes de rodar o seed.');
    process.exitCode = 1;
    return;
  }

  
  if (senha.length < 8) {
    console.error('A ADMIN_SENHA deve ter pelo menos 8 caracteres.');
    process.exitCode = 1;
    return;
  }

  // Se já existe um usuário com esse email, não duplica
  const jaExiste = await prisma.usuario.findUnique({ where: { email } });

  if (jaExiste) {
    console.log('Esse admin já existe. Nada foi alterado.');
    return;
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  await prisma.usuario.create({
    data: { nome, email, senhaHash, role: 'ADMIN' },
  });

  console.log(`Admin criado com sucesso: ${email}`);
}

criarPrimeiroAdmin()
  .catch((erro) => {
    console.error('Erro ao criar o admin:', erro.message);
    process.exitCode = 1;
  })
  .finally(async () => {
  
    await prisma.$disconnect();
  });