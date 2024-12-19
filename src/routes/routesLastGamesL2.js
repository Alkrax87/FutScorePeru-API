const express = require("express");
const router = express.Router();
const lastGamesL2Controller = require("../controllers/lastGamesL2Controller");

router.get("/", lastGamesL2Controller.getAllLastGamesL2);
router.get("/:teamId", lastGamesL2Controller.getLastGamesL2ByTeamId);
router.post("/", lastGamesL2Controller.createLastGamesL2);
router.put("/:teamId/:destination/:option", lastGamesL2Controller.changeLastGamesL2ByTeamId);
router.delete("/:teamId", lastGamesL2Controller.deleteLastGamesL2);

module.exports = router;