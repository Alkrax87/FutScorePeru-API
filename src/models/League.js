const { Schema } = require("mongoose");
const { dbContent } = require("../config/database");

const LeagueSchema = new Schema(
  {
    leagueId: { type: String, required: true, unique: true },
    category: { type: Number, required: true },
    image: { type: String, required: true },
    imageThumbnail: { type: String, required: true },
    alt: { type: String, required: true },
    location: { type: String, required: true },
    color: {
      c1: { type: String, required: true },
      c2: { type: String, required: false },
    },
    teams: [
      {
        _id: false,
        teamId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        abbreviation: { type: String, required: true },
        image: { type: String, required: false },
        city: { type: String, required: false },
      },
    ],
    information: {
      foundation: { type: Number, required: true },
      topWinner: {
        name: { type: String, required: true },
        image: { type: String, required: false },
        province: { type: String, required: true },
        winner: { type: Number, required: true },
      },
      leagues: { type: [String], required: true },
      allTimeWinners: [
        {
          _id: false,
          year: { type: Number, required: true },
          name: { type: String, required: true },
          image: { type: String, required: false },
          province: { type: String, required: true },
        },
      ],
    },
  },
  {
    collection: "leagues",
    versionKey: false,
  }
);

module.exports = dbContent.model("league", LeagueSchema);