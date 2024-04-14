const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const SongDB = require("../db/song");
SongDB.Init(mongoose);

router.get("/all", async (req, res) => {
  const data = await SongDB.All();
  res.json(data);
});

module.exports = router;
