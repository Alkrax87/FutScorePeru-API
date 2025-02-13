const express = require("express");
const { getLastGames, getLastGamesByTeamId, changeLastGamesByTeamId } = require("../controllers/lastGamesController");
const router = express.Router();

router.get("/:category", getLastGames);
router.get("/:category/:teamId", getLastGamesByTeamId);
router.put("/:category/:teamId/:destination/:option", changeLastGamesByTeamId);

module.exports = router;