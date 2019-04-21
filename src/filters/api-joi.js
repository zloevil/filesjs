import Joi from 'joi'
import Boom from 'boom'
import { MongooseObjectIdJoi } from './custom-jois'


// TODO: eslint disabled
// eslint-disable-next-line
export const uploadFile = async (ctx, next) => {
  const schema = Joi.object().keys({
    directory: MongooseObjectIdJoi.string().isMongoObjectId(),
    name: Joi.string().required(),
    file: Joi.any().required(),
  })

  // Types.ObjectId.isValid
  if (Joi.validate({ ...ctx.request.body, file: ctx.request.files.file }, schema).error !== null) {
    throw Boom.badRequest('Invalid body!')
  }
  await next()
}
