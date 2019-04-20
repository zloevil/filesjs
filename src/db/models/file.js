import mongoose from 'mongoose'


const File = new mongoose.Schema({
  id: {
    type: String,
  },
});

mongoose.model('File', File);
