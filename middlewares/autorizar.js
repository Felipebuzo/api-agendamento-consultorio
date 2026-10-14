// Recebe a lista de papéis que podem passar (ex: 'ADMIN', 'MEDICO')
function autorizar(...rolesPermitidos) {
  // Devolve o middleware de verdade, já configurado com essa lista
  return (req, res, next) => {
    // req.usuario foi preenchido pelo middleware autenticar
    if (!rolesPermitidos.includes(req.usuario.role)) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    next();
  };
}

module.exports = autorizar;