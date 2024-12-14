const express = require("express");
const router = express.Router();
const teamsLiga1Controller = require("../controllers/teamsLiga1Controller");

router.get("/", teamsLiga1Controller.getAllTeams);
router.get("/:teamId", teamsLiga1Controller.getTeamByTeamId);

module.exports = router;
