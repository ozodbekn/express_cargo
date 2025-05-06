const { default: mongoose } = require("mongoose");
const Books = require("../schemas/Books");
const { error } = require("console");
const { sendErrorResponse } = require("../helpers/send_error_response");

const addBook = async (req, res) => {
  try {
    // const { name, author, price, year } = req.body;
    const newBook = await Books(req.body);
    await newBook.validate();
    // await newBook.save(); // ichida validatori bor
    res.status(201).send({ message: "New book added", newBook });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Books.find({});
    res.status(200).send({ books });
    console.log(books);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ errsor: "ID noto'g'ri kiritilgan" });
    }
    const book = await Books.findById(id);
    if (!book) {
      return res.status(404).send({ Message: "Bunday kitob topilmadi" });
    }
    res.status(200).send({ book });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getBooksByName = async (req, res) => {
  try {
    const { name } = req.params;
    const books = await Books.findByName(name);
    if (books.length == 0) {
      return res.status(404).send({ Message: "Bunday kitoblar topilmadi" });
    }
    res.status(200).send({ books });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ errsor: "ID noto'g'ri kiritilgan" });
    }
    const book = await Books.deleteOne({ _id: id });
    if (book.deletedCount == 0) {
      return res.status(404).send({ Message: "Bunday kitob topilmadi" });
    }
    res.status(200).send({ message: "Kitob o'chirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, author, price, year } = req.body;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send({ error: "Id Notugri kiritilgan" });
    }
    const book = await Books.updateOne(
      { _id: id },
      { name, author, price, year }
    );
    if (book.matchedCount == 0) {
      return res.status(404).send({ Message: "Bunday kitob topilmadi" });
    }
    res.status(200).send({ message: "Kitob o'zgartirildi" });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getBookByName = async (req, res) => {
  try {
    const { name } = req.params;
    const books = await Books.find({ name });
    res.status(200).send({ books });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  getBookByName,
  getBooksByName,
  updateBookById,
  deleteBookById,
};
