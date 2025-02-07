const express = require("express");
const router = express.Router();
const fixtureController = require("../controllers/fixtureController");

router.get("/:division", fixtureController.getFixture);

module.exports = router;