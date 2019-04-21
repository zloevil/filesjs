import Router from 'koa-router'
import * as log4js from 'log4js'
import config from 'config'
import { uploadFile as uploadFileValidation } from '../filters/api-joi'


const log = log4js.getLogger('api>')
log.level = config.logger.logLevel

const uploadFile = async ctx => {
  log.info('Uploading file: begin')
  if (ctx.request.body.directory) {
    await ctx.connection.model('Directory').checkExistence(ctx.request.body.directory)
  }
  ctx.body = 'FINISH'
}

const router = new Router()
router.prefix('/api')
router.post('/file', uploadFileValidation, uploadFile)

export default router
