module.exports = (app) => {
  app.use('/api/blog', require('../routes/blog'));
  app.use('/api/users', require('../routes/users'));
  app.use('/api/follow', require('../routes/follower'));
  app.use('/api/like', require('../routes/like'));
  app.use('/api/comment', require('../routes/comment'));
  app.use(require('../middleware/error').notfound);
  app.use(require('../middleware/error').fall);
};
