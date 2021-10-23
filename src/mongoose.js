const mongoose = require("mongoose");
const winston = require("winston");

mongoose
  .connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => winston.error(error));

const db = mongoose.connection;

db.on("error", () => winston.error("Database connection error:"));
db.once("open", () => winston.info("Database connected"));

module.exports = mongoose;
