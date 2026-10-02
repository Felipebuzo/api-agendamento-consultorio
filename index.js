require('dotenv').config();

const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const especialidadeRoutes = require('./routes/especialidadeRoutes');
const medicoRoutes = require('./routes/medicoRoutes'); 
const pacienteRoutes = require('./routes/pacienteRoutes');

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', especialidadeRoutes);
app.use('/api', medicoRoutes);
app.use('/api', pacienteRoutes);  

app.get('/', (req, res) => {
  res.json({ mensagem: 'API de agendamento de consultórios funcionando!' });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});