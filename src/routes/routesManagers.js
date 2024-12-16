const express = require("express");
const router = express.Router();
const managerController = require("../controllers/managerController");

router.get("/", managerController.getAllManagers);
router.get("/:teamId", managerController.getManagerByTeamId);
router.post("/", managerController.createManager);
router.put("/:managerId", managerController.updateManagerByManagerId);
router.delete("/:teamId", managerController.deleteManager);

module.exports = router;
