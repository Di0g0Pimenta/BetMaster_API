const express = require("express");
const router = express.Router();
const League = require("../models/league");

router.get("/:game", async (req, res) => {
  try {
    const game = req.params.game.toUpperCase();
    const leagues = await League.find({ game });

    res.status(200).json(leagues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao obter a lista de ligas." });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("Dados recebidos na rota de criação de ligas:", req.body);

    if (!req.body.leagues || !Array.isArray(req.body.leagues)) {
      return res.status(400).json({ error: "'leagues' é um campo obrigatório e deve ser um array" });
    }

    const leaguesData = req.body.leagues;

    for (let i = 0; i < leaguesData.length; i++) {
      const { name, game } = leaguesData[i];

      const leagueExists = await League.findOne({ name, game });
      if (leagueExists) {
        return res.status(400).json({ error: `Liga '${name}' para o jogo '${game}' já existente.` });
      }

      const newLeague = new League({ name, game });

      await newLeague.save();
    }

    res.status(201).json({ message: 'Ligas criadas com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar as ligas.' });
  }
});

module.exports = router;
