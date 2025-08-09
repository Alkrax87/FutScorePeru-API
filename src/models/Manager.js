const { Schema } = require("mongoose");
const { dbContent } = require("../config/database");

const ManagerSchema = new Schema(
  {
    managerId: { type: Number, required: true, unique: true },
    category: { type: Number, required: true },
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

module.exports = dbContent.model("Manager", ManagerSchema);