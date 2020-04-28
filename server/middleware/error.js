const winston = require('winston');
module.exports.notfound = (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
};
module.exports.fall = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: false,
    msg: error.message,
  });
};
