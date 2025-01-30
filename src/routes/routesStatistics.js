const express = require("express");
const router = express.Router();
const statisticsController = require("../controllers/statisticsController");

router.get("/:division", statisticsController.getStatistics);

module.exports = router;
