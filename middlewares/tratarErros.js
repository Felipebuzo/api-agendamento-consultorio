
function tratarErros(erro, req, res, next) {
  // Se a resposta já começou a ser enviada, deixamos o Express encerrar
  if (res.headersSent) {
    return next(erro);
  }

  
  if (erro.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido no corpo da requisição' });
  }


  if (erro.code === 'P2002') {
    return res.status(409).json({ erro: 'Já existe um registro com esse valor' });
  }

  if (erro.code === 'P2003') {
    return res.status(400).json({ erro: 'Registro relacionado não encontrado' });
  }

  if (erro.code === 'P2025') {
    return res.status(404).json({ erro: 'Registro não encontrado' });
  }

  if (erro.code === 'P2000') {
    return res.status(400).json({ erro: 'Um dos textos enviados é maior que o permitido' });
  }


  console.error('Erro não tratado:', erro);
  return res.status(500).json({ erro: 'Erro interno do servidor' });
}

module.exports = tratarErros;