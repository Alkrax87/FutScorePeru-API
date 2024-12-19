const mongoose = require("mongoose");

const lastGamesL1Schema = new mongoose.Schema(
  {
    teamId: { type: String, required: true },
    apertura: { type: [String], default: Array(5).fill("") },
    clausura: { type: [String], default: Array(5).fill("") },
  },
  {
    collection: "lastGamesL1",
    versionKey: false,
  }
);

module.exports = mongoose.model("lastGamesL1", lastGamesL1Schema);
