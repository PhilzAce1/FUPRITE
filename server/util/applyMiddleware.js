const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
module.exports = (app) => {
  app.use(morgan('tiny'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(fileUpload());
  app.use(express.static('public'));
  app.use(helmet());
  app.use('/uploads', express.static('uploads'));
};
