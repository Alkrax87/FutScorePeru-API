const mongoose = require("mongoose");

const DivisionSchema = new mongoose.Schema(
  {
    category: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    season: { type: Number, required: true },
    teams: { type: Number, required: true },
    stages: [
      {
        _id: false,
        name: { type: String, required: true },
        inGame: { type: Number, default: 1 },
        status: { type: Boolean, default: false },
      },
    ],
  },
  {
    collection: "division",
    versionKey: false,
  }
);

module.exports = mongoose.model("Division", DivisionSchema);
