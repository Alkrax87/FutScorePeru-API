const { Schema } = require("mongoose");
const { dbContent } = require("../config/database");

const FixtureSchema = new Schema(
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

module.exports = dbContent.model("Fixure", FixtureSchema);
