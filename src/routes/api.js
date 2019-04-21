import Router from 'koa-router'
import * as log4js from 'log4js'
import config from 'config'
import { uploadFile } from '../filters/api-joi'


const log = log4js.getLogger('api>')
log.level = config.logger.logLevel

const router = new Router()
router.prefix('/api')
router.post('/file', uploadFile, ctx => {
  log.info('Uploading file: begin')
})

export default router
