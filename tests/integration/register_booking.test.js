let server;
const request = require("supertest");

describe("register endpoint", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(() => {
    server.close();
  });
  describe("get request /", () => {
    it("should return all registered guest", async () => {
      const allRecord = await request(server).get("/register");
      expect(allRecord.status).toBe(200);
    });
  });

  describe("/POST Create booking with token", () => {
    it("should return 200 for succesfull Booking", async () => {
      //login First
      const token = await request(server)
        .post("/authenticate")
        .send({ email: "hmasad09@gmail.com", password: "12345" });
      const gotToken = token.body["x-access-token"];

      const newBooking = await request(server)
        .post("/add/booking")
        .set("x-access-token", gotToken)
        .send({
          hotelId: "H-S-09087-32451",
          hotelName: "Hotel Sarina",
          checkInDate: "12345678909876",
          checkOutDate: "1234567654377789",
          customerName: "Asad",
          customerEmail: "hmasad09@gmail.com",
          customerContact: "0138596067",
          roomId: "607",
          roomName: "Business suite",
          numberOfGuest: 2,
          totalCost: 1200,
          paymentMethod: "Paypal",
          account_card: "1234567987653",
        });
      expect(newBooking.status).toBe(200);
      expect(newBooking.body.status).toEqual("success");
    });
  });
});
