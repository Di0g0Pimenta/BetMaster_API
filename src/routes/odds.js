const express = require('express');
const router = express.Router();
const Odd = require('../models/odd');

// Endpoint para obter a lista de odds
router.get('/', async (req, res) => {
  try {
    // Obtenha todas as odds do banco de dados
    const odds = await Odd.find();
    res.json(odds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter a lista de odds.' });
  }
});

// Endpoint para obter detalhes de uma odd específica
router.get('/:oddId', async (req, res) => {
  try {
    const oddId = req.params.oddId;

    // Encontre a odd pelo ID
    const odd = await Odd.findById(oddId);

    if (!odd) {
      return res.status(404).json({ error: 'Odd não encontrada.' });
    }

    res.json(odd);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter detalhes da odd.' });
  }
});

// Outras operações como atualizar ou excluir odds podem ser adicionadas conforme necessário

module.exports = router;
