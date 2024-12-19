const express = require("express");
const router = express.Router();
const lastGamesL1Controller = require("../controllers/lastGamesL1Controller");

router.get("/", lastGamesL1Controller.getAllLastGamesL1);
router.get("/:teamId", lastGamesL1Controller.getLastGamesL1ByTeamId);
router.post("/", lastGamesL1Controller.createLastGamesL1);
router.put("/:teamId/:destination/:option", lastGamesL1Controller.changeLastGamesL1ByTeamId);
router.delete("/:teamId", lastGamesL1Controller.deleteLastGamesL1);

module.exports = router;