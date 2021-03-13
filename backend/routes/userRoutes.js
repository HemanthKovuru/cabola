const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const rideController = require("./../controllers/rideController");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/signout", authController.signout);
router.post("/findride", rideController.findRide);
router.patch("/updatelocation/:id", authController.updateLocation);

module.exports = router;
