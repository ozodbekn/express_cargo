const { Schema, model, models } = require("mongoose");

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    product_link: { type: String, required: true },
    truck: { type: String, required: true },
    email: { type: String, required: true },
    summa: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

module.exports = models.Orders || model("Orders", orderSchema);
