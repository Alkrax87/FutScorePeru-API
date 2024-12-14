const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    teamId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    abbreviation: { type: String, required: true },
    image: { type: String, required: true },
    imageThumbnail: { type: String, required: true },
    alt: { type: String, required: true },
    url: { type: String, required: true },
    stadium: {
      url: { type: String, required: true },
    },
    location: { type: String, required: true },
    color: {
      c1: { type: String, required: true },
      c2: { type: String, required: true },
      c3: { type: String, required: true },
    },
    manager: {
      url: { type: String, required: true },
    },
    lastgames: {
      apertura: { type: [String], default: Array(5).fill("") },
      clausura: { type: [String], default: Array(5).fill("") },
    },
    performance: {
      apertura: {
        pe: { type: Number, default: null },
        pp: { type: Number, default: null },
        pg: { type: Number, default: null },
        gf: { type: Number, default: null },
        gc: { type: Number, default: null },
      },
      clausura: {
        pg: { type: Number, default: null },
        pe: { type: Number, default: null },
        pp: { type: Number, default: null },
        gf: { type: Number, default: null },
        gc: { type: Number, default: null },
      },
      sanction: { type: Number, default: null },
    },
    results: {
      apertura: [
        {
          game: { type: Number, required: true },
          score: { type: Number, default: null },
        },
      ],
      clausura: [
        {
          game: { type: Number, required: true },
          score: { type: Number, default: null },
        },
      ],
    },
  },
  {
    collection: "teams",
  }
);

module.exports = mongoose.model("Team", TeamSchema);
