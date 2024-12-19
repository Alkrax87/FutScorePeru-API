const express = require("express");
const router = express.Router();
const teamsL1Controller = require("../controllers/teamsL1Controller");

router.get("/", teamsL1Controller.getAllTeams);
router.get("/:teamId", teamsL1Controller.getTeamByTeamId);
router.post("/", teamsL1Controller.createTeam);
router.put("/:teamId", teamsL1Controller.updateTeam);
router.delete("/:teamId", teamsL1Controller.deleteTeam);

module.exports = router;
