const express = require("express");
const router = express.Router();
const divisionsController = require("../controllers/divisionsController");

router.get("/:division", divisionsController.getDivisionSettings);
router.post("/", divisionsController.createDivisionSettings);
router.put("/:division", divisionsController.updateDivisionSettings);
router.delete("/:division", divisionsController.deleteDivisionSettings);

module.exports = router;
