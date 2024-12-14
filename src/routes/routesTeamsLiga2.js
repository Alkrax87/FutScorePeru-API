const express = require("express");
const router = express.Router();
const teamsLiga2Controller = require("../controllers/teamsLiga2Controller");

router.get("/", teamsLiga2Controller.getAllTeams);
router.get("/:teamId", teamsLiga2Controller.getTeamByTeamId);

module.exports = router;
