// admin route helpers

const carModel = require("../config/models/carModel");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = {
  // admin login auth helper
  adminLoginAuth: (email, password) => {
    return new Promise((resolve, reject) => {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASS;

      if (adminEmail === email && adminPassword === password) {
        const token = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
          expiresIn: "30m",
        });
        resolve({ status: "ok", admin: true, token });
      } else {
        reject({ status: "error", admin: false });
      }
    });
  },

  // register car details helper
  registerCarDetails: (carDetails) => {
    return new Promise(async (resolve, reject) => {
      carDetails.booked = [];
      try {
        await carModel.create(carDetails);
        resolve({ status: "ok", registered: true });
      } catch (error) {
        reject({ status: "error", registered: false, error });
      }
    });
  },

  // remove car details helper
  removeCarDetails: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await carModel.deleteOne({ _id: ObjectId(id) });
        resolve({ status: "ok", deleted: true });
      } catch (error) {
        reject({ status: "error", deleted: false, error });
      }
    });
  },
};
