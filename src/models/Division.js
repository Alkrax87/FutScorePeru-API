const { Schema } = require('mongoose');
const { dbContent } = require('../config/database');

const DivisionSchema = new Schema(
  {
    category: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    sup: { type: String, required: true },
    image: { type: String, required: true },
    teams: { type: Number, required: true },
    season: { type: Number, required: true },
    phase1: {
      name: { type: String },
      inGame: { type: Number },
      status: { type: Boolean },
    },
    phase2: {
      name: { type: String },
      inGame: { type: Number },
      status: { type: Boolean },
    },
    phase3: {
      name: { type: String },
      status: { type: Boolean },
    },
  },
  {
    collection: 'division',
    versionKey: false,
  },
);

module.exports = dbContent.model('Division', DivisionSchema);