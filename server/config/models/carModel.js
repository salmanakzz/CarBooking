// car collection shema

const mongoose = require("mongoose");
const { CAR_COLLECTION } = require("../collections");

const car = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    segment: { type: String, required: true },
    location: { type: String, required: true },
    booked: { type: Array, required: true },
  },
  {
    timestamps: true,
    collection: CAR_COLLECTION,
  }
);

const model = mongoose.model("carData", car);

module.exports = model;
