const express = require("express")
const router = express.Router();
const performanceController = require("../controllers/performaceController");

router.get("/:division", performanceController.getAllPerformance);
router.get("/:division/:teamId", performanceController.getPerformanceByTeamId);
router.post("/:division", performanceController.createPerformance);
router.delete("/:division/:teamId", performanceController.deletePerformance);

module.exports = router;