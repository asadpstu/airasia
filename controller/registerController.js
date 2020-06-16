const { GuestModel, Validate } = require("../Model/Register");
const crypto = require("crypto");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const config = require("config");

module.exports.createRegistration = async (req, res) => {
  const data = Validate(req.body);
  if (data.error) {
    res.status(422).send({
      status: "failed",
      result: "validation error",
      response: data.error,
    });
    return;
  }

  //encrypting password before creating post object
  //Salt key Prime number is a good choice Folder location : config/*
  const salt = await bcrypt.genSalt(config.get("app_salt"));
  const encryptPassword = await bcrypt.hash(req.body.password, salt);
  const post = {
    _id: crypto.randomBytes(16).toString("hex"),
    name: req.body.name,
    email: req.body.email,
    password: encryptPassword,
    contact: req.body.contact,
    isAdmin: false,
  };

  const search = await GuestModel.find({
    $or: [{ passport: req.body.passport }, { email: req.body.email }],
  });
  if (search.length > 0) {
    res.status(400).send({
      status: "failed",
      response: "User already exist",
      UserInfo: search,
    });
    return;
  }

  //to handle malicious input
  const useLoadash = _.pick(post, [
    "_id",
    "name",
    "email",
    "password",
    "contact",
    "isAdmin",
  ]);
  const Guest = new GuestModel(useLoadash);
  try {
    const save = await Guest.save();
    res.status(200).send({
      status: "success",
      response: "New user created",
      userInfo: save,
    });
  } catch (e) {
    res.status(400).send({
      status: "failed",
      response: "Unable to save",
      Error: e.message,
    });
  }
};

module.exports.getAllRegistration = async (req, res) => {
  const allRegisteredGuest = await GuestModel.find().sort({ name: 1 }).select({
    name: 1,
    contact: 1,
    email: 1,
    isAdmin: 1,
  });

  res.status(200).send({
    result: "Registered Guest List",
    records: allRegisteredGuest,
  });
};
