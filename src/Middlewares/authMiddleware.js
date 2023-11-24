const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  console.log('Token recebido:', token);

  if (!token) {
    console.log('Token ausente. Enviando status 401.');
    return res.sendStatus(401);
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Erro ao verificar o token:', err);
      console.log('Erro ao verificar o token. Enviando status 403.');
      return res.sendStatus(403);
    }

    console.log('Token verificado com sucesso. Usuário:', user);
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
