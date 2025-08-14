const { Schema } = require('mongoose');
const { dbContent } = require('../config/database');

const BracketSchema = new Schema(
  {
    name: { type: String, required: true },
    status: { type: Boolean, default: false },
  },
  { _id: false }
);

const DivisionSchema = new Schema(
  {
    divisionId: { type: Number, required: true },
    sup: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    season: { type: Number, required: true },
    teams: { type: Number, required: true },
    firstPhase: {
      name: { type: String, required: true },
      inGame: { type: Number, default: 1 },
      status: { type: Boolean, default: false },
    },
    secondPhase: {
      name: { type: String, required: true },
      inGame: { type: Number, default: 1 },
      status: { type: Boolean, default: false },
    },
    thirdPhase: {
      name: { type: String, required: true },
      status: { type: Boolean, default: false },
    },
    brackets: {
      bracket32: { type: BracketSchema, default: undefined },
      bracket16: { type: BracketSchema, default: undefined },
      bracket8: { type: BracketSchema, default: undefined },
      bracket4: { type: BracketSchema, default: undefined },
      bracket2: { type: BracketSchema, default: undefined },
      bracket1: { type: BracketSchema, default: undefined },
      bracketExtra: { type: BracketSchema, default: undefined },
    },
  },
  {
    collection: 'division',
    versionKey: false,
  }
);

module.exports = dbContent.model('Division', DivisionSchema);