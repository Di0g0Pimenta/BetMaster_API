const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  oddId: { type: mongoose.Schema.Types.ObjectId, ref: 'Odd', required: true },
  betAmount: { type: Number, required: true },
  betType: { type: String, required: true }, // 'teamA', 'teamB', 'draw'
  status: { type: String, required: true }, // 'pending', 'won', 'lost'
  dateTime: { type: Date, default: Date.now },
});

const Bet = mongoose.model('Bet', betSchema);

module.exports = Bet;