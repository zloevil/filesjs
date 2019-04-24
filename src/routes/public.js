import Router from 'koa-router'
import {
  hashValidation,
} from '../filters/api-joi'


const sendFileByOneTimeLink = async ctx => {
  const { hash } = ctx.params
  const OneTimeLink = ctx.db.model('OneTimeLink')
  const link = await OneTimeLink.checkExistence(hash)
  ctx.body = await link.target.getFileStream()
  link.remove()
}

const router = new Router()
router.prefix('/public')
router.get('/file/:hash', hashValidation, sendFileByOneTimeLink)

export default router
