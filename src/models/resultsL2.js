const mongoose = require("mongoose");

const generateRegionalDefaultResults = () => {
  return Array.from({ length: 14 }, (_, index) => ({
    game: index + 1,
    score: null,
  }));
};

const generateGruposDefaultResults = () => {
  return Array.from({ length: 10 }, (_, index) => ({
    game: index + 1,
    score: null,
  }));
};

const resultsL2Schema = new mongoose.Schema(
  {
    teamId: { type: String, required: true },
    regional: { type: [Object], default: generateRegionalDefaultResults },
    grupos: { type: [Object], default: generateGruposDefaultResults },
  },
  {
    collection: "resultsL2",
    versionKey: false,
  }
);

module.exports = mongoose.model("resultsL2", resultsL2Schema);
