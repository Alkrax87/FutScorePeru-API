const mongoose = require("mongoose");

const generateDefaultFixture = () => {
  return Array.from({ length: 18 }, () => [
    { home: "Team", away: "Team" },
    { home: "Team", away: "Team" },
    { home: "Team", away: "Team" },
    { home: "Team", away: "Team" },
    { home: "Team", away: "Team" },
  ]);
};

const fixtureL3Schema = new mongoose.Schema(
  {
    apertura: { type: [Object], default: generateDefaultFixture },
    clausura: { type: [Object], default: generateDefaultFixture },
  },
  {
    collection: "fixtureL3",
    versionKey: false,
  }
);

module.exports = mongoose.model("fixtureL3", fixtureL3Schema);
