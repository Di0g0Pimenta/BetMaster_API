const mongoose = require('mongoose');

const oddSchema = new mongoose.Schema({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  teamAOdd: { type: Number, required: true },
  teamBOdd: { type: Number, required: true },
  drawOdd: { type: Number, required: true },
});

const Odd = mongoose.model('Odd', oddSchema);

module.exports = Odd;