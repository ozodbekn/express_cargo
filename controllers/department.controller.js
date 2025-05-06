const Departments = require("../schemas/Departments");

const addDep = async (req, res) => {
  try {
    const newDep = await Departments.create(req.body);
    await newDep.validate();

    res.status(201).send({ message: "New Department added", newDep });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllDeps = async (req, res) => {
  try {
    const deps = await Departments.find().populate("workers");
    res.status(200).send({ deps });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addDep,
  getAllDeps,
};
