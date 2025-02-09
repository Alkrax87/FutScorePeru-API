const mongoose = require("mongoose");

const performanceL2Schema = new mongoose.Schema(
  {
    teamId: { type: String, required: true },
    regional: {
      pg: { type: Number, default: 0 },
      pe: { type: Number, default: 0 },
      pp: { type: Number, default: 0 },
      gf: { type: Number, default: 0 },
      gc: { type: Number, default: 0 },
      sanction: { type: Number, default: 0 },
    },
    grupos: {
      pg: { type: Number, default: 0 },
      pe: { type: Number, default: 0 },
      pp: { type: Number, default: 0 },
      gf: { type: Number, default: 0 },
      gc: { type: Number, default: 0 },
      sanction: { type: Number, default: 0 },
    },
  },
  {
    collection: "performanceL2",
    versionKey: false,
  }
);

module.exports = mongoose.model("PerformanceL2", performanceL2Schema);
