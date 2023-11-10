const express = require('express');
const router = express.Router();
const User = require('../models/user');
const UserBalance = require('../models/userBalance');

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifique se o nome de usuário já está em uso
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Nome de usuário já em uso.' });
    }

    // Crie uma nova instância do modelo User
    const newUser = new User({
      username,
      password, // Aqui, você deve considerar hash de senha, como fez no endpoint de registro em 'auth.js'
      // Outras informações do usuário, se necessário
    });

    // Salve o novo usuário no banco de dados
    await newUser.save();

    // Crie uma instância do modelo UserBalance para o novo usuário
    const newUserBalance = new UserBalance({
      userId: newUser._id,
      balance: 0, // Defina o saldo inicial como necessário
    });

    // Salve o novo saldo do usuário no banco de dados
    await newUserBalance.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar o usuário.' });
  }
});

// Rota para obter o perfil do usuário
router.get('/profile', async (req, res) => {
  try {
    // Obtém o ID do usuário autenticado
    const userId = req.user._id;

    // Encontre o usuário pelo ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o perfil do usuário.' });
  }
});

module.exports = router;
