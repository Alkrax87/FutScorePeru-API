const express = require("express");
const router = express.Router();
const stadiumController = require("../controllers/stadiumController");

router.get("/", stadiumController.getAllStadiums);
router.get("/:stadiumId", stadiumController.getStadiumByStadiumId);
router.post("/", stadiumController.createStadium);
router.put("/:stadiumId", stadiumController.updateStadium);
router.delete("/:stadiumId", stadiumController.deleteStadium);

module.exports = router;
