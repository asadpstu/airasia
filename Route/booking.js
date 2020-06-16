const express = require("express");
const router = express.Router();
const verifytoken = require("../middleware/auth");
const { addBooking } = require("../controller/booking");

//Add booking route
router.post("/add/booking", verifytoken, addBooking);

module.exports = router;
