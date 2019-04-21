import config from 'config'


module.exports = (ctx, next) => {
  if (ctx.headers.token) {
    ctx.assert(ctx.headers.token === config.api.token, 401, 'Assess denied!')
    return
  }
  next()
}
