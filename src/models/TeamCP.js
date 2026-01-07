const { Schema } = require('mongoose');
const { dbContent } = require('../config/database');

const TeamCPSchema = new Schema(
  {
    teamId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    abbreviation: { type: String, required: true },
    image: { type: String, required: false },
    location: { type: String, required: false },
    city: { type: String, required: false },
  },
  {
    collection: 'teamsCP',
    versionKey: false,
  }
);

module.exports = dbContent.model('TeamCP', TeamCPSchema);