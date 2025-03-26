const { Schema } = require("mongoose");
const { dbContent } = require("../config/database");

const TeamSchema = new Schema(
  {
    teamId: { type: String, required: true, unique: true },
    category: { type: Number, required: true },
    groupFirstPhase: { type: String, required: false },
    groupSecondPhase: { type: String, required: false },
    name: { type: String, required: true },
    abbreviation: { type: String, required: true },
    image: { type: String, required: true },
    imageThumbnail: { type: String, required: true },
    alt: { type: String, required: true },
    location: { type: String, required: true },
    stadium: { type: Number || null },
    color: {
      c1: { type: String, required: true },
      c2: { type: String, required: false },
    },
    lastgames: [
      {
        _id: false,
        name: { type: String, required: true },
        values: { type: [String], default: [] },
      },
    ],
    performance: [
      {
        _id: false,
        name: { type: String, required: true },
        pg: { type: Number, default: 0 },
        pe: { type: Number, default: 0 },
        pp: { type: Number, default: 0 },
        gf: { type: Number, default: 0 },
        gc: { type: Number, default: 0 },
        sanction: { type: Number, default: 0 },
        addition: { type: Number, default: 0 },
      },
    ],
    results: [
      {
        _id: false,
        name: { type: String, required: true },
        score: { type: [Number | null], default: [] },
      },
    ],
  },
  {
    collection: "teams",
    versionKey: false,
  }
);

module.exports = dbContent.model("Team", TeamSchema);
