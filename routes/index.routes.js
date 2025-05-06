const router = require("express").Router();

const booksRouter = require("./books.routes");
const currency_typeRouter = require("./currency_type.routes");
const ordersRouter = require("./orders.routes");
const clientsRouter = require("./clients.routes");
const depsRouter = require("./deps.routes");
const workerRouter = require("./workers.routes");

router.use("/books", booksRouter);
router.use("/currency-type", currency_typeRouter);
router.use("/orders", ordersRouter);
router.use("/clients", clientsRouter);
router.use("/deps", depsRouter);
router.use("/workers", workerRouter);

module.exports = router;
