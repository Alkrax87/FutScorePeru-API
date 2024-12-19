const express = require("express");
const router = express.Router();
const teamsLiga2Controller = require("../controllers/teamsLiga2Controller");

router.get("/", teamsLiga2Controller.getAllTeams);
router.get("/:teamId", teamsLiga2Controller.getTeamByTeamId);
router.post("/", teamsLiga2Controller.createTeam);
router.put("/:teamId", teamsLiga2Controller.updateTeam);
router.delete("/:teamId", teamsLiga2Controller.deleteTeam);

module.exports = router;
