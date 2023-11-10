const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 

    const newUser = new User({
      username: username,
      password: hashedPassword,
      // outras informações do usuário, se necessário
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (error) {
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
