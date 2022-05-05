const log4js = require('log4js')

const levels = {
  'trace'     : log4js.levels.TRACE,
  'debug'     : log4js.levels.DEBUG,
  'info'      : log4js.levels.INFO,
  'warn'      : log4js.levels.WARN,
  'error'     : log4js.levels.ERROR,
  'fatal'     : log4js.levels.FATAL
}

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    info: {
      type: 'file',
      filename: 'logs/info.log',
    },
    error: {
      type: 'dateFile',
      filename: "logs/error",
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true
      // layout: {
      //   type: 'pattern',
      //   pattern: '%[[%d] [%p] [%f{2}:%l] %m'
      // }
    }
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'debug'
    },
    info: {
      appenders: ['info'],
      level: 'info'
    },
    error: {
      appenders: [ 'error', 'console'],
      level: 'error'
      // enableCallStack: true
    }
  }
});

const debug = (content) => {
  let logger = log4js.getLogger('console')
  logger.level = levels.debug
  logger.debug(content)
}

const info = (content) => {
  let logger = log4js.getLogger('info')
  logger.level = levels.info
  logger.info(content)
}

const error = (content) => {
  let logger = log4js.getLogger('error')
  logger.level = levels.error
  logger.error(content)
}

module.exports = {
  debug,
  info,
  error
}
