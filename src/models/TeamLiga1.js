const mongoose = require("mongoose");

const TeamLiga1Schema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    teamId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    abbreviation: { type: String, required: true },
    image: { type: String, required: true },
    imageThumbnail: { type: String, required: true },
    alt: { type: String, required: true },
    url: { type: String, required: true },
    location: { type: String, required: true },
    color: {
      c1: { type: String, required: true },
      c2: { type: String, required: true },
      c3: { type: String, required: false },
    },
    stadium: {
      url: { type: String, required: true },
    },
    manager: {
      url: { type: String, required: true },
    },
    lastgames: {
      url: { type: String, required: true },
    },
    performance: {
      url: { type: String, required: true },
    },
    results: {
      url: { type: String, required: true },
    },
  },
  {
    collection: "teamsLiga1",
    versionKey: false,
  }
);

module.exports = mongoose.model("TeamLiga1", TeamLiga1Schema);
