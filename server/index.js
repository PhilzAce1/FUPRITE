// console.clear();
const express = require('express');
const morgon = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');
const connect = mongoose
  .connect(
    'mongodb+srv://philzace:chukky162@cluster0-ojdiw.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));
app.use(morgon('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static('public'));

app.use('/api/users', require('./routes/users'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/follow', require('./routes/follower'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));

//udfdfdse this to show the imagej f you have in node js server to client (react js)there is somethig that i do notknowwhat to do
//https://stackoverflow.com/questiodfkjd fjd fjd ns/48914987/send-iadfj akjd fvjaf dfj vdjf mage-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // index.html for all page routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}
app.use((req, res, next) => {
  // const error = new Error('Not found');
  // error.status = 404;
  // res.sendFile('/index.html');
  // res.send('i am fine');
  res.sendFile(path.join(__dirname + '/index.html'));
  // next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: false,
    msg: error.message,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
