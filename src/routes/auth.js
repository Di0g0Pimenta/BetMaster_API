const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UserBalance = require('../models/userBalance');


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
      password,
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

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Nome de usuário ou senha incorretos.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Nome de usuário ou senha incorretos.' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h' // Token expira em 1 hora
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});

module.exports = router;