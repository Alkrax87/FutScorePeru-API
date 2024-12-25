const express = require("express");
const router = express.Router();
const lastGamesController = require("../controllers/lastGamesController");

router.get("/:division", lastGamesController.getAllLastGames);
router.get("/:division/:teamId", lastGamesController.getAllLastGamesById);
router.post("/:division/", lastGamesController.createLastGames);
router.put("/:division/:teamId/:destination/:option", lastGamesController.changeLastGamesByTeamId);
router.delete("/:division/:teamId", lastGamesController.deleteLastGames);

module.exports = router;