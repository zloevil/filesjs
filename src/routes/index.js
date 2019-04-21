import Router from 'koa-router'
import * as log4js from 'log4js'
import config from 'config'
import api from './api'

const log = log4js.getLogger('routers')
log.level = config.logger.logLevel

const router = new Router()
router.use(api.routes(), api.allowedMethods())

module.exports = router
