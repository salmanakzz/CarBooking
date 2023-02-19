// user route controllers

const userHelper = require("../helpers/userHelper");

// fetch car details route controlling
const fetchCarDetails = async (req, res) => {
  try {
    const response = await userHelper.fetchingCarDetails();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// car booking route controller
const carBook = async (req, res) => {
  const { id } = req.query;

  try {
    const response = await userHelper.carBooking(id)
    res.json(response)
  } catch (error) {
    console.log(error);
    res.json(error)
  }
};

// exporting controllers
module.exports = {
  fetchCarDetails,
  carBook,
};
