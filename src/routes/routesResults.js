const express = require("express");
const router = express.Router();
const resultsController = require("../controllers/resultsController");

router.get("/:division", resultsController.getAllResults);
router.get("/:division/:teamId", resultsController.getResultsByTeamId);
router.post("/:division", resultsController.createResult);
router.delete("/:division/:teamId", resultsController.deleteResult);

module.exports = router;