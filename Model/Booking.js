const mongoose = require("mongoose");
const Joi = require("joi");
const BookingSchema = new mongoose.Schema({
  hotelId: { type: String, required: true, trim: true },
  hotelName: { type: String, required: true },
  checkInDate: { type: String, required: true },
  checkOutDate: { type: String, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerContact: { type: String, required: true },
  roomId: { type: String, required: true },
  roomName: { type: String, required: true },
  numberOfGuest: { type: String, required: true },
  totalCost: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  account_card: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", BookingSchema);

function validateBooking(inputobject) {
  const schema = {
    hotelId: Joi.string().min(3).required(),
    hotelName: Joi.string().required(),
    checkInDate: Joi.string().required(),
    checkOutDate: Joi.string().required(),
    customerName: Joi.string().min(3).required(),
    customerEmail: Joi.string().required(),
    customerContact: Joi.string().required(),
    roomId: Joi.string().required(),
    roomName: Joi.string().min(3).required(),
    numberOfGuest: Joi.number().required(),
    totalCost: Joi.number().required(),
    paymentMethod: Joi.string().required(),
    account_card: Joi.string().required(),
  };
  return Joi.validate(inputobject, schema);
}

exports.Booking = Booking;
exports.validateBooking = validateBooking;
