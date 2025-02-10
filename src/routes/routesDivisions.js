const express = require("express");
const router = express.Router();
const divisionsController = require("../controllers/divisionsController");

router.get("/:division", divisionsController.getDivisionSettings);

module.exports = router;
