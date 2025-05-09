const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("Orders", orderSchema);
