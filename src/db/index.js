import mongoose from 'mongoose'
import config from './config'
import './models'


mongoose.connect(`${config.url}${config.dbName}`, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // TODO: log connection
});

db.on('disconnected', () => {
  // TODO: handle disconnection
});


export default db
