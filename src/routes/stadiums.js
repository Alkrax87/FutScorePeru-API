const express = require("express");
const router = express.Router();
const stadiumController = require("../controllers/stadiumController");

router.get("/", stadiumController.getAllStadiums);
router.get("/:stadiumId", stadiumController.getStadiumsByStadiumId);

module.exports = router;
