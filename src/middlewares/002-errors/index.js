import * as log4js from 'log4js'
import config from 'config'
import Boom from 'boom'

const log = log4js.getLogger('middleware-logger>')
log.level = config.logger.logLevel

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (err) {
      if (err.isBoom) {
        ctx.status = err.output.statusCode
        ctx.set({
          ...ctx.response.headers,
          ...err.output.headers,
        })
        ctx.body = err.output.payload
      } else {
        ctx.status = err.status || 500
        ctx.body = Boom.wrap(err, err.status, err.message).output.payload
      }
      ctx.app.emit('error', err, ctx)
      return
    }
    ctx.status = 500
    ctx.body = Boom.internal('Something went wrong').output.payload
  }
}
