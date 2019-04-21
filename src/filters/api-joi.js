import Joi from 'joi'
import * as log4js from 'log4js'
import config from 'config'
import Boom from 'boom'
import { MongooseObjectIdJoi } from './custom-jois'

const log = log4js.getLogger('api-joi>')
log.level = config.logger.logLevel

// TODO: eslint disabled
// eslint-disable-next-line
export const uploadFile = async (ctx, next) => {
  const schema = Joi.object().keys({
    directory: MongooseObjectIdJoi.string().isMongoObjectId(),
    name: Joi.string().required(),
  })

  // Types.ObjectId.isValid
  log.info(ctx.request)
  if (Joi.validate(ctx.request.body, schema).error !== null) {
    throw Boom.badRequest('Invalid body!')
  }
  await next()
}
