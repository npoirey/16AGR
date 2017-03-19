const winston = require('winston')

let logger

if (!process.env.LOG && (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'test_pg')) {
  // while testing, log only to file, leaving stdout free for unit test status messages
  logger = new (winston.Logger)({
    transports: [
      new (winston.transports.File)({ filename: 'unit-test.log', json: false }),
    ],
  })
} else {
  logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
    ],
  })
}

logger.stream = {
  write(message) {
    logger.info(message)
  },
}

module.exports = logger
