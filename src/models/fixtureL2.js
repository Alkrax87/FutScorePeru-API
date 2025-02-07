const mongoose = require("mongoose");

const generateDefaultFixture = () => {
  return Array.from({ length: 14 }, () => [
    { home: "Team", away: "Team" },
    { home: "Team", away: "Team" },
    { home: "Team", away: "Team" },
    { home: "Team", away: "Team" },
  ]);
};

const fixtureL2Schema = new mongoose.Schema(
  {
    regional: { type: [Object], default: generateDefaultFixture },
    grupos: { type: [Object], default: generateDefaultFixture },
  },
  {
    collection: "fixtureL2",
    versionKey: false,
  }
);

module.exports = mongoose.model("fixtureL2", fixtureL2Schema);
