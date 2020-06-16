function createLog(req, res, next) {
  //To save each log in the server here we can add db query or we can write to an external file to save request log
  console.log("Saving each request as log..");
  next();
}

module.exports = createLog;
