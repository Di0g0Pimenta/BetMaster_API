const express = require('express');
const router = express.Router();
const BettingHistory = require('../models/bettingHistory');
const Bet = require('../models/bet');

// Rota para criar um novo histórico de aposta
router.post('/bettingHistory', async (req, res) => {
  try {
    const { betId, result, wonAmount } = req.body;

    // Verifique se a aposta associada ao histórico existe
    const bet = await Bet.findById(betId);
    if (!bet) {
      return res.status(400).json({ error: 'Aposta não encontrada.' });
    }

    // Crie uma nova instância do modelo BettingHistory
    const newBettingHistory = new BettingHistory({
      betId,
      result,
      wonAmount,
      dateTime: new Date(),
    });

    // Salve o novo histórico de aposta no banco de dados
    await newBettingHistory.save();

    // Atualize o status da aposta com base no resultado
    bet.status = result === 'won' ? 'won' : 'lost';
    // Atualize o valor ganho (se necessário) - ajuste conforme a lógica do seu aplicativo
    if (result === 'won') {
      bet.wonAmount = wonAmount;
    }

    await bet.save();

    res.status(201).json({ message: 'Histórico de aposta criado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o histórico de aposta.' });
  }
});

// Outras rotas para obter a lista de jogos, odds, etc., podem ser adicionadas conforme necessário

module.exports = router;
