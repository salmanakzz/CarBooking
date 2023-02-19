const express = require("express");
const router = express.Router();

// destructuring controllers
const { adminLogin, registerCar } = require("../controllers/adminController");

// admin login route
router.post("/api/admin-login", adminLogin);

// register car route 
router.post("/api/register-car", registerCar)

module.exports = router;
