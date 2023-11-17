const mongoose = require('mongoose');

const userBalanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, required: true },
});

const UserBalance = mongoose.model('UserBalance', userBalanceSchema);

module.exports = UserBalance;