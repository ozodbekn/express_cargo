const { Schema, model } = require("mongoose");

const ClientSchema = new Schema(
  {
    full_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    adress: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("Clients", ClientSchema);
