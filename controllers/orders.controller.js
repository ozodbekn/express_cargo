const { default: mongoose } = require("mongoose");
const Orders = require("../schemas/Orders");
const { error } = require("console");

const addOrder = async (req, res) => {
  try {
    const { name, author, price, year } = req.body;
    const newOrder = await Orders.create({ name, author, price, year });
    res.status(201).send({ message: "New order added", newOrder });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find({});
    res.status(200).send({ orders });
    console.log(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ errsor: "ID noto'g'ri kiritilgan" });
    }
    const order = await Orders.findById(id);
    if (!order) {
      return res.status(404).send({ Message: "Bunday order topilmadi" });
    }
    res.status(200).send({ order });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ errsor: "ID noto'g'ri kiritilgan" });
    }
    const order = await Orders.deleteOne({ _id: id });
    if (order.deletedCount == 0) {
      return res.status(404).send({ Message: "Bunday order topilmadi" });
    }
    res.status(200).send({ message: "order o'chirildi" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, author, price, year } = req.body;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Id Notugri kiritilgan" });
    }
    const order = await Orders.updateOne(
      { _id: id },
      { name, author, price, year }
    );
    if (order.matchedCount == 0) {
      return res.status(404).send({ Message: "Bunday order topilmadi" });
    }
    res.status(200).send({ message: "order o'zgartirildi" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

const getOrderByName = async (req, res) => {
  try {
    const { name } = req.params;
    const orders = await Orders.find({ name });
    res.status(200).send({ orders });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Serverda xatolik" });
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
  getOrderByName,
  updateOrderById,
  deleteOrderById,
};
