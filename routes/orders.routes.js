const {
  addOrder,
  getAllOrders,
  getOrderByName,
  getOrderById,
  updateOrderById,
  deleteOrderById,
} = require("../controllers/orders.controller");

const router = require("express").Router();

router.post("/create", addOrder);
router.get("/all", getAllOrders);
router.get("/name/:name", getOrderByName);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderById);
router.delete("/:id", deleteOrderById);

module.exports = router;
