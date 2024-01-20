const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateTime: { type: Date, required: true },
  teamA: {
    name: { type: String, required: true },
    logoUrl: { type: String }
  },
  teamB: {
    name: { type: String, required: true },
    logoUrl: { type: String } 
  },
  ended: { type: Boolean, default: false },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
