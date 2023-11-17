const mongoose = require('mongoose');

const bettingHistorySchema = new mongoose.Schema({
  betId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bet', required: true },
  result: { type: String, required: true }, // 'won', 'lost'
  wonAmount: { type: Number },
  dateTime: { type: Date, default: Date.now },
});

const BettingHistory = mongoose.model('BettingHistory', bettingHistorySchema);

module.exports = BettingHistory;