const winston = require('winston');
const logger = require('./logging');
const mongoose = require('mongoose');
module.exports = () => {
  mongoose
    .connect(process.env.MONGO_URI || 'mongodb://localhost/Fblog', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => logger.info('MongoDB Connected...'));
};
