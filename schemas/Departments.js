const { Schema, model } = require("mongoose");

const depSchema = new Schema(
  {
    name: { type: String, trim: true, unique: true, required: true },
    desc: { type: String },
    workers: [{ type: Schema.Types.ObjectId, ref: "Worker" }],
  },
  { versionKey: false, timestamps: false }
);

module.exports = model("Department", depSchema);
