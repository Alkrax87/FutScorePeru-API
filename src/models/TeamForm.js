const { Schema } = require('mongoose');
const { dbContent } = require('../config/database');

const TeamFormSchema = new Schema(
  {
    teamId: { type: String, required: true, unique: true },
    category: { type: Number, required: true },
    phase1: { type: [String], default: [] },
    phase2: { type: [String], default: [] },
  },
  {
    collection: 'teamForm',
    versionKey: false,
  }
);

module.exports = dbContent.model('TeamForm', TeamFormSchema);