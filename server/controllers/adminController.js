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

// controllers exporting
module.exports = {
  adminLogin,
  registerCar,
};
