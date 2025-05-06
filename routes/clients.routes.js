const {
  addClient,
  getAllClients,
  getClientById,
  getClientByName,
  updateClientById,
  deleteClientById,
} = require("../controllers/clients.controller");

const router = require("express").Router();

router.post("/create", addClient);
router.get("/all", getAllClients);
router.get("/name/:name", getClientByName);
router.get("/:id", getClientById);
router.put("/:id", updateClientById);
router.delete("/:id", deleteClientById);

module.exports = router;
