const { Schema } = require("mongoose");
const { dbAuth } = require("../config/database");

const ApiKeySchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true },
    permissions: { type: Array, default: ["get"] },
    plan: { type: String, default: "free" },
    requestsRemaining: { type: Number, default: 50 },
  },
  {
    collection: "clients",
    versionKey: false,
  }
);

module.exports = dbAuth.model("ApiKey", ApiKeySchema);
