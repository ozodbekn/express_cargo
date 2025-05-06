const { default: mongoose } = require("mongoose");
const Currency_types = require("../schemas/Currency_types");
const { error } = require("console");
const currency_type = require("../schemas/Currency_types");

const addCurrency_type = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCurrency_type = await Currency_types.create({ name, description });
    res
      .status(201)
      .send({ message: "New currency_type added", newCurrency_type });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const getAllCurrency_types = async (req, res) => {
  try {
    const currency_types = await Currency_types.find({});
    res.status(200).send({ currency_types });
    console.log(currency_types);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const getCurrency_typeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ errsor: "ID noto'g'ri kiritilgan" });
    }
    const currency_type = await Currency_types.findById(id);
    if (!currency_type) {
      return res.status(404).send({ Message: "Bunday CurrencyType topilmadi" });
    }
    res.status(200).send({ currency_type });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deleteCurrency_typeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ errsor: "ID noto'g'ri kiritilgan" });
    }
    const currency_type = await Currency_types.deleteOne({ _id: id });
    if (currency_type.deletedCount == 0) {
      return res.status(404).send({ Message: "Bunday CurrencyType topilmadi" });
    }
    res.status(200).send({ message: "CurrencyType o'chirildi" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const updateCurrency_typeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Id Notugri kiritilgan" });
    }
    const currency_type = await Currency_types.updateOne(
      { _id: id },
      { name, description }
    );
    if (currency_type.matchedCount == 0) {
      return res.status(404).send({ Message: "Bunday CurrencyType topilmadi" });
    }
    res.status(200).send({ message: "CurrencyType o'zgartirildi" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const getCurrency_typeByName = async (req, res) => {
  try {
    const { name } = req.params;
    const currency_types = await currency_type.find({ name });
    res.status(200).send({ currency_types });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

module.exports = {
  addCurrency_type,
  getAllCurrency_types,
  getCurrency_typeById,
  getCurrency_typeByName,
  updateCurrency_typeById,
  deleteCurrency_typeById,
};
