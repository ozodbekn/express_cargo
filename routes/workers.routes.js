const {
  addWorker,
  getAllWorkers,
} = require("../controllers/worker.controller");

const router = require("express").Router();

router.post("/create", addWorker);
router.get("/all", getAllWorkers);

module.exports = router;
