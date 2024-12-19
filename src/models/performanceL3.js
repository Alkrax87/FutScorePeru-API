const mongoose = require("mongoose");

const performanceL3Schema = new mongoose.Schema(
  {
    teamId: { type: String, required: true },
    regular: {
      points: { type: Number, default: 0 },
      pj: { type: Number, default: 0 },
      pg: { type: Number, default: 0 },
      pe: { type: Number, default: 0 },
      pp: { type: Number, default: 0 },
      gf: { type: Number, default: 0 },
      gc: { type: Number, default: 0 },
      dg: { type: Number, default: 0 },
      sanction: { type: Number, default: null },
    },
    final: {
      points: { type: Number, default: 0 },
      pj: { type: Number, default: 0 },
      pg: { type: Number, default: 0 },
      pe: { type: Number, default: 0 },
      pp: { type: Number, default: 0 },
      gf: { type: Number, default: 0 },
      gc: { type: Number, default: 0 },
      dg: { type: Number, default: 0 },
      sanction: { type: Number, default: null },
    },
  },
  {
    collection: "performanceL3",
    versionKey: false,
  }
);

module.exports = mongoose.model("PerformanceL3", performanceL3Schema);
