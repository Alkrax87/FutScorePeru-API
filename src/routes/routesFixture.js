const express = require("express");
const { getFixture, createFixture, deleteFixture } = require("../controllers/fixtureController");
const router = express.Router();

router.get("/:category", getFixture);
router.post("/", createFixture);
router.delete("/:category", deleteFixture);

module.exports = router;