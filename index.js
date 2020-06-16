const express = require("express");
//adding router
const registerRoute = require("./Route/register");
const bookingRoute = require("./Route/booking");
const authenticationRoute = require("./Route/authentication");

//adding custom middleware
const Log = require("./middleware/log");
const db = require("./controller/dbController");

//add secured http header middleware
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
var cors = require("cors");

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors());
db.connect();

//only in dev environment
if (app.get("env") != "production") {
  app.use(morgan("tiny"));
}

//console.log("App Name: ", config.get("appname"));
//console.log("DataBase: ", config.get("database"));
//console.log("Database Username: ", config.get("app_dbuser")); //currently reading credential from local file
//console.log("Database Password: ", config.get("app_dbpassword")); //currently reading credential from local file

//middleware for security check purpose and history keeping
app.use(Log);

//default route
app.get("/", (req, res) => {
  res.status(200).send({
    response: "Server is up and running",
  });
});

//initializing api end-point
app.use("/", registerRoute);
app.use("/", bookingRoute);
app.use("/", authenticationRoute);

//starting server
/*
set PORT=ANY EMPTY PORT
*/
const port = process.env.PORT || 4000;
const server = app.listen(port, function () {
  console.log(`App is running on ${port} Port`);
});

module.exports = server;
