const mongoose = require("mongoose");

const performanceL1Schema = new mongoose.Schema(
  {
    teamId: { type: String, required: true },
    apertura: {
      points: { type: Number, default: 0 },
      pj: { type: Number, default: 0 },
      pg: { type: Number, default: 0 },
      pe: { type: Number, default: 0 },
      pp: { type: Number, default: 0 },
      gf: { type: Number, default: 0 },
      gc: { type: Number, default: 0 },
      dg: { type: Number, default: 0 },
    },
    clausura: {
      points: { type: Number, default: 0 },
      pj: { type: Number, default: 0 },
      pg: { type: Number, default: 0 },
      pe: { type: Number, default: 0 },
      pp: { type: Number, default: 0 },
      gf: { type: Number, default: 0 },
      gc: { type: Number, default: 0 },
      dg: { type: Number, default: 0 },
    },
    saction: { type: Number, default: null },
  },
  {
    collection: "performanceL1",
    versionKey: false,
  }
);

module.exports = mongoose.model("PerformanceL1", performanceL1Schema);
