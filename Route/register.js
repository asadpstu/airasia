const express = require("express");
const router = express.Router();

const verifytoken = require("../middleware/auth");
const {
  createRegistration,
  getAllRegistration,
} = require("../controller/registerController");

//Guest registration end-point
router.post("/register", createRegistration);
router.get("/register", getAllRegistration); 

module.exports = router;
