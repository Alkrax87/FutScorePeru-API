const { Schema } = require('mongoose');
const { dbContent } = require('../config/database');

const TeamPerformanceSchema = new Schema(
  {
    teamId: { type: String, required: true, unique: true },
    category: { type: Number, required: true },
    phase1: {
      w: { type: Number, default: 0 },
      d: { type: Number, default: 0 },
      l: { type: Number, default: 0 },
      gf: { type: Number, default: 0 },
      ga: { type: Number, default: 0 },
      sanction: { type: Number, default: 0 },
    },
    phase2: {
      w: { type: Number, default: 0 },
      d: { type: Number, default: 0 },
      l: { type: Number, default: 0 },
      gf: { type: Number, default: 0 },
      ga: { type: Number, default: 0 },
      sanction: { type: Number, default: 0 },
      addition: { type: Number, default: 0 },
    },
  },
  {
    collection: 'teamPerformance',
    versionKey: false,
  }
);

module.exports = dbContent.model('TeamPerformance', TeamPerformanceSchema);