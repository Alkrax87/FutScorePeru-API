const mongoose = require('mongoose');

const lastGamesL3Schema = new mongoose.Schema(
  {
    teamId: { type: String, required: true },
    regular: { type: [String], default: Array(5).fill('') },
    final: { type: [String], default: Array(5).fill('') }
  },
  {
    collection: 'lastGamesL3',
    versionKey: false
  }
);

module.exports = mongoose.model('lastGamesL3', lastGamesL3Schema);