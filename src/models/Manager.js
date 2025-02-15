const mongoose = require("mongoose");

const ManagerSchema = new mongoose.Schema(
  {
    category: { type: Number, required: true },
    managerId: { type: Number, required: true, unique: true },
    teamId: { type: String, required: true },
    name: { type: String, required: true },
    cod: { type: String },
    photo: { type: String },
  },
  {
    collection: "managers",
    versionKey: false,
  }
);

module.exports = mongoose.model("Manager", ManagerSchema);