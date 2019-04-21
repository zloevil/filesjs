import config from 'config'
import Boom from 'boom'


module.exports = (ctx, next) => {
  if (ctx.headers.token && ctx.headers.token !== config.api.token) throw Boom.unauthorized('Access denied!')
  next()
}
