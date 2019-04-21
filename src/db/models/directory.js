import mongoose, { Schema } from 'mongoose'
import Boom from 'boom'
import * as log4js from 'log4js'
import config from 'config'

const log = log4js.getLogger('directiory')
log.level = config.logger.logLevel

const directory = new Schema({
  name: {
    type: String,
    required: true,
  },
  directory: {
    type: Schema.Types.ObjectId,
    default: null,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
})

// TODO: Write virtual methods for file managing
directory.statics.checkExistence = async function (_id) {
  const dir = await this.findById(_id)
  log.info(dir)
  if (!dir) throw Boom.resourceGone('Directory does not exists', { id: _id })
  return dir
}

mongoose.model('Directory', directory)
