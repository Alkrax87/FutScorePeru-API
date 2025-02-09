const mongoose = require("mongoose");

const performanceL3Schema = new mongoose.Schema(
  {
    teamId: { type: String, required: true },
    regular: {
      pg: { type: Number, default: 0 },
      pe: { type: Number, default: 0 },
      pp: { type: Number, default: 0 },
      gf: { type: Number, default: 0 },
      gc: { type: Number, default: 0 },
      sanction: { type: Number, default: 0 },
    },
    final: {
      pg: { type: Number, default: 0 },
      pe: { type: Number, default: 0 },
      pp: { type: Number, default: 0 },
      gf: { type: Number, default: 0 },
      gc: { type: Number, default: 0 },
      sanction: { type: Number, default: 0 },
    },
  },
  {
    collection: "performanceL3",
    versionKey: false,
  }
);

module.exports = mongoose.model("PerformanceL3", performanceL3Schema);
