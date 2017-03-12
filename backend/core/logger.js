const winston = require('winston')

let logger

if (process.env.NODE_ENV !== 'test') {
  logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
    ],
  })
} else {
  // while testing, log only to file, leaving stdout free for unit test status messages
  logger = new (winston.Logger)({
    transports: [
      // new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'unit-test.log' }),
    ],
  })
}

module.exports = logger
