/* eslint-disable import/no-dynamic-require,global-require */
import * as log4js from 'log4js'
import config from 'config'
import Koa from 'koa'
import path from 'path'
import fs from 'fs'
import './src/db'

const log = log4js.getLogger('app>')
log.level = config.logger.logLevel


const app = new Koa()
app.keys = [config.secret]

// middlewares
// eslint-disable-next-line security/detect-non-literal-fs-filename
const middlewares = fs.readdirSync(path.join(__dirname, 'src/middlewares')).sort()

middlewares.forEach(middleware => {
  // eslint-disable-next-line security/detect-non-literal-require
  app.use(require(`./src/middlewares/${middleware}`))
})

// routes
app.use(require('./src/routes').routes())
app.use(require('./src/routes').allowedMethods())

app.listen(config.server.port)
log.info(`Server run on port ${config.server.port}`)