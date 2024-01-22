const express = require("express");
const router = express.Router();
const League = require("../models/league");

router.post("/", async (req, res) => {
  try {
    console.log("Dados recebidos na rota de criação de ligas:", req.body);

    // Verifique se 'leagues' está presente no corpo da solicitação
    if (!req.body.leagues || !Array.isArray(req.body.leagues)) {
      return res.status(400).json({ error: "'leagues' é um campo obrigatório e deve ser um array" });
    }

    // Processar as ligas
    const leaguesData = req.body.leagues;

    // Itere sobre os dados e crie instâncias de Liga
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
