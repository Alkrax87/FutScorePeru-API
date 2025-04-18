const express = require("express");
const { getTeamPageById } = require("../controllers/teamPageController");
const router = express.Router();

router.get("/:teamId", getTeamPageById);

module.exports = router;