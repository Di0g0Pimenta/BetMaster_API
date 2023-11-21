const express = require("express");
const router = express.Router();
const Bet = require("../models/bet");
const Game = require("../models/game");
const Odd = require("../models/odd");
const UserBalance = require("../models/userBalance");

router.post("/", async (req, res) => {
  try {
    const { gameId, oddId, betAmount, betType } = req.body;

    // Verifique se o jogo existe
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(400).json({ error: "Jogo não encontrado." });
    }

    // Verifique se a odd existe
    const odd = await Odd.findById(oddId);
    if (!odd) {
      return res.status(400).json({ error: "Odd não encontrada." });
    }

    // Verifique se o usuário tem saldo suficiente para a aposta
    const userBalance = await UserBalance.findOne({ userId: req.user._id });
    if (!userBalance || userBalance.balance < betAmount) {
      return res.status(400).json({ error: "Saldo insuficiente para a aposta." });
    }

    // Crie uma nova instância do modelo Bet
    const newBet = new Bet({
      userId: req.user._id,
      gameId,
      oddId,
      betAmount,
      betType,
      status: "pending",
      dateTime: new Date(),
    });

    // Salve a nova aposta no banco de dados
    await newBet.save();

    // Atualize o saldo do usuário após a aposta
    userBalance.balance -= betAmount;
    await userBalance.save();

    res.status(201).json({ message: "Aposta criada com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a aposta." });
  }
});

module.exports = router;
