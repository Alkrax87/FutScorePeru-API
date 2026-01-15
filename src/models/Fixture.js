const { Schema } = require('mongoose');
const { dbContent } = require('../config/database');

const MatchSchema = new Schema(
  {
    home: { type: String, required: true },
    away: { type: String, required: true },
    postponed: { type: Boolean, default: false },
    date: { type: Date || null, default: null },
  },
  {
    _id: false,
  }
);

const MatchdaySchema = new Schema(
  {
    round: { type: Number, required: true },
    matches: { type: [MatchSchema], required: true, default: [] },
  },
  {
    _id: false,
  }
);

const FixtureSchema = new Schema(
  {
    category: { type: Number, required: true, unique: true },
    phase1: { type: [MatchdaySchema], required: true, default: [] },
    phase2: { type: [MatchdaySchema], required: true, default: [] },
  },
  {
    collection: 'fixture',
    versionKey: false,
  }
);

module.exports = dbContent.model('Fixure', FixtureSchema);