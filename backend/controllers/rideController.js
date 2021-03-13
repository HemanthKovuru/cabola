const Ride = require("./../models/rideModel");
const User = require("./../models/userModel");

exports.findRide = async (req, res, next) => {
  try {
    const x1 = req.body.coordinateX;
    const x2 = req.body.coordinateY;
    let users = await User.find({ role: "driver", availability: true });
    drivers = users.map((driver) => {
      const location = Math.round(
        Math.sqrt(
          (x1 - driver.coordinateX) ** 2 + (x2 - driver.coordinateY) ** 2
        )
      );
      return {
        id: driver.id,
        location,
        fisrtname: driver.firstname,
        email: driver.email,
      };
    });
    drivers.sort((a, b) => a.location - b.location);
    res.status(200).json({
      status: "success",
      driver: drivers[0],
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.createRide = async (req, res) => {
  try {
    await Ride.create({ user: req.body.userId, driver: req.body.driverId });
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
exports.deleteRide = async (req, res) => {
  try {
    await Ride.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success" });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
exports.updateRide = async (req, res) => {
  try {
    const res = await Ride.findByIdAndUpdate(req.params.id, { accepted: true });
    res.status(200).json({ status: "success", data: res });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.getRide = async (req, res) => {
  try {
    const ride = await Ride.findOne({ driver: req.params.id }).populate({
      path: "user",
      // select: "firstname email",
    });
    console.log(ride);
    res.status(200).json({ status: "success", data: ride });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

exports.getUserRides = async (req, res) => {
  try {
    const userHistory = await Ride.find({
      user: req.params.userId,
      accepted: true,
    });
    res.status(200).json({ status: "success", data: userHistory });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
