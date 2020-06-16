const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { GuestModel } = require("../Model/Register");
module.exports.authFunc = async (req, res) => {
  const data = UserPassValidation(req.body);
  if (data.error) {
    res.status(400).send({
      response: data.error,
    });
    return;
  }

  const foundUser = await GuestModel.findOne({ email: req.body.email });
  if (!foundUser) {
    res.status(400).send({
      response: "No user found",
    });
    return;
  }

  //now compare user password with given password
  const isTrue = await bcrypt.compare(req.body.password, foundUser.password);
  if (isTrue) {
    //here i'm going to sign the response
    const token = jwt.sign(
      { loggedInUser: foundUser },
      config.get("app_jwttoken")
    );
    res.status(200).send({
      response: "Valid Username and password",
      "x-access-token": token,
      isAdmin: foundUser.isAdmin,
    });
    return;
  } else {
    res.status(400).send({
      response: "Password didn't match",
    });
    return;
  }
};

function UserPassValidation(inputobject) {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  };
  return Joi.validate(inputobject, schema);
}
