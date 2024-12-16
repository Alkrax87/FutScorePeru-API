const mongoose = require("mongoose");

const ManagerSchema = new mongoose.Schema(
  {
    managerId: { type: Number, required: true },
    teamId: { type: String, required: true },
    name: { type: String, required: true },
    country: { type: String, required: true },
    cod: { type: String, required: true },
    photo: { type: String, required: true },
  },
  {
    collection: "managers",
    versionKey: false,
  }
);

module.exports = mongoose.model("Manager", ManagerSchema);
