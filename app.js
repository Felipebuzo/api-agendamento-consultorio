const express = require('express');
const authRoutes = require('./routes/authRoutes');
const especialidadeRoutes = require('./routes/especialidadeRoutes');
const medicoRoutes = require('./routes/medicoRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const consultaRoutes = require('./routes/consultaRoutes');
const tratarErros = require('./middlewares/tratarErros');

// Aqui o prédio é construído: rotas, leitura de JSON e o gerente de crise.
// A porta da rua (app.listen) fica no index.js, para os testes poderem usar o app sem ligar a porta.
const app = express();

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', especialidadeRoutes);
app.use('/api', medicoRoutes);
app.use('/api', pacienteRoutes);
app.use('/api', consultaRoutes);

app.get('/', (req, res) => {
  res.json({ mensagem: 'API de agendamento de consultórios funcionando!' });
});

// O gerente de crise fica por último: só recebe os erros das portas anteriores
app.use(tratarErros);

module.exports = app;