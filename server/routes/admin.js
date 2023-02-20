const express = require("express");
const router = express.Router();

// destructuring controllers
const {
  adminLogin,
  registerCar,
  verifyAuth,
  deleteCar,
  editDetails,
} = require("../controllers/adminController");
const verifyJWT = require("../middlewares/verifyJwt");

// admin login route
router.post("/api/admin-login", adminLogin);

// verify auth route
router.get("/api/verify-auth", verifyJWT, verifyAuth);

// register car details route
router.post("/api/register-car", registerCar);

// edit car detaisl route
router.put("/api/edit-details", editDetails);

// remove car detaisl route
router.delete("/api/delete-car", deleteCar);

module.exports = router;
