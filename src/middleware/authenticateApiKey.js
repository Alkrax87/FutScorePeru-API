const ApiKey = require("../models/ApiKey");

const authenticateAPIKey = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(403).json({ error: "❌ API Key required" });
  }

  const keyData = await ApiKey.findOne({
    key: apiKey,
  });

  if (!keyData) {
    return res.status(403).json({ error: "❌ Invalid API Key" });
  }

  if (!keyData.status) {
    return res.status(403).json({ error: "❌ API Key disabled" });
  }

  if (keyData.requestsRemaining <= 0) {
    return res.status(429).json({ error: "⚠️ Rate limit exceeded" });
  }

  keyData.requestsRemaining -= 1;
  await keyData.save();

  next();
};

module.exports = {
  authenticateAPIKey,
};