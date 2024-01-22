const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const Bet = require("../models/bet");
const Odd = require("../models/odd");
const BettingHistory = require("../models/bettingHistory");
const League = require("../models/league"); // Importe o modelo League
const leaguesRouter = require("./leagues"); // Importe o arquivo de rotas para ligas

router.use("/leagues", leaguesRouter);

router.get("/", async (req, res) => {
  try {
    const games = await Game.find({}, '_id name dateTime league teamA teamB ended')
      .populate('league', 'name');

    const formattedGames = games.map((game) => ({
      gameId: game._id.toString(),
      name: game.name,
      dateTime: game.dateTime,
      league: {
        leagueId: game.league._id.toString(),
        name: game.league.name
      },
      teamA: {
        name: game.teamA.name,
        logoUrl: game.teamA.logoUrl
      },
      teamB: {
        name: game.teamB.name,
        logoUrl: game.teamB.logoUrl
      },
      ended: game.ended,
    }));

    res.status(200).json(formattedGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao obter a lista de jogos." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, dateTime, leagueId, teamA, teamB } = req.body;

    // Verifica se a liga existe
    const leagueExists = await League.findById(leagueId);
    if (!leagueExists) {
      return res.status(404).json({ error: 'Liga não encontrada.' });
    }

    const newGame = new Game({ name, dateTime, league: leagueId, teamA, teamB });
    await newGame.save();

    res.status(201).json({ message: "Jogo adicionado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao adicionar o jogo." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const gameId = req.params.id;
    const { name, dateTime, teamA, teamB } = req.body;
    const updatedGame = await Game.findByIdAndUpdate(gameId, {
      name,
      dateTime,
      teamA,
      teamB,
    });
    if (!updatedGame) {
      return res.status(404).json({ error: "Jogo não encontrado." });
    }
    res.status(200).json({ message: "Jogo atualizado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o jogo." });
  }
});

router.put("/:id/result", async (req, res) => {
  try {
    const gameId = req.params.id;
    const { result } = req.body;

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: "Jogo não encontrado." });
    }

    if (game.ended) {
      return res.status(400).json({ error: "Este jogo já foi concluído." });
    }

    const updatedGame = await Game.findByIdAndUpdate(
      gameId,
      { result, ended: true },
      { new: true }
    );

    const bets = await Bet.find({ gameId });
    for (const bet of bets) {
      const odd = await Odd.findById(bet.oddId);
      let wonAmount = 0;
      let historyResult = "lost";

      if (result === "teamA" && bet.betType === "teamA") {
        wonAmount = bet.betAmount * odd.teamAOdd;
        historyResult = "won";
      } else if (result === "teamB" && bet.betType === "teamB") {
        wonAmount = bet.betAmount * odd.teamBOdd;
        historyResult = "won";
      } else if (result === "draw" && bet.betType === "draw") {
        wonAmount = bet.betAmount * odd.drawOdd;
        historyResult = "won";
      }

      await Bet.findByIdAndUpdate(bet._id, { wonAmount, result });

      const historyEntry = new BettingHistory({
        userId: bet.userId,
        gameId: gameId,
        betId: bet._id,
        result: historyResult,
      });
      await historyEntry.save();
    }

    res
      .status(200)
      .json({ message: "Resultado do jogo atualizado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o resultado do jogo." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const gameId = req.params.id;
    const deletedGame = await Game.findByIdAndDelete(gameId);
    if (!deletedGame) {
      return res.status(404).json({ error: "Jogo não encontrado." });
    }
    res.status(200).json({ message: "Jogo removido com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover o jogo." });
  }
});

module.exports = router;
