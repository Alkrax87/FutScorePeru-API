const { Schema } = require("mongoose");
const { dbContent } = require("../config/database");

const MapSchema = new Schema(
  {
    category: { type: Number, required: true },
    model: [
      {
        _id: false,
        mapId: { type: String, required: true },
        mapName: { type: String, required: true },
        mapStatus: { type: Boolean, required: true },
        mapD: { type: String, required: true },
      },
    ],
  },
  {
    collection: "map",
    versionKey: false,
  }
);

module.exports = dbContent.model("Map", MapSchema);
