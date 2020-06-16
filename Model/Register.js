const mongoose = require("mongoose");
var uuid = require("node-uuid");
const Joi = require("joi");
const guestSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true, trim: true, minlength: 3 },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contact: { type: String, required: true, maxlength: 13 },
  isAdmin: Boolean, //default I'm sending false on purpose intentionally
  date: { type: Date, default: Date.now },
});

const GuestModel = mongoose.model("Guest", guestSchema);

function validateInput(inputobject) {
  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(255).required(),
    contact: Joi.string().max(13).required(),
  };
  return Joi.validate(inputobject, schema);
}

exports.GuestModel = GuestModel;
exports.Validate = validateInput;
