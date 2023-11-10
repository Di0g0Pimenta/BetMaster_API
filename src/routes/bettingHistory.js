const express = require('express');
const router = express.Router();
const BettingHistory = require('../models/bettingHistory');
const Bet = require('../models/bet');

// Endpoint para obter o histórico de apostas de um usuário específico
router.get('/', async (req, res) => {
  try {
    const userId = req.user._id; // Obtém o ID do usuário autenticado

    // Encontre todas as apostas do usuário
    const userBets = await Bet.find({ userId });

    // Crie uma lista de IDs de apostas do usuário
    const betIds = userBets.map((bet) => bet._id);

    // Encontre o histórico de apostas com base nas IDs de apostas
    const bettingHistory = await BettingHistory.find({ betId: { $in: betIds } });

    res.json(bettingHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o histórico de apostas.' });
  }
});

// Endpoint para obter detalhes de um histórico de aposta específico
router.get('/:historyId', async (req, res) => {
  try {
    const historyId = req.params.historyId;

    // Encontre o histórico de aposta pelo ID
    const bettingHistory = await BettingHistory.findById(historyId);

    if (!bettingHistory) {
      return res.status(404).json({ error: 'Histórico de aposta não encontrado.' });
    }

    res.json(bettingHistory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter detalhes do histórico de aposta.' });
  }
});

// Outras operações como atualizar ou excluir histórico de apostas podem ser adicionadas conforme necessário

module.exports = router;
