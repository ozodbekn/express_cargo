const { sendErrorResponse } = require("../helpers/send_error_response");
const Departments = require("../schemas/Departments");
const Workers = require("../schemas/Workers");

const addWorker = async (req, res) => {
  try {
    const { first_name, last_name, age, department, subDepartment } = req.body;
    const newWorker = await Workers.create({
      first_name,
      last_name,
      age,
      department,
      subDepartment,
    });

    // =======================================================
    const dep = await Departments.findById(department);
    dep.workers.push(newWorker);

    await dep.save();
    // =======================================================
    res.status(201).send({ message: "New Worker added", newWorker });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAllWorkers = async (req, res) => {
  try {
    // const workers = await Workers.find().populate("department", "name -_id");
    const workers = await Workers.find().populate({
      path: "department",
      match: { name: "Dasturlash" },
      select: "name -_id",
    });
    res.status(200).send({ workers });
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

module.exports = {
  addWorker,
  getAllWorkers,
};
