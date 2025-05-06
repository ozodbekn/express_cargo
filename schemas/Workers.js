const { Schema, model } = require("mongoose");
const Departments = require("./Departments");

const workerSchema = new Schema(
  {
    first_name: { type: String, trim: true, required: true },
    last_name: { type: String, trim: true },
    age: { type: Number, min: 18 },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    subDepartment: Departments.schema,
  },
  { versionKey: false, timestamps: false }
);

module.exports = model("Worker", workerSchema);
