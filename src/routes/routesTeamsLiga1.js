const express = require("express");
const router = express.Router();
const teamsLiga1Controller = require("../controllers/teamsLiga1Controller");

router.get("/", teamsLiga1Controller.getAllTeams);
router.get("/:teamId", teamsLiga1Controller.getTeamByTeamId);
router.post("/", teamsLiga1Controller.createTeam);
router.put("/:teamId", teamsLiga1Controller.updateTeam);
router.delete("/:teamId", teamsLiga1Controller.deleteTeam);

module.exports = router;
