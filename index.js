// Carrega as variáveis do arquivo .env (como a porta e as senhas)
require('dotenv').config();

const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');


// Permite que o servidor entenda requisições com corpo em JSON
app.use(express.json());
app.use('/api', authRoutes);

// Rota de teste, só pra confirmar que o servidor está no ar
app.get('/', (req, res) => {
  res.json({ mensagem: 'API de agendamento de consultórios funcionando!' });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});