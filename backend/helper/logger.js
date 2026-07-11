const winston = require('winston')
const { combine, timestamp, colorize, printf } = winston.format
const { v4: uuidv4 } = require('uuid')
require('dotenv').config()

class Logger {
  constructor (prefix='', uuidPrefix=uuidv4()) {
    const separator = (uuidPrefix && prefix) ? ':' : ''
    const space = (prefix || uuidPrefix) ? ' ' : ''
    this.logPrefix = `${uuidPrefix}${separator}${prefix}${space}`
    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info',
      format: combine(
        colorize(), // Apply color to the entire log message
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(info => {
          let formattedMessage = `${info.timestamp} [${info.level}]: ${this.logPrefix}${info.message}`
          const splat = info[Symbol.for('splat')]
          if (splat) {
            formattedMessage += ` ${splat.map(obj => JSON.stringify(obj, null, 2)).join(' ')}`
          }
          return formattedMessage
        })
      ),
      transports: [new winston.transports.Console()]
    })
  }

  log (level, message, metadata) {
    this.logger.log(level, message, metadata)
  }

  info (message, metadata) {
    this.log('info', message, metadata)
  }

  warn (message, metadata) {
    this.log('warn', message, metadata)
  }

  error (message, metadata) {
    this.log('error', message, metadata)
  }

  debug (message, metadata) {
    this.log('debug', message, metadata)
  }

  // Method to ensure logs are flushed before exiting
  async close () {
    await this.logger.end()
  }
}

function createLogger(prefix = '', uuidPrefix = uuidv4()) {
  return new Logger(prefix, uuidPrefix);
}

module.exports = {
  logger: createLogger(),
  createLogger
}