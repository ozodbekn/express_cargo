const { default: mongoose } = require("mongoose");
const Clients = require("../schemas/Clients");
const { error } = require("console");

const addClient = async (req, res) => {
  try {
    const { full_name, phone_number, adress, location, email } = req.body;
    const newClient = await Clients.create({
      full_name,
      phone_number,
      adress,
      location,
      email,
    });
    res.status(201).send({ message: "New Client added", newClient });
  } catch (error) {
  sendErrorResponse(error, res);  }
};

const getAllClients = async (req, res) => {
  try {
    const clients = await Clients.find({});
    res.status(200).send({ clients });
    console.log(clients);
  } catch (error) {
  sendErrorResponse(error, res);  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ errsor: "ID noto'g'ri kiritilgan" });
    }
    const Client = await Clients.findById(id);
    if (!Client) {
      return res.status(404).send({ Message: "Bunday client topilmadi" });
    }
    res.status(200).send({ Client });
  } catch (error) {
  sendErrorResponse(error, res);  }
};

const deleteClientById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ errsor: "ID noto'g'ri kiritilgan" });
    }
    const Client = await Clients.deleteOne({ _id: id });
    if (Client.deletedCount == 0) {
      return res.status(404).send({ Message: "Bunday client topilmadi" });
    }
    res.status(200).send({ message: "client o'chirildi" });
  } catch (error) {
  sendErrorResponse(error, res);  }
};

const updateClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, phone_number, adress, location, email } = req.body;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Id Notugri kiritilgan" });
    }
    const Client = await Clients.updateOne(
      { _id: id },
      { full_name, phone_number, adress, location, email }
    );
    if (Client.matchedCount == 0) {
      return res.status(404).send({ Message: "Bunday client topilmadi" });
    }
    res.status(200).send({ message: "client o'zgartirildi" });
  } catch (error) {
  sendErrorResponse(error, res);  }
};

const getClientByName = async (req, res) => {
  try {
    const { name } = req.params;
    const clients = await Clients.find({ name });
    res.status(200).send({ clients });
  } catch (error) {
  sendErrorResponse(error, res);  }
};

module.exports = {
  addClient,
  getAllClients,
  getClientById,
  getClientByName,
  updateClientById,
  deleteClientById,
};
