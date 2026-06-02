const Schema = require('mongoose').Schema;
const dbContent = require('../config/database').dbContent;

const TeamSchema = new Schema(
  {
    teamId: { type: String, required: true },
    w: { type: Number, default: 0 },
    d: { type: Number, default: 0 },
    l: { type: Number, default: 0 },
    gf: { type: Number, default: 0 },
    ga: { type: Number, default: 0 },
    sanction: { type: Number, default: 0 },
  },
  {
    _id: false,
  },
);

const GroupSchema = new Schema(
  {
    name: { type: String, required: true },
    teams: { type: [TeamSchema], required: true, default: [] },
  },
  {
    _id: false,
  },
);

const CupSchema = new Schema(
  {
    cupId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    teams: { type: Number, required: true },
    groups: { type: [GroupSchema], required: true, default: [] },
  },
  {
    collection: 'cups',
    versionKey: false,
  },
);

module.exports = dbContent.model('Cup', CupSchema);