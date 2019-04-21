import mongoose, { Schema } from 'mongoose'


const oneTimeLink = new Schema({
  hash: {
    type: String,
    required: true,
    index: true,
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
