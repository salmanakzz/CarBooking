// user route helpers

const carModel = require("../config/models/carModel");

module.exports = {
  // fetch car details helper
  fetchingCarDetails: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const carDetails = await carModel.find();
        resolve({ status: "ok", carDetails });
      } catch (error) {
        resolve({ status: "error", error });
      }
    });
  },

  // car booking helper
  carBooking: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await carModel.updateOne({ _id: id }, { $push: { booked: true } });
        resolve({ status: "ok", booked: true });
      } catch (error) {
        resolve({ status: "error", booked: false, error });
      }
    });
  },
};
