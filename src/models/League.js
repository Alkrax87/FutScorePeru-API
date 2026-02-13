const { Schema } = require('mongoose');
const { dbContent } = require('../config/database');

const LeagueSchema = new Schema(
  {
    leagueId: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    imageThumbnail: { type: String, required: true },
    alt: { type: String, required: true },
    location: { type: String, required: true },
    color: {
      c1: { type: String, required: true },
      c2: { type: String, required: true },
    },
    teams: { type: [String] },
  },
  {
    collection: 'leagues',
    versionKey: false,
  },
);

module.exports = dbContent.model('league', LeagueSchema);