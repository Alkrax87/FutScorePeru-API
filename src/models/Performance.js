const { Schema } = require('mongoose');
const { dbContent } = require('../config/database');

const FirstPhaseStatsSchema = new Schema(
  {
    w: { type: Number, default: 0 },
    d: { type: Number, default: 0 },
    l: { type: Number, default: 0 },
    gf: { type: Number, default: 0 },
    ga: { type: Number, default: 0 },
    sanction: { type: Number, default: 0 },
  },
  { _id: false }
);

const SecondPhaseStatsSchema = new Schema(
  {
    w: { type: Number, default: 0 },
    d: { type: Number, default: 0 },
    l: { type: Number, default: 0 },
    gf: { type: Number, default: 0 },
    ga: { type: Number, default: 0 },
    addition: { type: Number, default: 0 },
    sanction: { type: Number, default: 0 },
  },
  { _id: false }
);

const PerformanceSchema = new Schema(
  {
    teamId: { type: String, required: true, unique: true },
    category: { type: Number, required: true },
    apertura: { type: FirstPhaseStatsSchema, default: undefined },
    clausura: { type: FirstPhaseStatsSchema, default: undefined },
    regional: { type: FirstPhaseStatsSchema, default: undefined },
    grupos: { type: SecondPhaseStatsSchema, default: undefined },
    final: { type: SecondPhaseStatsSchema, default: undefined },
  },
  {
    collection: 'performance',
    versionKey: false,
  }
);

module.exports = dbContent.model('Performance', PerformanceSchema);