const { Schema } = require('mongoose');
const { dbContent } = require('../config/database');

const TeamMatchResultsSchema = new Schema(
  {
    teamId: { type: String, required: true, unique: true },
    category: { type: Number, required: true },
    phase1: { type: [Number || null], default: [] },
    phase2: { type: [Number || null], default: [] },
  },
  {
    collection: 'teamMatchResults',
    versionKey: false,
  }
);

module.exports = dbContent.model('TeamMatchResults', TeamMatchResultsSchema);