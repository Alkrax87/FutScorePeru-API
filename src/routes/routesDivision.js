const express = require("express");
const { getDivision, createDivision, updateDivision, deleteDivision } = require("../controllers/divisionController");
const router = express.Router();


router.get("/:category", getDivision);
router.post("/", createDivision);
router.put("/:category", updateDivision);
router.delete("/:category", deleteDivision);

module.exports = router;