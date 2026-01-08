const { Schema } = require('mongoose');
const { dbContent } = require('../config/database');

const TeamDetailsSchema = new Schema(
  {
    teamId: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    founded: { type: Number, required: true },
    website: { type: String, required: false },
    social: {
      facebook: { type: String, required: false },
      instagram: { type: String, required: false },
      twitter: { type: String, required: false },
      youtube: { type: String, required: false },
      tiktok: { type: String, required: false },
    },
  },
  {
    collection: 'teamDetails',
    versionKey: false,
  }
);

module.exports = dbContent.model('TeamDetails', TeamDetailsSchema);