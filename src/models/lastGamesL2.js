const mongoose = require("mongoose");

const lastGamesL2Schema = new mongoose.Schema(
  {
    teamId: { type: String, required: true },
    regional: { type: [String], default: Array(5).fill("") },
    grupos: { type: [String], default: Array(5).fill("") },
  },
  {
    collection: "lastGamesL2",
    versionKey: false,
  }
);

module.exports = mongoose.model("lastGamesL2", lastGamesL2Schema);
