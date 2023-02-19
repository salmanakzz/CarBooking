const express = require("express");
const router = express.Router();

// destructuring controllers
const {
  adminLogin,
  registerCar,
  verifyAuth,
} = require("../controllers/adminController");
const verifyJWT = require("../middlewares/verifyJwt");

// admin login route
router.post("/api/admin-login", adminLogin);

// verify auth route
router.get("/api/verify-auth", verifyJWT, verifyAuth);

// register car route
router.post("/api/register-car", registerCar);

module.exports = router;
