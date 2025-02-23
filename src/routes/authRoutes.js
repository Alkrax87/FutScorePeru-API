const express = require("express");
const { generateAPIKey } = require("../controllers/authController");
const router = express.Router();

router.post("/generate", generateAPIKey);

module.exports = router;