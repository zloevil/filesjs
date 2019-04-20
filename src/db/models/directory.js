import mongoose, { Schema } from 'mongoose'

const Directory = new Schema({
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

mongoose.model('Directory', Directory)
