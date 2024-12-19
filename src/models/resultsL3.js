const mongoose = require("mongoose");

const generateRegularDefaultResults = () => {
  return Array.from({ length: 14 }, (_, index) => ({
    game: index + 1,
    score: null,
  }));
};

const generateFinalDefaultResults = () => {
  return Array.from({ length: 10 }, (_, index) => ({
    game: index + 1,
    score: null,
  }));
};

const resultsL3Schema = new mongoose.Schema(
  {
    teamId: { type: String, required: true },
    regular: { type: [Object], default: generateRegularDefaultResults },
    final: { type: [Object], default: generateFinalDefaultResults },
  },
  {
    collection: "resultsL3",
    versionKey: false,
  }
);

module.exports = mongoose.model("resultsL3", resultsL3Schema);
