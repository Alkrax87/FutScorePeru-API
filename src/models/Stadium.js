const { Schema } = require("mongoose");
const { dbContent } = require("../config/database");

const StadiumSchema = new Schema(
  {
    stadiumId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    collection: "stadiums",
    versionKey: false,
  }
);

module.exports = dbContent.model("Stadium", StadiumSchema);
