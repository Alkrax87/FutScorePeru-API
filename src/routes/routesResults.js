const express = require("express");
const { getResults, getResultsByTeamId, changeResultsByTeamId } = require("../controllers/resultsController");
const router = express.Router();

router.get("/:category", getResults);
router.get("/:category/:teamId", getResultsByTeamId);
router.put("/:category/:teamId/:destination/:index", changeResultsByTeamId);

module.exports = router;