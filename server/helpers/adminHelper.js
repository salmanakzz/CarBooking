// admin route helpers

const carModel = require("../config/models/carModel");

module.exports = {
  // admin login auth helper
  adminLoginAuth: (email, password) => {
    return new Promise((resolve, reject) => {
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASS;

      if (adminEmail === email && adminPassword === password) {
        resolve({ status: "ok", admin: true });
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
};
