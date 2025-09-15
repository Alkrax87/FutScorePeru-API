const { Schema } = require('mongoose');
const { dbContent } = require('../config/database');

const BracketSchema = new Schema(
  {
    matchKey: { type: String, required: true },
    nextKey: { type: String, required: true },
    teamA: {
      teamId: { type: String, required: true },
      results: {
        firstLegScore: { type: Number, default: null },
        secondLegScore: { type: Number, default: null },
        penalties: { type: Number, default: null },
      },
    },
    teamB: {
      teamId: { type: String, required: true },
      results: {
        firstLegScore: { type: Number, default: null },
        secondLegScore: { type: Number, default: null },
        penalties: { type: Number, default: null },
      },
    },
  },
  { _id: false }
);

const FixtureBracketSchema = new Schema(
  {
    divisionId: { type: Number, required: true },
    bracket16: { type: [BracketSchema], default: undefined },
    bracket8: { type: [BracketSchema], default: undefined },
    bracket4: { type: [BracketSchema], default: undefined },
    bracket2: { type: [BracketSchema], default: undefined },
    bracket1: { type: [BracketSchema], default: undefined },
    bracketExtra: { type: [BracketSchema], default: undefined },
  },
  {
    collection: 'fixtureBracket',
    versionKey: false,
  }
);

module.exports = dbContent.model('FixtureBracketSchema', FixtureBracketSchema);