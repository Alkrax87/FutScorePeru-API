const { Schema } = require('mongoose');
const { dbContent } = require('../config/database');

const LastGamesSchema = new Schema(
  {
    teamId: { type: String, required: true, unique: true },
    category: { type: Number, required: true },
    apertura: { type: [String], default: undefined },
    clausura: { type: [String], default: undefined },
    regional: { type: [String], default: undefined },
    grupos: { type: [String], default: undefined },
    final: { type: [String], default: undefined },
  },
  {
    collection: 'lastGames',
    versionKey: false,
  }
);

module.exports = dbContent.model('LastGames', LastGamesSchema);