const mongoose = require("mongoose");

const FixtureSchema = new mongoose.Schema(
  {
    category: { type: Number, required: true, unique: true },
    stages: [
      {
        _id: false,
        name: { type: String, required: true },
        matches: [
          [
            {
              _id: false,
              home: { type: String, default: "LXTeamX" },
              away: { type: String, default: "LXTeamX" },
            },
          ],
        ],
      },
    ],
  },
  {
    collection: "fixture",
    versionKey: false,
  }
);

module.exports = mongoose.model("Fixure", FixtureSchema);
