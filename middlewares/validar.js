
function validar(schema) {
  return (req, res, next) => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      const erros = resultado.error.issues.map((problema) => ({
        campo: problema.path.join('.'),
        mensagem: problema.message,
      }));

      return res.status(400).json({ erro: 'Dados inválidos', detalhes: erros });
    }

    req.body = resultado.data;
    next();
  };
}

module.exports = validar;