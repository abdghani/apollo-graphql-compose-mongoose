const winston = require("winston");

const {
  format: { combine, timestamp, json, splat, simple },
} = winston;

const options = {
  file: {
    level: "info",
    filename: process.env.API_LOG_FILENAME,
    handleExceptions: true,
    json: true,
  },
  console: {
    level: "silly",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

winston.configure({
  exitOnError: false,
  format: combine(simple()),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
});
