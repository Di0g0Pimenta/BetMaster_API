const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authenticateToken = require('./Middlewares/authMiddleware');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users',authenticateToken, require('./routes/users'));
app.use('/api/odds', require('./routes/odds'));
app.use('/api/games', require('./routes/games'));
app.use('/api/bets',authenticateToken ,require('./routes/bets'));
app.use('/api/bettingHistory', require('./routes/bettingHistory'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});