const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teamsLiga1Controller");

router.get("/", teamsController.getAllTeams);
router.get("/:teamId", teamsController.getTeamByTeamId);

module.exports = router;
