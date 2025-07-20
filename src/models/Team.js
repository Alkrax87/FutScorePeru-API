const { Schema } = require('mongoose');
const { dbContent } = require('../config/database');

const TeamSchema = new Schema(
  {
    teamId: { type: String, required: true, unique: true },
    category: { type: Number, required: true },
    groupFirstPhase: { type: String, required: false },
    groupSecondPhase: { type: String, required: false },
    name: { type: String, required: true },
    abbreviation: { type: String, required: true },
    image: { type: String, required: true },
    imageThumbnail: { type: String, required: true },
    alt: { type: String, required: true },
    location: { type: String, required: true },
    stadium: { type: Number, required: true, default: 0 },
    color: {
      c1: { type: String, required: true },
      c2: { type: String, required: true },
    },
  },
  {
    collection: 'teams',
    versionKey: false,
  }
);

module.exports = dbContent.model('Team', TeamSchema);