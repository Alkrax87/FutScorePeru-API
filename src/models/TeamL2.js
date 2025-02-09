const mongoose = require("mongoose");

const TeamL2Schema = new mongoose.Schema(
  {
    teamId: { type: String, unique: true, required: true },
    group: { type: String, required: true },
    name: { type: String, required: true },
    abbreviation: { type: String, required: true },
    image: { type: String, required: true },
    imageThumbnail: { type: String, required: true },
    alt: { type: String, required: true },
    url: { type: String, required: true },
    location: { type: String, required: true },
    stadium: { type: Number, required: true },
    color: {
      c1: { type: String, required: true },
      c2: { type: String, required: false },
    }
  },
  {
    collection: "teamsLiga2",
    versionKey: false,
  }
);

module.exports = mongoose.model("TeamL2", TeamL2Schema);
