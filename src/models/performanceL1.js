const mongoose = require("mongoose");

const performanceL1Schema = new mongoose.Schema(
  {
    teamId: { type: String, required: true },
    apertura: {
      pg: { type: Number, default: 0 },
      pe: { type: Number, default: 0 },
      pp: { type: Number, default: 0 },
      gf: { type: Number, default: 0 },
      gc: { type: Number, default: 0 },
    },
    clausura: {
      pg: { type: Number, default: 0 },
      pe: { type: Number, default: 0 },
      pp: { type: Number, default: 0 },
      gf: { type: Number, default: 0 },
      gc: { type: Number, default: 0 },
    },
    sanction: { type: Number, default: 0 },
  },
  {
    collection: "performanceL1",
    versionKey: false,
  }
);

module.exports = mongoose.model("PerformanceL1", performanceL1Schema);
