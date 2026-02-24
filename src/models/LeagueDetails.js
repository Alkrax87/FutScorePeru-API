const { Schema } = require('mongoose');
const { dbContent } = require('../config/database');

const Team = new Schema(
  {
    year: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: false },
    province: { type: String, required: true },
  },
  {
    _id: false,
  },
);

const LeagueDetailsSchema = new Schema(
  {
    leagueId: { type: String, required: true, unique: true },
    founded: { type: Number, required: true },
    topChampion: {
      name: { type: String, required: true },
      image: { type: String, required: true },
      province: { type: String, required: true },
      titles: { type: Number, required: true },
    },
    provincialLeagues: { type: [String], required: true },
    historicalChampions: { type: [Team], required: true },
  },
  {
    collection: 'leagueDetails',
    versionKey: false,
  },
);

module.exports = dbContent.model('LeagueDetails', LeagueDetailsSchema);
