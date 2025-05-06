const { addCurrency_type, getAllCurrency_types, getCurrency_typeById, updateCurrency_typeById, deleteCurrency_typeById } = require("../controllers/currency_type.controller");


const router = require("express").Router();

router.post("/create", addCurrency_type);
router.get("/all", getAllCurrency_types);
router.get("/name/:name", getCurrency_typeById);
router.get("/:id", getCurrency_typeById);
router.put("/:id", updateCurrency_typeById);
router.delete("/:id", deleteCurrency_typeById );

module.exports = router;
