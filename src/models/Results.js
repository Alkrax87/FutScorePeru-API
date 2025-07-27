const { Schema } = require('mongoose');
const { dbContent } = require('../config/database');

const ResultsSchema = new Schema(
  {
    teamId: { type: String, required: true, unique: true },
    category: { type: Number, required: true },
    apertura: { type: [Number], default: undefined },
    clausura: { type: [Number], default: undefined },
    regional: { type: [Number], default: undefined },
    grupos: { type: [Number], default: undefined },
    final: { type: [Number], default: undefined },
  },
  {
    collection: 'results',
    versionKey: false,
  }
);

module.exports = dbContent.model('Results', ResultsSchema);