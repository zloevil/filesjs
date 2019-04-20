import * as log4js from 'log4js'
import config from 'config'

const log = log4js.getLogger('middleware-logger>')
log.level = config.logger.logLevel

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    if (e.status) {
      ctx.body = e.message
      ctx.status = e.status
    } else {
      ctx.body = 'Error 500'
      ctx.status = 500
      log.error(e.message, e.stack)
    }
  }
}
