const express = require("express");
const { getPerformance, getPerformanceByTeamId, changePerformanceByTeamId } = require("../controllers/performaceController");
const router = express.Router();;

router.get("/:category", getPerformance);
router.get("/:category/:teamId", getPerformanceByTeamId);
router.put("/:category/:teamId/:destination", changePerformanceByTeamId);

module.exports = router;