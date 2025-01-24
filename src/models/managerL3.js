const mongoose = require("mongoose");

const ManagersL3Schema = new mongoose.Schema(
  {
    managerId: { type: Number, required: true },
    teamId: { type: String, required: true },
    name: { type: String, required: true },
    cod: { type: String, required: true },
    photo: { type: String, required: true },
  },
  {
    collection: "managersL3",
    versionKey: false,
  }
);

module.exports = mongoose.model("ManagersL3", ManagersL3Schema);