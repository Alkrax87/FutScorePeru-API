const express = require("express");
const { getFixture, getFixtureByCategory, createFixture, updateFixture, deleteFixture } = require("../controllers/fixture.controller");
const router = express.Router();

router.get("", getFixture);
router.get("/category/:category", getFixtureByCategory);
router.post("/", createFixture);
router.put("/:category", updateFixture);
router.delete("/:category", deleteFixture);

module.exports = router;