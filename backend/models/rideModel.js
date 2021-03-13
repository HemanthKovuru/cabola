const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "please provide a user"],
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "please provide a driver"],
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

const Ride = mongoose.model("Ride", rideSchema);
module.exports = Ride;
