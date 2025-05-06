const {
  addBook,
  getBookById,
  getBookByName,
  getAllBooks,
  updateBookById,
  deleteBookById,
  getBooksByName,
} = require("../controllers/books.controller");

const router = require("express").Router();

router.post("/create", addBook);
router.get("/all", getAllBooks);
router.get("/name/:name", getBookByName);
router.get("/bookname/:name", getBooksByName);
router.get("/:id", getBookById);
router.put("/:id", updateBookById);
router.delete("/:id", deleteBookById);

module.exports = router;
