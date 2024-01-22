const mongoose = require('mongoose');

const bettingHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  betId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bet', required: true },
  result: { type: String, required: true },
  dateTime: { type: Date, default: Date.now },
});

const BettingHistory = mongoose.model('BettingHistory', bettingHistorySchema);

module.exports = BettingHistory;
