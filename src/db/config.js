export default {
  url: process.env.MONGODB_HOST || 'mongodb://localhost',
  dbName: process.env.MONGODB_NAME || 'filesdb',
}
