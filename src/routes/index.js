import Router from 'koa-router'

const router = new Router()

router.use(ctx => {
  ctx.redirect(ctx.headers.token ? '/api' : '/public')
})

module.exports = router
