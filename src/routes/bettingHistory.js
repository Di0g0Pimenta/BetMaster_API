/**
const express = require('express');
const router = express.Router();
const authenticateToken = require('../Middlewares/authMiddleware');
const BettingHistory = require('../models/bettingHistory');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    console.log('UserID:', userId);

    const bettingHistory = await BettingHistory.find({ userId });

    console.log('Betting History Query Result:', bettingHistory);

    const formattedHistory = bettingHistory.map((entry) => ({
      historyId: entry._id.toString(),
      betId: entry.betId,
      result: entry.status,
      wonAmount: entry.wonAmount,
      dateTime: entry.dateTime,
    }));

    res.status(200).json(formattedHistory);
  } catch (error) {
    console.error('Erro ao obter o histórico de apostas:', error);
    res.status(500).json({ error: 'Erro ao obter o histórico de apostas.' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { betId, result, wonAmount } = req.body;
    const userId = req.user.userId;

    const newHistoryEntry = new BettingHistory({
      betId,
      result,
      wonAmount,
      dateTime: new Date(),
    });

    await newHistoryEntry.save();

    res.status(201).json({ message: 'Histórico de apostas atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao adicionar a entrada no histórico de apostas:', error);
    res.status(500).json({ error: 'Erro ao adicionar a entrada no histórico de apostas.' });
  }
});

module.exports = router;
 */