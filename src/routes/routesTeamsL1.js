const express = require("express");
const router = express.Router();
const teamsL1Controller = require("../controllers/teamsL1Controller");

router.get("/", teamsL1Controller.getAllTeamsL1);
router.get("/:teamId", teamsL1Controller.getTeamL1ByTeamId);
router.post("/", teamsL1Controller.createTeamL1);
router.put("/:teamId", teamsL1Controller.updateTeamL1);
router.delete("/:teamId", teamsL1Controller.deleteTeamL1);

module.exports = router;