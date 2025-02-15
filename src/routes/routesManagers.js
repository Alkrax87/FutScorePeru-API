const express = require("express");
const { getManagers, getManagerByTeamId, createManager, updateManager, deleteManager } = require("../controllers/managerController");
const router = express.Router();

router.get("/:category", getManagers);
router.post("/:category", createManager);
router.get("/:category/:teamId", getManagerByTeamId);
router.put("/:category/:managerId", updateManager);
router.delete("/:category/:managerId", deleteManager);

module.exports = router;