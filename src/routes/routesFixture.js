const express = require("express");
const { getFixture, createFixture, deleteFixture, getFixtureByTeamId } = require("../controllers/fixtureController");
const router = express.Router();

router.get("/:category", getFixture);
router.get("/:category/:teamId", getFixtureByTeamId);
router.post("/", createFixture);
router.delete("/:category", deleteFixture);

module.exports = router;