const express = require("express");
const router = express.Router();
const League = require("../models/league");

router.post("/", async (req, res) => {
  try {
    const { name, game } = req.body;

    const leagueExists = await League.findOne({ name, game });
    if (leagueExists) {
      return res.status(400).json({ error: 'Liga já existente.' });
    }

    const newLeague = new League({ name, game });

    await newLeague.save();

    res.status(201).json({ message: 'Liga criada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a liga.' });
  }
});

module.exports = router;
