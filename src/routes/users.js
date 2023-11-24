const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middlewares/authMiddleware'); 
const User = require('../models/user');

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    console.log('Chegou na rota /profile');

    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.status(200).json({
      username: user.username,
      balance: user.balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o perfil do usuário.' });
  }
});

module.exports = router;
