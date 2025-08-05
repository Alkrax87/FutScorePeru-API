const { Schema } = require('mongoose');
const { dbContent } = require('../config/database');

const TeamInformationSchema = new Schema(
  {
    teamId: { type: String, required: true, unique: true },
    foundation: { type: Number, required: true },
    background: { type: String, required: true },
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
    collection: 'teamsInformation',
    versionKey: false,
  }
);

module.exports = dbContent.model('TeamInformation', TeamInformationSchema);