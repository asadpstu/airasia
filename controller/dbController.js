const mongoose = require("mongoose");
const config = require("config");

module.exports.connect = () => {
  //connecting database
  //For resolving unexpected warning generated by Mongoose
  mongoose.set("useUnifiedTopology", true);
  mongoose.set("useNewUrlParser", true);

  //connect to localhost mongo database
  //mongoose.connect('mongodb://dbuser:dbpassword@localhost:27017/databasename',{ useNewUrlParser: true })

  //connect to remote database. Here i'm using https://cloud.mongodb.com/
  mongoose
    .connect(
      "mongodb+srv://" +
        config.get("app_dbuser") +
        ":" +
        config.get("app_dbpassword") +
        "@cluster0-ontdi.mongodb.net/" +
        config.get("database") +
        "?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("Successful db connection");
    })
    .catch((err) => {
      console.log("Unable to connect..");
    });
};
