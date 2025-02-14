const express = require("express");
const { getMapElements, changeMapElementStatus} = require("../controllers/mapController");
const router = express.Router();

router.get("/:category", getMapElements);
router.put("/:category/:mapId", changeMapElementStatus);

module.exports = router;