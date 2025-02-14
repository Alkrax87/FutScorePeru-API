const express = require("express");
const { getStatistics } = require("../controllers/statisticsController");
const router = express.Router();

router.get("/:category", getStatistics);

module.exports = router;