const express = require("express")
const router = express.Router()

// destructuring controllers
const { fetchCarDetails, carBook } = require("../controllers/userController")

// fetch car details route
router.get("/api/fetch-car-details", fetchCarDetails)

// car booking route
router.patch("/api/car-book",carBook)

module.exports = router