// admin route controllers

const adminHelper = require("../helpers/adminHelper");

// admin login controller
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await adminHelper.adminLoginAuth(email, password);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// verify auth route controlling
const verifyAuth = (req, res) =>
  res.json({ status: "ok", admin: true, auth: true });
// register car route controlling
const registerCar = async (req, res) => {
  const carDetails = req.body;

  try {
    const response = await adminHelper.registerCarDetails(carDetails);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// remove car details route controlling
const deleteCar = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await adminHelper.removeCarDetails(id);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

//edit car details route controlling
const editDetails = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await adminHelper.editCarDetails(id, req.body);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// controllers exporting
module.exports = {
  adminLogin,
  registerCar,
  verifyAuth,
  deleteCar,
  editDetails,
};
