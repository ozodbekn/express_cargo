const { Schema, model } = require("mongoose");

const BookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },
    author: { type: String, required: true, lowercase: true },
    price: {
      type: Number,
      get: getPrice,
      set: setPrice,
      min: [1, "Kitob tekin bo'lishi mumkin emas"],
      max: [10000000, "Kitob bebaho bo'lishi mumkin emas"],
    },
    year: { type: Number },
    email: {
      type: String,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Iltimos emailni to'g'ri kiriting!",
      ],
    },
    password: {
      type: String,
      minLength: [6, "Parol 6 ta belgidan kam bo'kishi mumkin emas!"],
      maxLength: [100, "Parol 100 ta belgidan kam bo'lishi mumkin emas!"],
    },
    gender: {
      type: String,
      // enum: ["erkak", "ayol"],
      enum: {
        values: ["erkak", "ayol"],
        message: `{VALUE} noto'g'ri`,
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (value) {
          return /^\d{2}-\d{3}-\d{2}-\d{2}/.test(value);
        },
        message: (props) => `${props.value}-Raqam notugrim andozaga mos emas`,
      },
      alias: "tel", //postmanda tel databaseda phone
    },
    isMarried: Boolean,
    wifi: {
      type: Object,
      required: function () {
        return this.isMarried;
      },
      name: String,
      age: { type: Number },
    },
  },
  { versionKey: false, timestamps: true, toJSON: { getters: true } }
);

function getPrice(price) {
  return (price / 100).toFixed(2);
}
function setPrice(price) {
  return (price * 100).toFixed(2);
}

BookSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};

module.exports = model("Books", BookSchema);
