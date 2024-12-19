const express = require("express");
const router = express.Router();
const teamsL2Controller = require("../controllers/teamsL2Controller");

router.get("/", teamsL2Controller.getAllTeams);
router.get("/:teamId", teamsL2Controller.getTeamByTeamId);
router.post("/", teamsL2Controller.createTeam);
router.put("/:teamId", teamsL2Controller.updateTeam);
router.delete("/:teamId", teamsL2Controller.deleteTeam);

module.exports = router;
