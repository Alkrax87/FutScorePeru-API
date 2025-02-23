const crypto = require("crypto");
const ApiKey = require("../models/ApiKey");

const generateAPIKey = async (req, res) => {
  try {
    const { plan } = req.body;

    const apiKey = crypto.randomBytes(20).toString("hex");
    const requests = plan === "premium" ? 1000 : 50;

    await ApiKey.create({
      key: apiKey,
      plan,
      requestsRemaining: requests,
    });

    res.json({ apiKey, requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ An error ocurred generating API Key" });
  }
};

module.exports = {
  generateAPIKey,
};