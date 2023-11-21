const express = require('express');
const router = express.Router();
const Game = require('../models/game');

router.get('/', async (req, res) => {
  try {
    const games = await Game.find({}, '_id name dateTime teamA teamB');

    const formattedGames = games.map((game) => ({
      gameId: game._id.toString(), // Convertendo o ID para string
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
