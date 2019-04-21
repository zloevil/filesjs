import Joi from 'joi'
import * as log4js from 'log4js'
import config from 'config'
import errors from '../errors'
import Boom from 'boom'

const log = log4js.getLogger('api-joi>')
log.level = config.logger.logLevel

// TODO: eslint disabled
// eslint-disable-next-line
export const uploadFile = async (ctx, next) => {
  const schema = Joi.object().keys({
    directoryId: Joi.string(),
    name: Joi.string().required(),
  })

  if (Joi.validate(ctx.request.body, schema).error !== null) {
    throw Boom.badRequest('Invalid body!')
  }
  await next()
}
