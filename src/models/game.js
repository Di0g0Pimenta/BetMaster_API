const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateTime: { type: Date, required: true },
  teamA: { type: String, required: true },
  teamB: { type: String, required: true },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
