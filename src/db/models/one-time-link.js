import mongoose, { Schema } from 'mongoose'
import crypto from 'crypto'


const generateHash = () => crypto.randomBytes(256).toString('base64')

const oneTimeLink = new Schema({
  hash: {
    type: String,
    required: true,
    index: true,
    default: generateHash,
  },
  action: {
    type: String,
    default: 'download',
    enum: ['download', 'upload', 'delete', 'move'],
  },
  target: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  lifeTime: {
    type: Number,
    default: 300000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
})

mongoose.model('OneTimeLink', oneTimeLink)
