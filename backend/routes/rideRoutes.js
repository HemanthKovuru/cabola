const express = require("express");
const router = express.Router();
const rideController = require("./../controllers/rideController");

router.route("/findride").post(rideController.findRide);
router.route("/history/:userId").get(rideController.getUserRides);
router
  .route("/:id")
  .get(rideController.getRide)
  .patch(rideController.updateRide);

router
  .route("/")
  .post(rideController.createRide)
  .delete(rideController.deleteRide);

module.exports = router;
