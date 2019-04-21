import mongoose, { Schema } from 'mongoose'

const file = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'uploading',
    enum: ['uploading', 'uploaded', 'deleting', 'deleted'],
  },
  directory: {
    type: Schema.Types.ObjectId,
    default: null,
    required: true,
  },
  isZipped: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
})

// TODO: Write virtual methods for file managing

mongoose.model('File', file)
