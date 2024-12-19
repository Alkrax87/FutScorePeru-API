const mongoose = require("mongoose");

const generateDefaultResults = () => {
  return Array.from({ length: 17 }, (_, index) => ({
    game: index + 1,
    score: null,
  }));
};

const resultsL1Schema = new mongoose.Schema(
  {
    teamId: { type: String, required: true },
    apertura: { type: [Object], default: generateDefaultResults },
    clausura: { type: [Object], default: generateDefaultResults },
  },
  {
    collection: "resultsL1",
    versionKey: false,
  }
);

module.exports = mongoose.model("resultsL1", resultsL1Schema);
