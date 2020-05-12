const winston = require('winston');
const logger = require('./logging');
const mongoose = require('mongoose');
module.exports = () => {
  mongoose
    .connect(
      // process.env.MONGO_URI ||
      'mongodb+srv://philzace:0sSiByLfbRuXW2Kv@cluster0-ojdiw.mongodb.net/test?retryWrites=true&w=majority',
      //  ||
      // 'mongodb://localhost/Fblog',

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    )
    .then(() => logger.info('MongoDB Connected...'));
};
