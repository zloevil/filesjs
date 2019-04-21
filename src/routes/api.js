import Router from 'koa-router'
import Boom from 'boom'
import fs from 'fs-extra'
import * as log4js from 'log4js'
import config from 'config'
import { uploadFile as uploadFileValidation } from '../filters/api-joi'


const log = log4js.getLogger('api>')
log.level = config.logger.logLevel

const uploadFile = async ctx => {
  log.info('Uploading file: begin')
  if (ctx.request.body.directory) {
    await ctx.db.model('Directory').checkExistence(ctx.request.body.directory)
  }

  const FileModel = ctx.db.model('File')
  const file = new FileModel({
    name: ctx.request.body.name,
  })
  try {
    await file.uploadFile(fs.createReadStream(ctx.request.files.file.path))
    file.set('status', 'uploaded')
    await file.save()
  } catch (e) {
    if (e.typeof !== Boom.internal() || e.message !== 'Could not write file on disk') {
      await file.removeFileFromDisk()
    }
    throw e
  }
  ctx.body = JSON.stringify(file)
}

const router = new Router()
router.prefix('/api')
router.post('/file', uploadFileValidation, uploadFile)

export default router
