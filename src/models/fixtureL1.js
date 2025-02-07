const mongoose = require("mongoose");

const generateDefaultFixture = () => {
  return Array.from({ length: 19 }, () => [
    { home: "Team", away: "Team" },
    { home: "Team", away: "Team" },
    { home: "Team", away: "Team" },
    { home: "Team", away: "Team" },
    { home: "Team", away: "Team" },
    { home: "Team", away: "Team" },
    { home: "Team", away: "Team" },
    { home: "Team", away: "Team" },
    { home: "Team", away: "Team" },
  ]);
};

const fixtureL1Schema = new mongoose.Schema(
  {
    apertura: { type: [Object], default: generateDefaultFixture },
    clausura: { type: [Object], default: generateDefaultFixture },
  },
  {
    collection: "fixtureL1",
    versionKey: false,
  }
);

module.exports = mongoose.model("fixtureL1", fixtureL1Schema);
