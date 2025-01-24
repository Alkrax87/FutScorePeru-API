const express = require("express");
const router = express.Router();
const managerController = require("../controllers/managerController");

router.get("/:division/", managerController.getAllManagers);
router.get("/:division/:teamId", managerController.getManagerByTeamId);
router.post("/:division/", managerController.createManager);
router.put("/:division/:managerId", managerController.updateManagerByManagerId);
router.delete("/:division/:teamId", managerController.deleteManager);

module.exports = router;
