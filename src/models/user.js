const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // Adicionando a função padrão 'user'
  // outras informações do usuário
});

const User = mongoose.model('User', userSchema);

module.exports = User;