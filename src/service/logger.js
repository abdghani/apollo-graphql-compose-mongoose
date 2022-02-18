const winston = require('winston')

const {
  format: { combine, simple }
} = winston

const silent = process.env.NODE_ENV == 'test' ? true : false;

const options = {
  file: {
    level: 'info',
    silent,
    filename: process.env.API_LOG_FILENAME,
    handleExceptions: true,
    json: true
  },
  console: {
    level: 'info',
    silent,
    handleExceptions: true,
    json: false,
    colorize: true
  }
}

winston.configure({
  exitOnError: false,
  format: combine(simple()),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ]
})
