// odds.js
const express = require('express');
const router = express.Router();
const Odd = require('../models/odd');
const Game = require('../models/game');

// Rota para obter a lista de odds
router.get('/', async (req, res) => {
  try {
    const odds = await Odd.find({}, 'gameId teamAOdd teamBOdd drawOdd');

    const formattedOdds = odds.map((odd) => ({
      oddId: odd._id.toString(),
      gameId: odd.gameId,
      teamAOdd: odd.teamAOdd,
      teamBOdd: odd.teamBOdd,
      drawOdd: odd.drawOdd,
    }));

    res.status(200).json(formattedOdds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter a lista de odds.' });
  }
});

// Rota para criar uma nova odd
router.post('/', async (req, res) => {
  try {
    const { gameId, teamAOdd, teamBOdd, drawOdd } = req.body;

    // Verifica se o jogo existe
    const gameExists = await Game.findById(gameId);
    if (!gameExists) {
      return res.status(404).json({ error: 'Jogo não encontrado.' });
    }

    // Cria uma nova instância do modelo Odd
    const newOdd = new Odd({
      gameId,
      teamAOdd,
      teamBOdd,
      drawOdd,
    });

    // Salva a nova odd no banco de dados
    await newOdd.save();

    res.status(201).json({ message: 'Odd criada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a odd.' });
  }
});

// Rota para atualizar uma odd existente
router.put('/:id', async (req, res) => {
  try {
    const oddId = req.params.id;
    const { teamAOdd, teamBOdd, drawOdd } = req.body;

    // Atualiza a odd no banco de dados
    const updatedOdd = await Odd.findByIdAndUpdate(
      oddId,
      { teamAOdd, teamBOdd, drawOdd },
      { new: true } // Retorna a odd atualizada
    );

    if (!updatedOdd) {
      return res.status(404).json({ error: 'Odd não encontrada.' });
    }

    res.status(200).json({ message: 'Odd atualizada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar a odd.' });
  }
});

module.exports = router;
