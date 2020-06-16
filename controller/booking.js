const { Booking, validateBooking } = require("../Model/Booking");
const { GuestModel } = require("../Model/Register");
module.exports.addBooking = async (req, res) => {
  //Validating request payload
  const data = validateBooking(req.body);
  if (data.error) {
    res.status(400).send({
      status: "failed",
      response: "validation error",
      response: data.error,
    });
    return;
  }

  const post = {
    hotelId: req.body.hotelId,
    hotelName: req.body.hotelName,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    customerName: req.body.customerName,
    customerEmail: req.body.customerEmail,
    customerContact: req.body.customerContact,
    roomId: req.body.roomId,
    roomName: req.body.roomName,
    numberOfGuest: req.body.numberOfGuest,
    totalCost: req.body.totalCost,
    paymentMethod: req.body.paymentMethod,
    account_card: req.body.account_card,
  };

  const search = await Booking.find({
    customerEmail: req.body.customerEmail,
    customerContact: req.body.customerContact,
    checkInDate: req.body.checkInDate,
    checkOutDate: req.body.checkOutDate,
    hotelId: req.body.hotelId,
  });
  if (search.length > 0) {
    // checking if there is any booking by this user
    res.status(200).send({
      status: "success",
      result: "Sorry.You already have a booking on this day!",
      response: post,
    });
  } else {
    // saving booking
    const saveBooking = new Booking(post);
    const savedData = await saveBooking.save();
    res.status(200).send({
      status: "success",
      result: "Booking Successful.",
      response: savedData,
    });
  }
};
