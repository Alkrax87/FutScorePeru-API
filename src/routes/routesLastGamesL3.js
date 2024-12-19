const express = require("express");
const router = express.Router();
const lastGamesL3Controller = require("../controllers/lastGamesL3Controller");

router.get("/", lastGamesL3Controller.getAllLastGamesL3);
router.get("/:teamId", lastGamesL3Controller.getLastGamesL3ByTeamId);
router.post("/", lastGamesL3Controller.createLastGamesL3);
router.put("/:teamId/:destination/:option", lastGamesL3Controller.changeLastGamesL3ByTeamId);
router.delete("/:teamId", lastGamesL3Controller.deleteLastGamesL3);

module.exports = router;