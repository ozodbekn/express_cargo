const { addDep, getAllDeps } = require("../controllers/department.controller");


const router = require("express").Router();

router.post("/create", addDep);
router.get("/all", getAllDeps);

module.exports = router;
