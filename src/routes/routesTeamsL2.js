const express = require("express");
const router = express.Router();
const teamsL2Controller = require("../controllers/teamsL2Controller");

router.get("/", teamsL2Controller.getAllTeamsL2);
router.get("/:teamId", teamsL2Controller.getTeamL2ByTeamId);
router.post("/", teamsL2Controller.createTeamL2);
router.put("/:teamId", teamsL2Controller.updateTeamL2);
router.delete("/:teamId", teamsL2Controller.deleteTeamL2);

module.exports = router;