const express = require("express");
const router = express.Router();
const Bet = require("../models/bet");
const Game = require("../models/game");
const Odd = require("../models/odd");
const User = require("../models/user");

const handleError = (res, statusCode, errorMessage) => {
  console.error(errorMessage);
  res.status(statusCode).json({ error: errorMessage });
};

const verifyGameExists = async (gameId) => {
  const game = await Game.findById(gameId);
  if (!game) throw "Jogo não encontrado.";
};

const verifyOddExists = async (oddId) => {
  const odd = await Odd.findById(oddId);
  if (!odd) throw "Odd não encontrada.";
};

const verifyUserBalance = async (userId, betAmount) => {
  try {
    console.log('Verificando saldo do usuário. UserID:', userId);

    const user = await User.findById(userId);

    console.log('User encontrado:', user);

    if (!user || !user.balance || user.balance < betAmount) {
      console.log('Saldo insuficiente. User ou balance inválido.');

      throw "Saldo insuficiente para a aposta.";
    }
  } catch (error) {
    console.error(`Erro ao verificar o saldo do usuário: ${error}`);

    throw `Erro ao verificar o saldo do usuário: ${error}`;
  }
};


router.get("/", async (req, res) => {
  try {
    const bets = await Bet.find({ userId: req.userId })
      .populate({
        path: "gameId",
        select: "name dateTime teamA teamB",
      })
      .populate({
        path: "oddId",
        select: "teamAOdd teamBOdd drawOdd",
      });

      const formattedBets = bets.map((bet) => ({
        betId: bet._id ? bet._id.toString() : null,
        gameId: bet.gameId,
        oddId: bet.oddId,
        betAmount: bet.betAmount,
        betType: bet.betType,
        status: bet.status,
        dateTime: bet.dateTime,
      }));

    res.status(200).json(formattedBets);
  } catch (error) {
    handleError(res, 500, "Erro ao obter a lista de apostas.");
  }
});

router.post("/", async (req, res) => {
  try {
    const { gameId, oddId, betAmount, betType } = req.body;

    console.log('User object in create bet route:', req.user);
    console.log('OddId in create bet route:', oddId);

    if (!req.user || !req.user.userId) {
      console.log('User ID not defined. Sending error response.');
      return handleError(
        res,
        500,
        "Erro ao criar a aposta: ID do usuário não está definido."
      );
    }

    // Verificar se a Odd existe
    const odd = await Odd.findById(oddId);
    console.log('Response from database:', odd);

    console.log('Odd found:', odd);

    if (!odd) {
      console.log('Odd not found. Sending error response.');
      return handleError(
        res,
        404,
        "Erro ao criar a aposta: Odd não encontrada."
      );
    }

    await verifyGameExists(gameId);
    await verifyOddExists(oddId);
    await verifyUserBalance(req.user.userId, betAmount);

    const userId = req.user && req.userId.toString();
    console.log('UserID ao criar aposta:', userId);

    const newBet = new Bet({
      userId,
      gameId,
      oddId,
      betAmount,
      betType,
      status: "pending",
      dateTime: new Date(),
    });

    console.log('Objeto da Nova Aposta:', newBet);

    await newBet.save();

    const user = await User.findById(req.userId);
    const userBalance = user.balance;
    const updatedBalance = userBalance - betAmount;
    await User.findByIdAndUpdate(req.userId, { balance: updatedBalance });


    res
      .status(201)
      .json({
        message: "Aposta criada com sucesso.",
        betId: newBet._id.toString(),
      });
  } catch (error) {
    handleError(res, 500, `Erro ao criar a aposta: ${error}`);
  }
});

module.exports = router;
