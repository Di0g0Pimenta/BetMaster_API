const express = require('express');
const router = express.Router();
const Game = require('../models/game');
const Bet = require('../models/bet');
const Odd = require('../models/odd'); 
router.get('/', async (req, res) => {
  try {
    const games = await Game.find({}, '_id name dateTime teamA teamB');

    const formattedGames = games.map((game) => ({
      gameId: game._id.toString(),
      name: game.name,
      dateTime: game.dateTime,
      teamA: game.teamA,
      teamB: game.teamB,
    }));

    res.status(200).json(formattedGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter a lista de jogos.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, dateTime, teamA, teamB } = req.body;
    const newGame = new Game({ name, dateTime, teamA, teamB });
    await newGame.save();
    res.status(201).json({ message: 'Jogo adicionado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar o jogo.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const gameId = req.params.id;
    const { name, dateTime, teamA, teamB } = req.body;
    const updatedGame = await Game.findByIdAndUpdate(gameId, { name, dateTime, teamA, teamB });
    if (!updatedGame) {
      return res.status(404).json({ error: 'Jogo não encontrado.' });
    }
    res.status(200).json({ message: 'Jogo atualizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o jogo.' });
  }
});

router.put('/:id/result', async (req, res) => {
  try {
    const gameId = req.params.id;
    const { result } = req.body;
    const updatedGame = await Game.findByIdAndUpdate(gameId, { result }, { new: true });
    
    if (!updatedGame) {
      return res.status(404).json({ error: 'Jogo não encontrado.' });
    }

    // Lógica para calcular ganhos e atualizar apostas
    const bets = await Bet.find({ gameId });
    for (const bet of bets) {
      const odd = await Odd.findById(bet.oddId);
      let wonAmount = 0;

      if (result === "teamA" && bet.betType === "teamA") {
        wonAmount = bet.betAmount * odd.teamAOdd;
      } else if (result === "teamB" && bet.betType === "teamB") {
        wonAmount = bet.betAmount * odd.teamBOdd;
      } else if (result === "draw" && bet.betType === "draw") {
        wonAmount = bet.betAmount * odd.drawOdd;
      }

      // Atualiza o campo wonAmount da aposta
      await Bet.findByIdAndUpdate(bet._id, { wonAmount });
    }

    res.status(200).json({ message: 'Resultado do jogo atualizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o resultado do jogo.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const gameId = req.params.id;
    const deletedGame = await Game.findByIdAndDelete(gameId);
    if (!deletedGame) {
      return res.status(404).json({ error: 'Jogo não encontrado.' });
    }
    res.status(200).json({ message: 'Jogo removido com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover o jogo.' });
  }
});

module.exports = router;
