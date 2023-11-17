const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middlewares/authMiddleware'); 
const User = require('../models/user');

// Rota para obter o perfil do usuário autenticado
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    console.log('Chegou na rota /profile');

    // O ID do usuário autenticado está disponível em req.user
    const userId = req.user.userId;

    // Busque as informações do usuário no banco de dados
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Responda com as informações do perfil do usuário
    res.status(200).json({
      username: user.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o perfil do usuário.' });
  }
});

module.exports = router;
