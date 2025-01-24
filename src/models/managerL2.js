const mongoose = require("mongoose");

const ManagersL2Schema = new mongoose.Schema(
  {
    managerId: { type: Number, required: true },
    teamId: { type: String, required: true },
    name: { type: String, required: true },
    cod: { type: String, required: true },
    photo: { type: String, required: true },
  },
  {
    collection: "managersL2",
    versionKey: false,
  }
);

module.exports = mongoose.model("ManagersL2", ManagersL2Schema);