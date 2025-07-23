const express = require("express");
const { getStatisticsByCategory } = require("../controllers/statisticsController");
const router = express.Router();

router.get("/:category", getStatisticsByCategory);

module.exports = router;