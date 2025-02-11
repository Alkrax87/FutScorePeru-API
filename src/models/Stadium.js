const mongoose = require("mongoose");

const StadiumSchema = new mongoose.Schema(
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

module.exports = mongoose.model("Stadium", StadiumSchema);
